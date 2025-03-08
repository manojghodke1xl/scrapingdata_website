import { IoMdAdd } from 'react-icons/io';
import TableHeader from '../../atoms/table/TableHeader';
import TableComponent from '../../atoms/table/Table';
import { useState } from 'react';
import { formatDateTime } from '../../utils/dateFormats';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';

const ReminderList = () => {
  const [reminders, setReminders] = useState([]);

  const rows = reminders.map((reminder) => {
    const { _id, target, refTo, site, reminders, createdAt, updatedAt } = reminder;
    return {
      id: _id,
      exportData: reminder,
      reminder: <TruncatableFieldToolTip content={refTo.name} />,
      target: <TruncatableFieldToolTip content={target} />,
      reminders: <TruncatableFieldToolTip content={reminders.length} />,
      site: <TruncatableFieldToolTip content={`${site?.name} (${site?.host})`} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  const columnConfig = [
    { id: 0, label: 'Reminder', key: 'reminder', dataKey: 'refTo.name' },
    { id: 1, label: 'Category', key: 'target', dataKey: 'target' },
    { id: 2, label: 'Follow Ups', key: 'reminders', dataKey: 'reminders', formatForExport: (value) => (value ? value.length : '') },
    { id: 3, label: 'Sites', key: 'site', dataKey: 'site', formatForExport: (value) => (value ? `${value.name} (${value.host})` : '') },
    { id: 4, label: 'Created Date', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
    { id: 5, label: 'Updated Date', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) }
  ];

  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className="w-full">
        <TableHeader heading={'Reminders'} btn1={true} href1={'/reminder/add-reminder'} icon1={<IoMdAdd />} btnLabel1={'Add Reminders'} />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                siteModule={'after-sales'}
                selectable={true}
                headers={columnConfig}
                tableData={(data) => setReminders(data.reminders)}
                rows={rows}
                apiUrl={'reminder'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                editPath={'/reminder/edit-reminder'}
                copyPath={'/reminder/duplicate-reminder'}
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

export default ReminderList;
