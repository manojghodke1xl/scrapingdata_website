import { useState } from 'react';
import { formatDateTime } from '../../utils/dateFormats';
import TableHeader from '../../atoms/table/TableHeader';
import TableComponent from '../../atoms/table/Table';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const rows = tasks.map((task) => {
    const { _id, createdAt, updatedAt, name } = task;
    return {
      id: _id,
      exportData: task,
      name: <TruncatableFieldToolTip content={name} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  const columnConfig = [
    { id: 0, label: 'Name', key: 'name', dataKey: 'name' },
    { id: 1, label: 'Created Date', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
    { id: 2, label: 'Updated Date', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) }
  ];

  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className=" w-full">
        <TableHeader heading={'Tasks'} />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule={'task'}
                headers={columnConfig}
                tableData={(data) => setTasks(data.tasks)}
                rows={rows}
                apiUrl={'agenda-tasks'}
                tableCountLabel={true}
                pagination={true}
                search={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
