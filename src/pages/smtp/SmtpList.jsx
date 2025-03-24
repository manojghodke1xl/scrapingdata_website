import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../atoms/table/Table';
import { useState } from 'react';
import { formatDateTime } from '../../utils/dateFormats';
import NoteComponent from '../../atoms/common/NoteComponent';
import { listSMTPNote } from './SmtpNotes';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';
import { deleteSmtpApi } from '../../apis/smtp-apis';

const SmtpList = () => {
  const [smtps, setSmtps] = useState([]);

  const rows = smtps.map((smtp) => {
    const { _id, name, host, createdAt, updatedAt } = smtp;
    return {
      id: _id,
      exportData: smtp,
      name: <TruncatableFieldToolTip content={name} />,
      host: <TruncatableFieldToolTip content={host} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  const columnConfig = [
    { id: 0, label: 'Name', key: 'name', dataKey: 'name' },
    { id: 1, label: 'Host', key: 'host', dataKey: 'host' },
    { id: 2, label: 'Created Date', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
    { id: 3, label: 'Updated Date', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) }
  ];

  return (
    <div className="p-1 overflow-x-hidden mb-12">
      <TableHeader heading={'SMTP Settings'} btn1={true} href1={'/smtp/add-smtp'} icon1={<IoMdAdd />} btnLabel1={'Add SMTP'} />
      <TableComponent
        selectable={true}
        siteModule={'smtp'}
        headers={columnConfig}
        tableData={(data) => setSmtps(data.smtps)}
        rows={rows}
        apiUrl={'smtp'}
        tableCountLabel={true}
        pagination={true}
        actions={true}
        editPath={'/smtp/edit-smtp'}
        copyPath={'/smtp/duplicate-smtp'}
        search={true}
        searchCategory={[
          { id: 0, name: 'Name' },
          { id: 1, name: 'Host' }
        ]}
        deleteBtn={true}
        deleteAction={true}
        deleteApi={deleteSmtpApi}
        deleteLabel={'Delete SMTP'}
        deleteMessage={'Are you sure you want to delete this SMTP?'}
      />
      <NoteComponent note={listSMTPNote} />
    </div>
  );
};

export default SmtpList;
