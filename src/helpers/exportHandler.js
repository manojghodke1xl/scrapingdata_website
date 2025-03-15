import { showNotification } from '../utils/showNotification';
import { generateBulkExport } from '../utils/exportUtils';
import { bulkExportTableApi } from '../apis/table-apis';

export const exportHandler = ({ type, apiUrl, rows, exportMapping, selectedColumns, selected, fileName, fileFormat }) => {
  if (!exportMapping) {
    showNotification('error', 'Export mapping function is required');
    return;
  }

  if (type === 'visible') {
    const visibleData = rows.map((row) => row.exportData);
    generateBulkExport({ data: visibleData, exportMapping, selectedColumns, fileName: `view_visible_${fileName}_details`, fileFormat });
  } else if (type === 'selected') {
    const selectedData = rows.filter((row) => selected.includes(row.exportData._id)).map((row) => row.exportData);
    generateBulkExport({ data: selectedData, exportMapping, selectedColumns, fileName: `view_selected_${fileName}_details`, fileFormat });
  } else if (type === 'all') {
    (async () => {
      const { status, data } = await bulkExportTableApi(apiUrl);
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
          'notif-agent': 'notifAgents',
          file: 'files',
          package: 'packages',
          smtp: 'smtps',
          testimonial: 'testimonials',
          'testimonial-category': 'categories',
          order: 'orders',
          booking: 'bookings',
          'logs/whatsapp': 'logs',
          'logs/email': 'logs',
          contact: 'contacts'
        };
        const allData = data[apiUrlMapping[apiUrl] || apiUrl];
        generateBulkExport({ data: allData, exportMapping, selectedColumns, fileName: `view_all_${fileName}_details`, fileFormat });
      } else showNotification('warn', data);
    })();
  }
};
