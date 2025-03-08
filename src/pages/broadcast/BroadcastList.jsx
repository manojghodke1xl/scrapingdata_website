import { IoMdAdd } from 'react-icons/io';
import TableHeader from '../../atoms/table/TableHeader';
import TableComponent from '../../atoms/table/Table';
import { useState } from 'react';
import { formatDateTime } from '../../utils/dateFormats';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';

const BroadcastList = () => {
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

  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className="w-full">
        <TableHeader heading={'Broadcast'} btn1={true} href1={'/broadcast/add-broadcast'} icon1={<IoMdAdd />} btnLabel1={'Add Broadcast'} />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                siteModule={'broadcast'}
                selectable={true}
                headers={columnConfig}
                tableData={(data) => setBroadcasts(data.broadcasts)}
                rows={rows}
                apiUrl={'broadcast'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                editPath={'/broadcast/edit-broadcast'}
                copyPath={'/broadcast/duplicate-broadcast'}
                search={true}
                filter={true}
                filterCategory={[{ id: 0, name: 'Sites' }]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BroadcastList;
