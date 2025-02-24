import BulkImport from '../../components/bulk-import/BulkImport';
import { participantImportConfig } from '../../configs/bulkImportConfigs';

const ParticipantBulkImport = () => {
  return <BulkImport config={participantImportConfig} />;
};

export default ParticipantBulkImport;
