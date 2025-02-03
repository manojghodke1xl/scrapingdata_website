import { IoMdAdd } from 'react-icons/io';
import TableHeader from '../../atoms/table/TableHeader';

const AfterSalesList = () => {
  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className="w-full">
        <TableHeader heading={'After Sales'} btn1={true} href1={'/after-sales/add-after-sale'} icon1={<IoMdAdd size={22} />} btnLabel1={'Add After Sales'} />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              {/* <TableComponent
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
              /> */}
            </div>
          </div>
        </div>
      </div>
      {/* <NoteComponent note={adminListNote} /> */}
    </div>
  );
};

export default AfterSalesList;
