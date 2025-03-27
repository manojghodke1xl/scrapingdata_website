import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import TableHeader from '../../atoms/table/TableHeader';
import TableComponent from '../../atoms/table/Table';
import { formatDateTime } from '../../utils/dateFormats';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';

const BroadcastList = () => {
  const navigate = useNavigate();
  const [broadcasts, setBroadcasts] = useState([]);

  const rows = broadcasts.map((broadcast) => {
    const { _id, target, refTo, site, broadcasts, createdAt, updatedAt } = broadcast;
    return {
      id: _id,
      exportData: broadcast,
      reminder: <TruncatableFieldToolTip content={refTo.name} />,
      target: <TruncatableFieldToolTip content={target} />,
      broadcasts: <TruncatableFieldToolTip content={broadcasts.length} />,
      site: <TruncatableFieldToolTip content={`${site?.name} (${site?.host})`} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  const columnConfig = [
    {
      id: 0,
      label: 'Reminder',
      key: 'reminder',
      dataKey: 'refTo.name'
    },
    { id: 1, label: 'Category', key: 'target', dataKey: 'target' },
    { id: 2, label: 'Follow Ups', key: 'broadcasts', dataKey: 'broadcasts', formatForExport: (value) => value?.length },
    { id: 3, label: 'Sites', key: 'site', dataKey: 'site', formatForExport: (value) => (value ? `${value?.name} (${value?.host})` : '') },
    {
      id: 4,
      label: 'Created Date',
      key: 'createdAt',
      dataKey: 'createdAt',
      formatForExport: (value) => formatDateTime(value)
    },
    {
      id: 5,
      label: 'Updated Date',
      key: 'updatedAt',
      dataKey: 'updatedAt',
      formatForExport: (value) => formatDateTime(value)
    }
  ];

  const actionItems = [
    { id: 0, label: 'Edit', icon: 'edit', handler: (row) => navigate(`/broadcast/edit-broadcast/${row.id}`) },
    { id: 1, label: 'Copy', icon: 'copy', handler: (row) => navigate(`/broadcast/duplicate-broadcast/${row.id}`) }
  ];

  return (
    <div className="p-1 overflow-x-hidden mb-12">
      <TableHeader heading={'Broadcast'} btn1={true} href1={'/broadcast/add-broadcast'} icon1={<IoMdAdd />} btnLabel1={'Add Broadcast'} />
      <TableComponent
        siteModule={'broadcast'}
        selectable={true}
        headers={columnConfig}
        tableData={(data) => setBroadcasts(data.broadcasts)}
        rows={rows}
        apiUrl={'broadcast'}
        pagination={true}
        search={true}
        filter={true}
        filterCategory={[{ id: 0, name: 'Sites' }]}
        actionItems={actionItems}
      />
    </div>
  );
};

export default BroadcastList;
