import { IoMdAdd } from 'react-icons/io';
import { Link } from 'react-router-dom';
import TableComponent from '../../atoms/table/Table';
import { useState } from 'react';
import TruncatableFieldModal from '../../atoms/modal/TruncatableFeildModel';
import { formatDateTime } from '../../utils/dateFormats';
import NoteComponent from '../../atoms/common/NoteComponent';
import { listSMTPNote } from './SmtpNotes';

const SmtpList = () => {
  const [smtps, setSmtps] = useState([]);

  const rows = smtps.map((smtp) => {
    const { _id, name, host, createdAt, updatedAt } = smtp;
    return {
      id: _id,
      name: <TruncatableFieldModal title={'Name'} content={name} />,
      host: <TruncatableFieldModal title={'Host'} content={host} />,
      created: formatDateTime(createdAt),
      updated: formatDateTime(updatedAt)
    };
  });
  return (
    <div className="min-h-screen py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className=" w-full">
        <div className="w-full flex md:flex-wrap gap-y-3 sm:flex-nowrap justify-between pb-5 border-b border-primary">
          <div className="">
            <h4 className="text-3xl text-dark">All SMTPs List</h4>
          </div>
          <div className="w-full flex justify-end sm:w-fit">
            <Link to="/smtp/add-smtp" className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-hover text-white">
              <IoMdAdd size={22} />
              <span className="hidden md:block">Add SMTP</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                // selectable={true}
                headers={[
                  { label: 'Sr No.', key: 'srno' },
                  { label: 'Name', key: 'name' },
                  { label: 'Host', key: 'host' },
                  { label: 'Created Date', key: 'created' },
                  { label: 'Updated Date', key: 'updated' }
                ]}
                tableData={(data) => setSmtps(data.smtps)}
                rows={rows}
                apiUrl={'smtps'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                edit={true}
                editPath={'/smtp/edit-smtp'}
                search={true}
                searchCategory={[
                  { id: 0, name: 'Name' },
                  { id: 1, name: 'Host' }
                ]}
              />
            </div>
          </div>
        </div>
      </div>
      <NoteComponent note={listSMTPNote} />
    </div>
  );
};

export default SmtpList;
