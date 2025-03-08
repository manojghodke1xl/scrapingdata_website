import { useState } from 'react';
import TableComponent from '../../atoms/table/Table';
import { formatDateTime } from '../../utils/dateFormats';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';
import useColorContext from '../../hooks/useColorContext';

const EmailLogList = () => {
  const { isDarkMode } = useColorContext();
  const [emailTemplates, setEmailTemplates] = useState([]);

  const rows = emailTemplates?.map((emailTemplate) => {
    const { _id, from, to, subject, message, statusCode, error, createdAt, updatedAt } = emailTemplate;

    return {
      id: _id,
      exportData: emailTemplate,
      from: <TruncatableFieldToolTip content={from} />,
      to: <TruncatableFieldToolTip content={to} />,
      subject: <TruncatableFieldToolTip content={subject} />,
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
          <span className={`min-w-[8px] min-h-[8px] rounded-full ${statusCode === 200 ? 'bg-green' : 'bg-pending'}`}></span>
          <span>{statusCode}</span>
        </div>
      ),
      error: error ? (
        <span className="text-failed">
          <TruncatableFieldToolTip content={JSON.stringify(error)} />
        </span>
      ) : (
        <span className="text-secondary">No Error</span>
      ),
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  const columnConfig = [
    { id: 0, label: 'From', key: 'from', dataKey: 'from' },
    { id: 1, label: 'To', key: 'to', dataKey: 'to' },
    { id: 2, label: 'Subject', key: 'subject', dataKey: 'subject' },
    { id: 3, label: 'Message', key: 'message', dataKey: 'message' },
    { id: 4, label: 'Status', key: 'status', dataKey: 'statusCode' },
    { id: 5, label: 'Error', key: 'error', dataKey: 'error' },
    { id: 6, label: 'Created Date', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
    { id: 7, label: 'Updated Date', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) }
  ];

  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className=" w-full">
        <TableHeader heading={'Email Logs'} />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule={'email-logs'}
                headers={columnConfig}
                tableData={(data) => setEmailTemplates(data.logs)}
                rows={rows}
                apiUrl={'logs/email'}
                tableCountLabel={true}
                pagination={true}
                search={true}
                filterCategory={[{ id: 0, name: 'Sites' }]}
                actions={true}
                viewPath={'/logs/email-log-preview'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailLogList;
