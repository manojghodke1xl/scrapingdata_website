import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TableComponent from '../../atoms/table/Table';
import { formatDateTime } from '../../utils/dateFormats';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';
import useColorContext from '../../hooks/useColorContext';

const WhatsAppLogList = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useColorContext();
  const [whatsAppTemplates, setWhatsAppTemplates] = useState([]);

  const rows = whatsAppTemplates?.map((whatsAppTemplate) => {
    const { _id, fromNumber, toNumber, message, statusCode, error, createdAt, updatedAt } = whatsAppTemplate;

    return {
      id: _id,
      exportData: whatsAppTemplate,
      fromNumber: fromNumber || '-',
      toNumber: toNumber || '-',
      message: <TruncatableFieldToolTip content={message} />,
      status: (
        <div
          className={`rounded-xl ${
            statusCode === 200
              ? `${isDarkMode ? 'border border-success' : 'bg-lightgreen'} text-success`
              : statusCode >= 400
              ? `${isDarkMode ? 'border border-failed' : 'bg-fadedred'} text-failed`
              : `${isDarkMode ? 'border border-pending' : 'bg-fadeyellow'} text-pending`
          } px-2 py-1 w-fit flex gap-2 items-center`}
        >
          <span className={`min-w-[8px] min-h-[8px] rounded-full ${statusCode === 200 ? 'bg-green' : statusCode >= 400 ? 'bg-red' : 'bg-pending'}`}></span>
          <span>{statusCode}</span>
        </div>
      ),
      error: error ? <TruncatableFieldToolTip content={JSON.stringify(error)} /> : <span className="text-secondary">No Error</span>,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  const columnConfig = [
    { id: 0, label: 'From Number', key: 'fromNumber', dataKey: 'fromNumber' },
    { id: 1, label: 'To Number', key: 'toNumber', dataKey: 'toNumber' },
    { id: 2, label: 'Message', key: 'message', dataKey: 'message' },
    { id: 3, label: 'Status', key: 'status', dataKey: 'statusCode' },
    { id: 4, label: 'Error', key: 'error', dataKey: 'error' },
    { id: 5, label: 'Created Date', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
    { id: 6, label: 'Updated Date', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) }
  ];

  const actionItems = [{ id: 0, label: 'View', icon: 'view', handler: (row) => navigate(`/logs/whatsapp-log-preview/${row.id}`) }];

  return (
    <div className="p-1 overflow-x-hidden mb-12">
      <TableHeader heading={'WhatsApp Logs'} />
      <TableComponent
        selectable={true}
        siteModule={'whats-app-logs'}
        headers={columnConfig}
        tableData={(data) => setWhatsAppTemplates(data.logs)}
        rows={rows}
        apiUrl={'logs/whatsapp'}
        pagination={true}
        search={true}
        filter={true}
        filterCategory={[{ id: 0, name: 'Sites' }]}
        actionItems={actionItems}
      />
    </div>
  );
};

export default WhatsAppLogList;
