import TableComponent from '../../atoms/table/Table';
import { useState } from 'react';
import { formatDateTime } from '../../utils/dateFormats';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';
import { useColor } from '../../contexts/contexts/ColorContext';

const EmailLogList = () => {
  const { isDarkMode } = useColor();
  const [whatsAppTemplates, setWhatsAppTemplates] = useState([]);

  const rows = whatsAppTemplates?.map((whatsAppTemplate) => {
    const { _id, requestData, responseData, statusCode, error, createdAt, updatedAt } = whatsAppTemplate;

    return {
      id: _id,
      requestData: <TruncatableFieldToolTip title={'Request Data'} content={JSON.stringify(requestData)} />,
      responseData: <TruncatableFieldToolTip title={'Response Data'} content={JSON.stringify(responseData)} />,
      statusCode: (
        <div
          className={`rounded-xl ${
            statusCode === 200
              ? `${isDarkMode ? 'border border-success' : 'bg-lightgreen'} text-success`
              : statusCode >= 400
              ? `${isDarkMode ? 'border border-failed' : 'bg-fadedred'} text-failed`
              : `${isDarkMode ? 'border border-pending' : 'bg-fadeyellow'} text-pending`
          } px-2 py-1 w-fit flex gap-2 items-center`}
        >
          <span className={`min-w-[8px] min-h-[8px] rounded-full ${statusCode === 200 ? 'bg-green' : 'bg-pending'}`}></span>
          <span>{statusCode}</span>
        </div>
      ),
      error: error ? <span className="text-failed">{error}</span> : <span className="text-secondary">No Error</span>,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className=" w-full">
        <TableHeader heading={'Email Logs'} />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule={'whats-app-templates'}
                headers={[
                  { label: 'Sr. No.', key: 'srno' },
                  { label: 'Request Data', key: 'requestData' },
                  { label: 'Response Data', key: 'responseData' },
                  { label: 'Status', key: 'statusCode' },
                  { label: 'Error', key: 'error' },
                  { label: 'Created Date', key: 'createdAt' },
                  { label: 'Updated Date', key: 'updatedAt' }
                ]}
                tableData={(data) => setWhatsAppTemplates(data.logs)}
                rows={rows}
                apiUrl={'logs/email'}
                tableCountLabel={true}
                pagination={true}
                search={true}
                // filter={true}
                filterCategory={[{ id: 0, name: 'Sites' }]}
                // actions={true}
                view={true}
                viewPath={'/events/view-event'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailLogList;
