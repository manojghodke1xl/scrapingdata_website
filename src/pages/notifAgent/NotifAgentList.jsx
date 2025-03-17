import { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import { formatDateTime } from '../../utils/dateFormats';
import TableHeader from '../../atoms/table/TableHeader';
import useColorContext from '../../hooks/useColorContext';
import TableComponent from '../../atoms/table/Table';
import { deleteNotifAgentApi, updateNotifAgentStatusApi } from '../../apis/notif-agent-apis';

const NotifAgentList = () => {
  const { isDarkMode } = useColorContext();
  const [notifAgents, setNotifAgents] = useState([]);

  const rows = notifAgents.map((agent) => {
    const { _id, name, email, isBlocked, sites, phoneCode, phoneNumber, createdAt, updatedAt } = agent;
    return {
      id: _id,
      exportData: agent,
      name: <TruncatableFieldToolTip content={name} />,
      email: <TruncatableFieldToolTip content={email} />,
      phoneNumber: <TruncatableFieldToolTip content={`${phoneCode ? (phoneCode?.startsWith('+') ? phoneCode : `+${phoneCode}`) : ''} ${phoneNumber ? phoneNumber : '-'}`} />,
      sites: <TruncatableFieldToolTip content={sites.map((s) => `${s.name} (${s.host})`).join(', ')} />,
      status: (
        <div
          className={`rounded-xl ${
            isBlocked ? `${isDarkMode ? 'border border-failed ' : 'bg-fadedred'} text-failed` : `${isDarkMode ? 'border border-success' : 'bg-lightgreen'} text-success`
          } px-2 py-1 w-fit flex gap-2 items-center`}
        >
          <span className={`min-w-[8px] min-h-[8px] rounded-full ${isBlocked ? 'bg-red' : 'bg-green'}`}></span>
          <span>{isBlocked ? 'Blocked' : 'Active'}</span>
        </div>
      ),
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  const columnConfig = [
    { id: 0, label: 'Name', key: 'name', dataKey: 'name' },
    { id: 1, label: 'Email', key: 'email', dataKey: 'email' },
    {
      id: 2,
      label: 'Contact Number',
      key: 'phoneNumber',
      dataKey: 'phoneNumber',
      formatForExport: (value, data) => `${data.phoneCode ? (data.phoneCode?.startsWith('+') ? data.phoneCode : `+${data.phoneCode}`) : ''} ${value ? value : '-'}`
    },
    { id: 3, label: 'Sites', key: 'sites', dataKey: 'sites', formatForExport: (value) => (value ? value.map((s) => `${s.name} (${s.host})`).join(', ') : '') },
    { id: 4, label: 'Status', key: 'status', dataKey: 'isBlocked', formatForExport: (value) => (value ? 'Blocked' : 'Active') },
    { id: 5, label: 'Created Date', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
    { id: 6, label: 'Updated Date', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) }
  ];

  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className="w-full">
        <TableHeader heading={'Notification Agents'} btn1={true} href1={'/notification-agent/add-notification-agent'} icon1={<IoMdAdd />} btnLabel1={'Add Notification Agent'} />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule={'NotifAgent'}
                headers={columnConfig}
                tableData={(data) => setNotifAgents(data.notifAgents)}
                rows={rows}
                apiUrl={'notif-agent'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                editPath={'/notification-agent/edit-notification-agent'}
                copyPath={'/notification-agent/duplicate-notification-agent'}
                search={true}
                filter={true}
                filterCategory={[
                  { id: 1, name: 'Sites' },
                  { id: 2, name: 'Status' }
                ]}
                statuses={[
                  { id: 0, name: 'Active', bgColor: '#ECFDF3', color: '#027948', dotColor: '#12B76A' },
                  { id: 1, name: 'Inactive', bgColor: '#F2F4F7', color: '#344054', dotColor: '#667085' }
                ]}
                searchCategory={[
                  { id: 1, name: 'Name' },
                  { id: 2, name: 'Email' }
                ]}
                adminStatus={true}
                modifyStatus={true}
                modifyStatusApi={updateNotifAgentStatusApi}
                deleteBtn={true}
                deleteAction={true}
                deleteApi={deleteNotifAgentApi}
                deleteLabel={'Delete Notification Agent'}
                deleteMessage={'Are you sure you want to delete this Notification Agent?'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotifAgentList;
