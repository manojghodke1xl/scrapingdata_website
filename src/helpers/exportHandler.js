import { getMethodCall } from '../apis/api-handler';
import { showNotification } from '../utils/showNotification';

export const handleExport = (type, apiUrl) => {
  if (type === 'all') {
    (async () => {
      const { status, data } = await getMethodCall(`${import.meta.env.VITE_API_URL}/${apiUrl}`);
      console.log(status, data);
      if (status) {
        const apiUrlMap = {
          feedback: 'feedbacks',
          recaptcha: 'recaptchas',
          'faq-category': 'faqCategories',
          faq: 'faqs',
          'client-logo': 'clientlogos',
          gallery: 'galleries',
          'partner-logo': 'partnerlogos'
        };

        const exportData = data[apiUrlMap[apiUrl] || apiUrl];

        // Flattening objects using reduce
        const flattenObject = (obj, parentKey = '') =>
          Object.keys(obj).reduce((acc, key) => {
            const newKey = parentKey ? `${parentKey}.${key}` : key;

            if (key === 'isActive') {
              // Custom handling for isActive field
              acc[newKey] = obj[key] === true ? 'true' : '"false"';
            } else if (key === 'site' || key === 'sites') {
              // Handle specific keys like 'site' and 'sites'
              if (Array.isArray(obj[key])) {
                acc[newKey] = `"${
                  obj[key]
                    .reduce((str, site) => {
                      if (site.name && site.host) return `${str}${str ? ', ' : ''}${site.name} (${site.host})`;
                      return str;
                    }, '')
                    .replace(/"/g, '""') || 'N/A'
                }"`;
              } else if (typeof obj[key] === 'object' && obj[key] !== null) acc[newKey] = obj[key].name && obj[key].host ? `"${obj[key].name} (${obj[key].host})"` : '"N/A"';
              else acc[newKey] = '"N/A"';
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
              // Recursive flattening for nested objects
              Object.assign(acc, flattenObject(obj[key], newKey));
            } else {
              // Escape double quotes and enclose in quotes
              acc[newKey] = typeof obj[key] === 'string' ? `"${obj[key].replace(/"/g, '""')}"` : obj[key];
            }
            return acc;
          }, {});

        // Generate CSV headers using the keys of the first flattened object
        const headers = Object.keys(flattenObject(exportData[0]));
        const csvContent = exportData.reduce((csv, row, index) => {
          // Flatten each row
          const flattenedRow = flattenObject(row);
          // Map headers to corresponding values
          const values = headers.map((header) => flattenedRow[header] || '""');
          // Add headers only once (for the first row)
          if (index === 0) csv += headers.join(',') + '\n';
          csv += values.join(',') + '\n';
          return csv;
        }, '');

        // Create a Blob containing the CSV file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `view_all_${apiUrl}_details.csv`);
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
      } else showNotification('warn', data);
    })();
  }
};
