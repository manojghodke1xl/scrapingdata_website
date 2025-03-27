import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../atoms/table/Table';
import { formatDateTime } from '../../utils/dateFormats';
import NoteComponent from '../../atoms/common/NoteComponent';
import { listSMTPNote } from './SmtpNotes';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';
import { deleteSmtpApi } from '../../apis/smtp-apis';

const SmtpList = () => {
  const navigate = useNavigate();
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

  const actionItems = [
    { id: 0, label: 'Edit', icon: 'edit', handler: (row) => navigate(`/smtp/edit-smtp/${row.id}`) },
    { id: 1, label: 'Copy', icon: 'copy', handler: (row) => navigate(`/smtp/duplicate-smtp/${row.id}`) },
    { id: 2, label: 'Delete', icon: 'delete', deleteAction: true }
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
        pagination={true}
        search={true}
        searchCategory={[
          { id: 0, name: 'Name' },
          { id: 1, name: 'Host' }
        ]}
        deleteBtn={true}
        deleteApi={deleteSmtpApi}
        deleteLabel={'Delete SMTP'}
        deleteMessage={'Are you sure you want to delete this SMTP?'}
        actionItems={actionItems}
      />
      <NoteComponent note={listSMTPNote} />
    </div>
  );
};

export default SmtpList;
