import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../atoms/table/Table';
import { useState } from 'react';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import { formatDateTime } from '../../utils/dateFormats';
import useGlobalContext from '../../hooks/useGlobalContext';
import { updateAdminStatusApi } from '../../apis/admin-apis';
import NoteComponent from '../../atoms/common/NoteComponent';
import { adminListNote } from './AdminNotes';
import TableHeader from '../../atoms/table/TableHeader';

const AdminList = () => {
  const {
    auth: { allSites }
  } = useGlobalContext();
  const [admins, setAdmins] = useState([]);

  const rows = admins.map((admin) => {
    const { _id, name, email, isBlocked, isSuperAdmin, sites, createdAt, updatedAt } = admin;
    return {
      id: _id,
      isSuperAdmin,
      exportData: admin,
      name: <TruncatableFieldToolTip title={'Name'} content={name} />,
      email: <TruncatableFieldToolTip title={'Email'} content={email} />,
      sites: (
        <TruncatableFieldToolTip
          title={'Sites'}
          content={isSuperAdmin ? allSites.map((s) => `${s.name} (${s.host})`).join(', ') : sites.map((s) => `${s.name} (${s.host})`).join(', ')}
        />
      ),
      isBlocked: (
        <div className={`rounded-xl ${isBlocked ? 'bg-[#FEF3F2] text-[#B32318]' : 'bg-[#ECFDF3] text-[#027948]'} px-2 py-1 w-fit flex gap-2 items-center`}>
          <span className={`min-w-[8px] min-h-[8px] rounded-full ${isBlocked ? 'bg-[#F04438]' : 'bg-[#12B76A]'}`}></span>
          <span>{isBlocked ? 'Blocked' : 'Active'}</span>
        </div>
      ),
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className="w-full">
        <TableHeader heading={'Admins'} btn1={true} href1={'/admin/add-admin'} icon1={<IoMdAdd />} btnLabel1={'Add Admin'} />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                headers={[
                  { label: 'Sr. No.', key: 'srno' },
                  { label: 'Admin Name', key: 'name' },
                  { label: 'Admin Email', key: 'email' },
                  { label: 'Sites', key: 'sites' },
                  { label: 'Status', key: 'isBlocked' },
                  { label: 'Created Date', key: 'createdAt' },
                  { label: 'Updated Date', key: 'updatedAt' }
                ]}
                tableData={(data) => setAdmins(data.admins)}
                rows={rows}
                apiUrl={'admins'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                edit={true}
                editPath={'/admin/edit-admin'}
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
              />
            </div>
          </div>
        </div>
      </div>
      <NoteComponent note={adminListNote} />
    </div>
  );
};

export default AdminList;
