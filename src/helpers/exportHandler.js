import { getMethodCall } from '../apis/api-handler';
import { showNotification } from '../utils/showNotification';

export const exportHandler = ({ type, apiUrl, rows, headers, selected }) => {
  if (type === 'visible') {
    const visibleData = rows.map((row) =>
      headers.reduce((result, header) => {
        if (header.key !== 'srno') {
          if (header.key === 'keys') result['keys'] = row.exportData['_id'];
          else result[header.key] = row.exportData[header.key];
        }
        return result;
      }, {})
    );
    const csvContent = generateCSV(visibleData);
    downloadCSV(csvContent, `view_visible_${apiUrl}_details.csv`);
  } else if (type === 'selected') {
    const selectedData = rows
      .filter((row) => selected.some((selectedRow) => selectedRow === row.exportData._id))
      .map((row) =>
        headers.reduce((result, header) => {
          if (header.key !== 'srno') {
            if (header.key === 'keys') result['keys'] = row.exportData['_id'];
            else result[header.key] = row.exportData[header.key];
          }
          return result;
        }, {})
      );
    const csvContent = generateCSV(selectedData);
    downloadCSV(csvContent, `view_selected_${apiUrl}_details.csv`);
  } else if (type === 'all') {
    (async () => {
      const { status, data } = await getMethodCall(`${import.meta.env.VITE_API_URL}/${apiUrl}`);
      if (status) {
        const apiUrlMapping = {
          recaptcha: 'recaptchas',
          'faq-category': 'faqCategories',
          faq: 'faqs',
          'client-logo': 'clientlogos',
          gallery: 'galleries',
          'partner-logo': 'partnerlogos',
          'template-category/email': 'templateCategories',
          'template/email': 'emailTemplates',
          'template/sms': 'smsTemplates',
          'template/whatsapp': 'whatsappTemplates',
          reminder: 'reminders',
          'after-sale': 'afterSales',
          enquiry: 'enquiries',
          feedback: 'feedbacks',
          newsletter: 'lists',
          advertisement: 'advertisements',
          vendor: 'vendors',
          distributor: 'distributors',
          reseller: 'resellers',
          affiliate: 'affiliates',
          'fan-club': 'fanClubs',
          career: 'careers',
          participant: 'participants',
          coupon: 'coupons',
          webinar: 'webinars',
          'webinar/links': 'webinarLinks',
          'notif-agent': 'notifAgents'
        };

        const allData = data[apiUrlMapping[apiUrl] || apiUrl];
        const csvContent = generateCSV(allData);
        downloadCSV(csvContent, `view_all_${apiUrl}_details.csv`);
      } else showNotification('warn', data);
    })();
  }
};

const flattenObject = (object, parentKey = '') =>
  Object.keys(object).reduce((accumulator, key) => {
    const newKey = parentKey ? `${parentKey}.${key}` : key;

    if (key === 'isActive') accumulator[newKey] = object[key] ? 'true' : '"false"';
    else if (key === 'site' || key === 'sites') {
      if (Array.isArray(object[key])) {
        accumulator[newKey] = `"${
          object[key]
            .reduce((result, site) => {
              return site.name && site.host ? `${result}${result ? ', ' : ''}${site.name} (${site.host})` : result;
            }, '')
            .replace(/"/g, '""') || 'N/A'
        }"`;
      } else if (object[key]?.name && object[key]?.host) accumulator[newKey] = `"${object[key].name} (${object[key].host})"`;
      else accumulator[newKey] = '"N/A"';
    } else if (typeof object[key] === 'object' && object[key] !== null) Object.assign(accumulator, flattenObject(object[key], newKey));
    else accumulator[newKey] = typeof object[key] === 'string' ? `"${object[key].replace(/"/g, '""')}"` : object[key];

    return accumulator;
  }, {});

const generateCSV = (data) => {
  const csvHeaders = Object.keys(flattenObject(data[0] || {}));
  return data.reduce((csvContent, row, rowIndex) => {
    const flattenedRow = flattenObject(row);
    const rowValues = csvHeaders.map((header) => flattenedRow[header] || '""');
    if (rowIndex === 0) csvContent += csvHeaders.join(',') + '\n';
    csvContent += rowValues.join(',') + '\n';
    return csvContent;
  }, '');
};

const downloadCSV = (csvContent, fileName) => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.setAttribute('download', fileName);
  document.body.appendChild(downloadLink);
  downloadLink.click();
  URL.revokeObjectURL(url);
  document.body.removeChild(downloadLink);
};
