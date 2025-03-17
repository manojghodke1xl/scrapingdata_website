import BulkImport from '../../components/bulk-import/BulkImport';
import { contactImportConfig } from '../../configs/bulkImportConfigs';

const ContactBulkImport = () => {
  return <BulkImport config={contactImportConfig} />;
};

export default ContactBulkImport;
