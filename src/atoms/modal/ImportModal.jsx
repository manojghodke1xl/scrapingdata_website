import { useState } from 'react';
import * as XLSX from 'xlsx';
import { showNotification } from '../../utils/showNotification';
import { MdDeleteForever } from 'react-icons/md';
import { CiExport, CiImport } from 'react-icons/ci';
import TableComponent from '../table/Table';

const ImportModal = ({ isOpen, label, setShowImportModal, onImport, templateFields, headerConfig }) => {
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const flattenObject = (obj, prefix = '') => {
    return Object.keys(obj).reduce((acc, key) => {
      const prefixedKey = prefix ? `${prefix}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null) return { ...acc, ...flattenObject(obj[key], prefixedKey) };
      return { ...acc, [prefixedKey]: obj[key] };
    }, {});
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.name.match(/\.(xlsx|xls)$/)) {
        showNotification('error', 'Please upload an Excel file');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const workbook = XLSX.read(e.target.result, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const data = XLSX.utils.sheet_to_json(worksheet);

          // Transform the flat data back into nested objects
          const transformedData = data.map((item, index) => {
            const nestedObj = {};
            Object.keys(item).forEach((key) => {
              const keys = key.split('.');
              let current = nestedObj;
              keys.forEach((k, i) => {
                if (i === keys.length - 1) current[k] = item[key];
                else {
                  current[k] = current[k] || {};
                  current = current[k];
                }
              });
            });
            return { id: index + 1, ...nestedObj };
          });

          setPreviewData(transformedData);
          setFile({
            data: data,
            name: file.name,
            size: file.size / 1024 < 1024 ? `${(file.size / 1024).toFixed(2)} KB` : `${(file.size / 1024 / 1024).toFixed(2)} MB`
          });
          showNotification('success', 'File uploaded successfully');
        } catch (error) {
          showNotification('error', error.message);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreviewData([]);
    showNotification('success', 'File removed successfully');
  };

  const downloadTemplate = () => {
    const flattenedTemplate = flattenObject(templateFields);
    const ws = XLSX.utils.json_to_sheet([flattenedTemplate]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template');
    XLSX.writeFile(wb, `${label.toLowerCase()}_template.xlsx`);
    showNotification('success', 'Template downloaded successfully');
  };

  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return previewData.slice(startIndex, endIndex).map((row) => {
      const flatRow = {};
      headers.forEach((header) => (flatRow[header.key] = getNestedValue(row, header.key)));
      return flatRow;
    });
  };

  // Use headerConfig if provided, otherwise generate default headers from templateFields
  const headers = headerConfig || [
    { label: 'Sr. No.', key: 'srno' },
    ...Object.entries(flattenObject(templateFields)).map(([key]) => ({
      label: key
        .split('.')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' '),
      key: key
    }))
  ];

  const onClose = () => {
    setShowImportModal(false);
    setFile(null);
    setPreviewData([]);
  };

  const onConfirm = () => {
    onImport(previewData);
    setShowImportModal(false);
    setFile(null);
    setPreviewData([]);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 " onClick={onClose}>
        <div className="relative bg-main rounded-lg p-8 max-w-5xl w-full mx-10 max-h-[95vh] overflow-y-auto custom-scrollbar" onClick={(e) => e.stopPropagation()}>
          <h2 className="text-3xl font-semibold text-title mb-4">Import {label}s</h2>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
            <p className="text-dark text-center sm:text-left mb-2 sm:mb-0">Upload a XLSX file to import {label.toLowerCase()}. Use our template to get started.</p>
            <button onClick={downloadTemplate} className="flex items-center gap-2 py-2.5 px-2 rounded-xl border border-primary">
              <CiImport strokeWidth={0.5} className="text-2xl" />
              <span>Sample File</span>
            </button>
          </div>

          {file ? (
            <div className="w-full mt-5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-dark text-base">{file.name}</span>
                  <span className="text-sm text-secondary">({file.size})</span>
                </div>
                <button className="p-2 rounded-lg hover:bg-hover" onClick={handleRemoveFile}>
                  <MdDeleteForever className="text-2xl" />
                </button>
              </div>
              <TableComponent
                headers={headers}
                rows={getPaginatedData()}
                tableData={() => {}}
                exportBtn={false}
                shouldFetchData={false}
                pagination={true}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalCount={previewData.length}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={(newItemsPerPage) => {
                  setItemsPerPage(newItemsPerPage);
                  setCurrentPage(1);
                }}
              />
            </div>
          ) : (
            <div className="mt-2">
              <header className="bg-main text-dark flex flex-col justify-center rounded-lg items-center border-dashed border-2 border-primary cursor-pointer">
                <input id="hidden-input" type="file" className="hidden" accept=".xlsx,.xls" onChange={handleFileUpload} />
                <label htmlFor="hidden-input" className="flex flex-col w-full py-12 justify-center items-center cursor-pointer">
                  <CiExport strokeWidth={1.5} size={24} className="mb-2" />
                  <p className="text-lg text-dark text-center mb-2">Choose a file or drag & drop here to upload</p>
                  <span className="font-normal text-sm">Accepted file types: xlsx</span>
                </label>
              </header>
            </div>
          )}

          <div className="flex justify-end gap-4 mt-8">
            <button onClick={onClose} className="px-4 rounded-xl border-2 border-primary py-2 text-dark">
              Cancel
            </button>
            <button onClick={() => file && onConfirm()} disabled={!file} className={`px-4 rounded-xl py-2 bg-primary text-white ${!file && 'opacity-50 cursor-not-allowed'}`}>
              Import
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ImportModal;
