import { useEffect, useState } from 'react';
import { formatDateTime } from '../../utils/dateFormats';
import TableComponent from '../../atoms/table/Table';
import { getAllEventsApi } from '../../apis/event-apis';
import { showNotification } from '../../utils/showNotification';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';

const ParticipantList = () => {
  const [participants, setParticipants] = useState([]);
  const [event, setEvent] = useState([]);

  const rows = participants.map((participant) => {
    const { _id, booking, createdAt, updatedAt, ticketId } = participant;
    return {
      id: _id,
      exportData: participant,
      name: <TruncatableFieldToolTip title={'Name'} content={booking?.name ?? ''} />,
      email: <TruncatableFieldToolTip title={'Email'} content={booking?.email ?? ''} />,
      ticketId: <TruncatableFieldToolTip title={'Ticket ID'} content={ticketId ?? ''} />,
      site: <TruncatableFieldToolTip title={'Sites'} content={`${booking?.site?.name} (${booking?.site?.host})`} />,
      event: <TruncatableFieldToolTip title={'Event'} content={booking?.event?.name ?? ''} />,
      status: (
        <div
          className={`rounded-xl ${
            booking?.status === 'success' ? 'bg-lightgreen text-success' : booking?.status === 'pending' ? 'bg-fadeyellow text-pending' : 'bg-fadedred text-failed'
          } px-2 py-1 w-fit flex gap-2 items-center`}
        >
          <span className={`min-w-[12px] min-h-[12px] rounded-full ${booking?.status === 'success' ? 'bg-green' : 'bg-pending'}`}></span>
          <span>{booking?.status === 'success' ? 'Confirmed' : booking?.status === 'pending' ? 'Pending' : booking?.status === 'cancelled' ? 'Cancelled' : 'Failed'}</span>
        </div>
      ),
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  useEffect(() => {
    (async () => {
      const { status, data } = await getAllEventsApi();
      if (status) setEvent(data.events);
      else showNotification('warn', data);
    })().catch((error) => showNotification('error', error.message));
  }, []);

  return (
    <div className="py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className=" w-full">
        <div className="w-full flex md:flex-wrap gap-y-3 sm:flex-nowrap justify-between pb-5 border-b border-primary">
          <div className="">
            <h4 className="text-3xl text-dark">All Participants List</h4>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule={'participant'}
                headers={[
                  { label: 'Sr No.', key: 'srno' },
                  { label: 'Name', key: 'name' },
                  { label: 'Email', key: 'email' },
                  { label: 'Ticket ID', key: 'ticketId' },
                  { label: 'Sites', key: 'site' },
                  { label: 'Event', key: 'event' },
                  { label: 'Status', key: 'status' },
                  { label: 'Created Date', key: 'createdAt' },
                  { label: 'Updated Date', key: 'updatedAt' }
                ]}
                tableData={(data) => setParticipants(data.participants)}
                rows={rows}
                apiUrl={'participants'}
                tableCountLabel={true}
                pagination={true}
                // actions={true}
                search={true}
                filter={true}
                filterCategory={[
                  { id: 0, name: 'Sites' },
                  { id: 1, name: 'Event' }
                  //   { id: 2, name: 'Status' }
                ]}
                // statuses={[
                //   { id: 0, name: 'Active', bgColor: '#ECFDF3', color: '#027948', dotColor: '#12B76A' },
                //   { id: 2, name: 'Inactive', bgColor: '#F2F4F7', color: '#344054', dotColor: '#667085' }
                // ]}
                events={event}
                searchCategory={[
                  { id: 1, name: 'Name' },
                  { id: 2, name: 'Email' }
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantList;
