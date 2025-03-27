import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TableComponent from '../../atoms/table/Table';
import { IoMdAdd } from 'react-icons/io';
import { formatDateTime } from '../../utils/dateFormats';
import { deleteFileApi } from '../../apis/file-apis';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';

const FilesList = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);

  const rows = files.map((files) => {
    const { _id, site, attachments, createdAt, updatedAt } = files;
    return {
      id: _id,
      exportData: files,
      attachments: <TruncatableFieldToolTip content={attachments.map((a) => `${a.name}`).join(', ')} />,
      site: <TruncatableFieldToolTip content={`${site.name} (${site.host})}`} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  const columnConfig = [
    { id: 0, label: 'File Name', key: 'attachments', dataKey: 'attachments', formatForExport: (value) => (value ? value.map((a) => `${a.name} (${a.url})`).join(', ') : '') },
    { id: 1, label: 'Sites', key: 'site', dataKey: 'site', formatForExport: (value) => (value ? `${value.name} (${value.host})` : '') },
    { id: 2, label: 'Created Date', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
    { id: 3, label: 'Updated Date', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) }
  ];

  const actionItems = [
    { id: 0, label: 'Edit', icon: 'edit', handler: (row) => navigate(`/files/edit-file/${row.id}`) },
    { id: 1, label: 'Delete', icon: 'delete', deleteAction: true }
  ];

  return (
    <div className="p-1 overflow-x-hidden mb-12">
      <TableHeader heading={'Files'} btn1={true} href1={'/files/add-file'} icon1={<IoMdAdd />} btnLabel1={'Add File'} />
      <TableComponent
        selectable={true}
        search={true}
        filter={true}
        pagination={true}
        siteModule={'files'}
        headers={columnConfig}
        tableData={(data) => setFiles(data.files)}
        rows={rows}
        apiUrl={'file'}
        filterCategory={[{ id: 1, name: 'Sites' }]}
        deleteBtn={true}
        deleteApi={deleteFileApi}
        deleteMessage="Are you sure you want to delete this file?"
        deleteLabel={'Delete File'}
        actionItems={actionItems}
      />
    </div>
  );
};
export default FilesList;
