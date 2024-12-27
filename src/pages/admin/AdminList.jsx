import { IoMdAdd } from 'react-icons/io';
import { Link } from 'react-router-dom';
import TableComponent from '../../atoms/table/Table';
import { useState } from 'react';
import TruncatableFieldModal from '../../atoms/modal/TruncatableFeildModel';
import { formatDateTime } from '../../utils/dateFormats';
import useGetAllSites from '../../hooks/useGetAllSites';
import { updateAdminStatusApi } from '../../apis/admin-apis';

const AdminList = () => {
  const allsites = useGetAllSites();
  const [admins, setAdmins] = useState([]);

  const rows = admins.map((admin) => {
    const { _id, name, email, isBlocked, isSuperAdmin, sites, createdAt, updatedAt } = admin;
    return {
      id: _id,
      isSuperAdmin,
      name: <TruncatableFieldModal title={'Name'} content={name} />,
      email: <TruncatableFieldModal title={'Email'} content={email} />,
      sites: (
        <TruncatableFieldModal
          title={'Sites'}
          content={isSuperAdmin ? allsites.map((s) => `${s.name} (${s.host})`).join(', ') : sites.map((s) => `${s.name} (${s.host})`).join(', ')}
        />
      ),
      status: (
        <div className={`rounded-xl ${isBlocked ? 'bg-[#FEF3F2] text-[#B32318]' : 'bg-[#ECFDF3] text-[#027948]'} px-2 py-1 w-fit flex gap-2 items-center`}>
          <span className={`min-w-[12px] min-h-[12px] rounded-full ${isBlocked ? 'bg-[#F04438]' : 'bg-[#12B76A]'}`}></span>
          <span>{isBlocked ? 'Blocked' : 'Active'}</span>
        </div>
      ),
      created: formatDateTime(createdAt),
      updated: formatDateTime(updatedAt)
    };
  });

  return (
    <div className="min-h-screen py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className=" w-full">
        <div className="w-full flex md:flex-wrap gap-y-3 sm:flex-nowrap justify-between pb-5 border-b border-primary">
          <div className="">
            <h4 className="text-3xl text-dark">All Admin List</h4>
          </div>
          <div className="w-full flex justify-end sm:w-fit">
            <Link to="/admin/add-admin" className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-hover text-white">
              <IoMdAdd size={22} />
              <span className="hidden md:block">Add Admin</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                headers={[
                  { label: 'Sr No.', key: 'srno' },
                  { label: 'Admin Name', key: 'name' },
                  { label: 'Admin Email', key: 'email' },
                  { label: 'Sites', key: 'sites' },
                  { label: 'Status', key: 'status' },
                  { label: 'Created Date', key: 'created' },
                  { label: 'Updated Date', key: 'updated' }
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
                allsites={allsites}
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
    </div>
  );
};

export default AdminList;
