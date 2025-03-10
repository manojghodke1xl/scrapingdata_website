import * as XLSX from 'xlsx';

export const generateBulkExport = ({ data, exportMapping, selectedColumns, fileName, fileFormat = 'csv' }) => {
  if (!data?.length) return;

  // Get headers from the first mapped item to ensure consistent structure
  const sampleMappedData = exportMapping(data[0], selectedColumns);
  const headers = Object.keys(sampleMappedData);
  // Map data rows using the exportMapping function
  const rows = data.map((item) => {
    const mappedItem = exportMapping(item, selectedColumns);
    return headers.reduce((acc, header) => {
      acc[header] = mappedItem[header];
      return acc;
    }, {});
  });

  if (fileFormat === 'xlsx') exportToExcel(rows, headers, fileName);
  else exportToCSV(rows, headers, fileName);
};

export const createGenericExportMapping = (columnConfig) => {
  const getNestedValue = (obj, path) => {
    if (!path) return obj;
    return path.split('.').reduce((current, key) => current?.[key], obj);
  };

  return (data, selectedColumns) => {
    // Create default mapping from columnConfig
    const defaultColumnMapping = columnConfig.reduce((acc, column) => {
      // Skip action columns or columns marked as not exportable
      if (column.key === 'actions' || column.notExportable) return acc;

      // Get the column label and corresponding data value
      const label = column.label;
      let value;

      // Handle nested dataKey properties
      if (column.dataKey) value = getNestedValue(data, column.dataKey);
      else value = data[column.key];

      // Apply formatter if provided
      if (column.formatForExport) value = column.formatForExport(value, data);

      // If value is empty or undefined, set it to N/A
      if (value === undefined || value === null || value === '') value = 'N/A';

      // Add to the mapping
      acc[label] = value;
      return acc;
    }, {});

    // If no columns selected, return all columns
    if (!selectedColumns?.length) return defaultColumnMapping;

    // Filter columns based on selection
    const allowedKeys = selectedColumns.map((col) => col.label);
    return Object.fromEntries(Object.entries(defaultColumnMapping).filter(([key]) => allowedKeys.includes(key)));
  };
};

const exportToExcel = (rows, headers, fileName) => {
  const worksheet = XLSX.utils.json_to_sheet(rows, { header: headers });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

const exportToCSV = (rows, headers, fileName) => {
  // Create header row
  const headerRow = headers.map((header) => `"${header}"`).join(',');

  // Create data rows
  const dataRows = rows.map((row) => headers.map((header) => formatCellValue(row[header])).join(','));

  // Combine headers and rows
  const csvContent = [headerRow, ...dataRows].join('\n');
  downloadFile(csvContent, fileName, 'csv');
};

const downloadFile = (content, fileName, format) => {
  if (format === 'csv') {
    const blob = new Blob(['\ufeff' + content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};

// Helper to format cell values based on their type
const formatCellValue = (value) => {
  if (value === null || value === undefined) return '""';
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (Array.isArray(value)) return `"${value.join(', ')}"`;
  if (typeof value === 'object') return `"${JSON.stringify(value)}"`;
  if (typeof value === 'string') return `"${value.replace(/"/g, '""')}"`;
  return `"${value}"`;
};
