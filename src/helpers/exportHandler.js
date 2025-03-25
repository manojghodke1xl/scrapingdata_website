import { showNotification } from '../utils/showNotification';
import { generateBulkExport } from '../utils/exportUtils';
import { bulkExportTableApi } from '../apis/table-apis';

/**
 * Handles different types of data export operations
 * @param {Object} params Export configuration parameters
 * @param {string} params.type - Export type ('visible', 'selected', or 'all')
 * @param {string} params.apiUrl - API endpoint for fetching data
 * @param {Array} params.rows - Current table rows
 * @param {Function} params.exportMapping - Function to map data for export
 * @param {Array} params.selectedColumns - Columns to include in export
 * @param {Array} params.selected - Selected item IDs
 * @param {string} params.fileName - Base name for export file
 * @param {string} params.fileFormat - Export format (csv/xlsx)
 */
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
        // API URL mapping for different modules
        const apiUrlMapping = {
          // Mapping configuration for different API endpoints
          // Format: 'endpoint-path': 'data-key'
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
