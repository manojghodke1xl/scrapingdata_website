import { useState } from 'react';
import TruncatableFieldModal from '../../atoms/modal/TruncatableFeildModel';
import { formatDateTime } from '../../utils/dateFormats';
import TableComponent from '../../atoms/table/Table';
import { Link } from 'react-router-dom';
import { deleteMailingListApi } from '../../apis/mailing-apis';
import { mailingListNote } from './MailingNotes';
import NoteComponent from '../../atoms/common/NoteComponent';
import { AiOutlineApi } from 'react-icons/ai';

const SubscribersList = () => {
  const [lists, setLists] = useState([]);

  const rows = lists.map((list) => {
    const { _id, email, createdAt, updatedAt, site, name } = list;
    return {
      id: _id,
      exportData: list,
      name: <TruncatableFieldModal title={'Name'} content={name} />,
      email: <TruncatableFieldModal title={'Email'} content={email} />,
      site: <TruncatableFieldModal title={'Sites'} content={`${site?.name} (${site?.host})`} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  return (
    <div className="min-h-screen py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className=" w-full">
        <div className="w-full flex md:flex-wrap gap-y-3 sm:flex-nowrap justify-between pb-5 border-b border-primary">
          <div className="">
            <h4 className="text-3xl text-dark">All Subscribers</h4>
          </div>

          <div className="w-full flex justify-end sm:w-fit">
            <Link to="/subscriber/subscriber-integration" className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-hover text-white">
              <AiOutlineApi size={22} />
              <span className="hidden md:block">API Integration</span>
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
                  { label: 'Name', key: 'name' },
                  { label: 'Email', key: 'email' },
                  { label: 'Sites', key: 'site' },
                  { label: 'Created Date', key: 'createdAt' },
                  { label: 'Updated Date', key: 'updatedAt' }
                ]}
                tableData={(data) => setLists(data.lists)}
                rows={rows}
                apiUrl={'lists'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                view={true}
                viewPath={'/subscriber/view-subscriber'}
                search={true}
                filter={true}
                filterCategory={[{ id: 0, name: 'Sites' }]}
                searchCategory={[
                  { id: 0, name: 'Name' },
                  { id: 1, name: 'Email' }
                ]}
                deleteBtn={true}
                deleteLabel={'Delete Mailing List'}
                deleteMessage={'Are you sure you want to delete this subscriber list?'}
                deleteApiUrl={deleteMailingListApi}
              />
            </div>
          </div>
        </div>
      </div>
      <NoteComponent note={mailingListNote} />
    </div>
  );
};

export default SubscribersList;
