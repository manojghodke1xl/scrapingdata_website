import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../atoms/table/Table';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import { formatDateTime } from '../../utils/dateFormats';
import useGlobalContext from '../../hooks/useGlobalContext';
import { updateAdminStatusApi } from '../../apis/admin-apis';
import NoteComponent from '../../atoms/common/NoteComponent';
import { adminListNote } from './AdminNotes';
import TableHeader from '../../atoms/table/TableHeader';
import useColorContext from '../../hooks/useColorContext';

const AdminList = () => {
  const { isDarkMode } = useColorContext();
  const {
    auth: { allSites }
  } = useGlobalContext();
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);

  const rows = admins.map((admin) => {
    const { _id, name, email, isBlocked, isSuperAdmin, sites, createdAt, updatedAt } = admin;
    return {
      id: _id,
      isSuperAdmin,
      exportData: admin,
      name: <TruncatableFieldToolTip content={name} />,
      email: <TruncatableFieldToolTip content={email} />,
      sites: (
        <TruncatableFieldToolTip
          title={'Sites'}
          content={isSuperAdmin ? allSites.map((s) => `${s.name} (${s.host})`).join(', ') : sites.map((s) => `${s.name} (${s.host})`).join(', ')}
        />
      ),
      status: (
        <div
          className={`rounded-xl ${
            isBlocked ? `${isDarkMode ? 'border border-failed ' : 'bg-fadedred'} text-failed` : `${isDarkMode ? 'border border-success' : 'bg-lightgreen'} text-success`
          } px-2 py-1 w-fit flex gap-2 items-center`}
        >
          <span className={`min-w-[8px] min-h-[8px] rounded-full ${isBlocked ? 'bg-red' : 'bg-green'}`} />
          <span>{isBlocked ? 'Blocked' : 'Active'}</span>
        </div>
      ),
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  const columnConfig = [
    { id: 0, label: 'Admin Name', key: 'name', dataKey: 'name' },
    { id: 1, label: 'Admin Email', key: 'email', dataKey: 'email' },
    {
      id: 2,
      label: 'Sites',
      key: 'sites',
      dataKey: 'sites',
      formatForExport: (value, data) => {
        if (data.isSuperAdmin) return allSites.map((s) => `${s.name} (${s.host})`).join(', ');
        return value.map((s) => `${s.name} (${s.host})`).join(', ');
      }
    },
    {
      id: 3,
      label: 'Status',
      key: 'status',
      dataKey: 'isBlocked',
      formatForExport: (value) => (value ? 'Blocked' : 'Active')
    },
    {
      id: 4,
      label: 'Created Date',
      key: 'createdAt',
      dataKey: 'createdAt',
      formatForExport: (value) => formatDateTime(value)
    },
    {
      id: 5,
      label: 'Updated Date',
      key: 'updatedAt',
      dataKey: 'updatedAt',
      formatForExport: (value) => formatDateTime(value)
    }
  ];

  const actionItems = [{ id: 0, label: 'Edit', icon: 'edit', handler: (row) => navigate(`/admin/edit-admin/${row.id}`) }];

  return (
    <div className="p-1 overflow-x-hidden mb-12">
      <TableHeader heading={'Admins'} btn1={true} href1={'/admin/add-admin'} icon1={<IoMdAdd />} btnLabel1={'Add Admin'} />
      <TableComponent
        selectable={true}
        siteModule={'admins'}
        headers={columnConfig}
        tableData={(data) => setAdmins(data.admins)}
        rows={rows}
        apiUrl={'admins'}
        pagination={true}
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
        modifyStatusApi={updateAdminStatusApi}
        actionItems={actionItems}
      />
      <NoteComponent note={adminListNote} />
    </div>
  );
};

export default AdminList;
