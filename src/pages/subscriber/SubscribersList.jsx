import { useState } from 'react';
import { formatDateTime } from '../../utils/dateFormats';
import TableComponent from '../../atoms/table/Table';
import { deleteMailingListApi } from '../../apis/mailing-apis';
import { mailingListNote } from './MailingNotes';
import NoteComponent from '../../atoms/common/NoteComponent';
import { AiOutlineApi } from 'react-icons/ai';
import { IoMdAdd } from 'react-icons/io';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';

const SubscribersList = () => {
  const [lists, setLists] = useState([]);

  const rows = lists.map((list) => {
    const { _id, email, createdAt, updatedAt, site, name } = list;
    return {
      id: _id,
      exportData: list,
      name: <TruncatableFieldToolTip title={'Name'} content={name} />,
      email: <TruncatableFieldToolTip title={'Email'} content={email} />,
      site: <TruncatableFieldToolTip title={'Sites'} content={`${site?.name} (${site?.host})`} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className=" w-full">
        <TableHeader
          heading={'Subscribers'}
          btn1={true}
          href1={'/subscriber/subscriber-integration'}
          icon1={<AiOutlineApi size={22} />}
          btnLabel1={'API Integration'}
          btn2={true}
          href2={'/subscriber/add-subscriber'}
          icon2={<IoMdAdd size={22} />}
          btnLabel2={'Add Subscriber'}
        />
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
