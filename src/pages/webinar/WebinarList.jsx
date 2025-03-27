import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../atoms/table/Table';
import { formatDateTime } from '../../utils/dateFormats';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';
import TruncatableCopyFeild from '../../atoms/common/TruncatableCopyFeild';

const WebinarList = () => {
  const navigate = useNavigate();
  const [webinars, setWebinars] = useState([]);

  const rows = webinars.map((webinar) => {
    const { _id, name, createdAt, updatedAt } = webinar;
    return {
      id: _id,
      exportData: webinar,
      key: <TruncatableCopyFeild content={_id} />,
      name: <TruncatableFieldToolTip content={name} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  const columnConfig = [
    { id: 0, label: 'Key', key: 'key', dataKey: '_id' },
    { id: 1, label: 'Name', key: 'name', dataKey: 'name' },
    { id: 2, label: 'Created Date', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
    { id: 3, label: 'Updated Date', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) }
  ];

  const actionItems = [{ id: 0, label: 'Edit', icon: 'edit', handler: (row) => navigate(`/webinar/edit-webinar/${row.id}`) }];

  return (
    <div className="p-1 overflow-x-hidden mb-12">
      <TableHeader heading={'Webinars'} btn1={true} href1={'/webinar/add-webinar'} icon1={<IoMdAdd />} btnLabel1={'Add Webinar'} />
      <TableComponent
        selectable={true}
        headers={columnConfig}
        siteModule={'webinar'}
        tableData={(data) => setWebinars(data.webinars)}
        rows={rows}
        apiUrl={'webinar'}
        pagination={true}
        search={true}
        actionItems={actionItems}
      />
    </div>
  );
};

export default WebinarList;
