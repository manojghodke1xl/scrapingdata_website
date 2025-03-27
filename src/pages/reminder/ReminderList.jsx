import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import TableHeader from '../../atoms/table/TableHeader';
import TableComponent from '../../atoms/table/Table';
import { formatDateTime } from '../../utils/dateFormats';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';

const ReminderList = () => {
  const navigate = useNavigate();
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

  const actionItems = [
    { id: 0, label: 'Edit', icon: 'edit', handler: (row) => navigate(`/reminder/edit-reminder/${row.id}`) },
    { id: 2, label: 'Copy', icon: 'copy', handler: (row) => navigate(`/reminder/duplicate-reminder/${row.id}`) }
  ];

  return (
    <div className="p-1 overflow-x-hidden mb-12">
      <TableHeader heading={'Reminders'} btn1={true} href1={'/reminder/add-reminder'} icon1={<IoMdAdd />} btnLabel1={'Add Reminders'} />
      <TableComponent
        siteModule={'after-sales'}
        selectable={true}
        headers={columnConfig}
        tableData={(data) => setReminders(data.reminders)}
        rows={rows}
        apiUrl={'reminder'}
        pagination={true}
        search={true}
        filter={true}
        filterCategory={[{ id: 0, name: 'Sites' }]}
        actionItems={actionItems}
      />
    </div>
  );
};

export default ReminderList;
