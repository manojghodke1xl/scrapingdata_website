import { useState } from 'react';
import useGetAllSites from '../../hooks/useGetAllSites';
import TruncatableFieldModal from '../../atoms/modal/TruncatableFeildModel';
import { formatDateTime } from '../../utils/dateFormats';
import TableComponent from '../../atoms/table/Table';
import { Link } from 'react-router-dom';
import { deleteMailingListApi } from '../../apis/mailing-apis';

const MailingList = () => {
  const allsites = useGetAllSites();
  const [lists, setLists] = useState([]);

  const rows = lists.map((list) => {
    const { _id, email, createdAt, updatedAt, site } = list;
    return {
      id: _id,
      email: <TruncatableFieldModal title={'Email'} content={email} />,
      sites: <TruncatableFieldModal title={'Sites'} content={`${site?.name} (${site?.host})`} />,
      created: formatDateTime(createdAt),
      updated: formatDateTime(updatedAt)
    };
  });

  return (
    <div className="min-h-screen py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className=" w-full">
        <div className="w-full flex md:flex-wrap gap-y-3 sm:flex-nowrap justify-between pb-5 border-b border-primary">
          <div className="">
            <h4 className="text-3xl text-dark">All Mailing List</h4>
          </div>

          <div className="w-full flex justify-end sm:w-fit">
            <Link to="/mailing/mailing-integration" className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-hover text-white">
              <span className="hidden md:block">Api Integration</span>
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
                  { label: 'Email', key: 'email' },
                  { label: 'Sites', key: 'sites' },
                  { label: 'Created Date', key: 'created' },
                  { label: 'Updated Date', key: 'updated' }
                ]}
                tableData={(data) => setLists(data.lists)}
                rows={rows}
                apiUrl={'lists'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                view={true}
                viewPath={'/mailing/view-mailing'}
                search={true}
                filter={true}
                filterCategory={[{ id: 0, name: 'Sites' }]}
                allsites={allsites}
                searchCategory={[
                  { id: 1, name: 'Email' },
                  { id: 2, name: 'Site' }
                ]}
                deleteBtn={true}
                deleteLabel={'Delete Mailing List'}
                deleteMessage={'Are you sure you want to delete this mailing list?'}
                deleteApiUrl={deleteMailingListApi}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailingList;
