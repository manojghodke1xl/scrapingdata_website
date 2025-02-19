import { useState } from 'react';
import TableComponent from '../../atoms/table/Table';
import TableHeader from '../../atoms/table/TableHeader';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import { formatDateTime } from '../../utils/dateFormats';
import { IoMdAdd } from 'react-icons/io';
import { deleteEventTicketApi } from '../../apis/event-ticket-apis';

const EventTicketList = () => {
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

  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className=" w-full">
        <TableHeader heading={'Tickets'} btn1={true} href1={'/tickets/add-ticket'} icon1={<IoMdAdd />} btnLabel1={'Add Ticket'} />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                headers={[
                  { label: 'Sr. No.', key: 'srno' },
                  { label: 'Name', key: 'name' },
                  { label: 'Created Date', key: 'createdAt' },
                  { label: 'Updated Date', key: 'updatedAt' }
                ]}
                tableData={(data) => setEventTickets(data.tickets)}
                rows={rows}
                apiUrl={'ticket'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                editPath={'/tickets/edit-ticket'}
                deleteBtn={true}
                deleteAction={true}
                deleteLabel={'Delete Ticket'}
                deleteMessage={'Are you sure you want to delete this ticket?'}
                deleteApi={deleteEventTicketApi}
                search={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventTicketList;
