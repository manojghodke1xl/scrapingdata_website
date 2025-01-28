import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../atoms/table/Table';
import { useState } from 'react';
import { formatDateTime } from '../../utils/dateFormats';
import NoteComponent from '../../atoms/common/NoteComponent';
import { listSMTPNote } from './SmtpNotes';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';

const SmtpList = () => {
  const [smtps, setSmtps] = useState([]);

  const rows = smtps.map((smtp) => {
    const { _id, name, host, createdAt, updatedAt } = smtp;
    return {
      id: _id,
      name: <TruncatableFieldToolTip title={'Name'} content={name} />,
      host: <TruncatableFieldToolTip title={'Host'} content={host} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });
  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className=" w-full">
        <TableHeader heading={'SMTP Settings'} btn1={true} href1={'/smtp/add-smtp'} icon1={<IoMdAdd />} btnLabel1={'Add SMTP'} />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                headers={[
                  { label: 'Sr. No.', key: 'srno' },
                  { label: 'Name', key: 'name' },
                  { label: 'Host', key: 'host' },
                  { label: 'Created Date', key: 'createdAt' },
                  { label: 'Updated Date', key: 'updatedAt' }
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
