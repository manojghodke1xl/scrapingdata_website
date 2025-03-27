import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TableComponent from '../../atoms/table/Table';
import TableHeader from '../../atoms/table/TableHeader';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import { formatDateTime } from '../../utils/dateFormats';
import { IoMdAdd } from 'react-icons/io';
import { deleteEventTicketApi } from '../../apis/event-ticket-apis';

const EventTicketList = () => {
  const navigate = useNavigate();
  const [eventTickets, setEventTickets] = useState([]);

  const rows = eventTickets.map((eventTicket) => {
    const { _id, name, createdAt, updatedAt } = eventTicket;
    return {
      id: _id,
      exportData: eventTicket,
      name: <TruncatableFieldToolTip content={name} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  const columnConfig = [
    { id: 0, label: 'Name', key: 'name', dataKey: 'name' },
    { id: 1, label: 'Created Date', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => (value ? formatDateTime(value) : 'N/A') },
    { id: 2, label: 'Updated Date', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => (value ? formatDateTime(value) : 'N/A') }
  ];

  const actionItems = [
    { id: 0, label: 'Edit', icon: 'edit', handler: (row) => navigate(`/tickets/edit-ticket/${row.id}`) },
    { id: 1, label: 'Delete', icon: 'delete', deleteAction: true }
  ];

  return (
    <div className="p-1 overflow-x-hidden mb-12">
      <TableHeader heading={'Tickets'} btn1={true} href1={'/tickets/add-ticket'} icon1={<IoMdAdd />} btnLabel1={'Add Ticket'} />
      <TableComponent
        selectable={true}
        siteModule={'ticket'}
        headers={columnConfig}
        tableData={(data) => setEventTickets(data.tickets)}
        rows={rows}
        apiUrl={'ticket'}
        pagination={true}
        deleteBtn={true}
        deleteLabel={'Delete Ticket'}
        deleteMessage={'Are you sure you want to delete this ticket?'}
        deleteApi={deleteEventTicketApi}
        search={true}
        actionItems={actionItems}
      />
    </div>
  );
};

export default EventTicketList;
