import { useEffect, useState } from 'react';
import { formatDateTime } from '../../utils/dateFormats';
import TableComponent from '../../atoms/table/Table';
import { getAllEventsApi } from '../../apis/event-apis';
import { showNotification } from '../../utils/showNotification';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import CountryFlag from '../../atoms/common/CountryFlag';
import TableHeader from '../../atoms/table/TableHeader';

const ParticipantList = () => {
  const [participants, setParticipants] = useState([]);
  const [event, setEvent] = useState([]);

  const rows = participants.map((participant) => {
    const { _id, booking, createdAt, updatedAt, ticketId } = participant;
    const {
      name,
      email,
      event,
      package: { title },
      site,
      status,
      refUser,
      phoneNumber,
      phoneCode
    } = booking || {};

    return {
      id: _id,
      exportData: participant,
      name: <TruncatableFieldToolTip title={'Name'} content={name ?? ''} />,
      email: <TruncatableFieldToolTip title={'Email'} content={email ?? ''} />,
      country: <CountryFlag divClassName={'justify-center'} dialingCode={phoneCode?.startsWith('+') ? phoneCode.slice(1) : phoneCode} />,
      phoneNumber: (
        <TruncatableFieldToolTip
          title={'Mobile Number'}
          content={`${phoneCode ? (phoneCode.startsWith('+') ? phoneCode : `+${phoneCode}`) : ''} ${phoneNumber ? phoneNumber : '-'}`}
        />
      ),
      ticketId: <TruncatableFieldToolTip title={'Ticket ID'} content={ticketId ?? ''} />,
      site: <TruncatableFieldToolTip title={'Sites'} content={`${site?.name} (${site?.host})`} />,
      event: <TruncatableFieldToolTip title={'Event Name'} content={`${event.name} (${event.venue})`} />,
      eventDate: formatDateTime(event.date),
      title: <TruncatableFieldToolTip title={'Package Name'} content={title ?? ''} />,
      refUser: <TruncatableFieldToolTip title={'Referrer User'} content={refUser?.name ?? '--'} />,
      status: (
        <div
          className={`rounded-xl ${
            status === 'success' ? 'bg-lightgreen text-success' : status === 'pending' ? 'bg-fadeyellow text-pending' : 'bg-fadedred text-failed'
          } px-2 py-1 w-fit flex gap-2 items-center`}
        >
          <span className={`min-w-[8px] min-h-[8px] rounded-full ${status === 'success' ? 'bg-green' : 'bg-pending'}`}></span>
          <span>{status === 'success' ? 'Confirmed' : status === 'pending' ? 'Pending' : status === 'cancelled' ? 'Cancelled' : 'Failed'}</span>
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
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className=" w-full">
        <TableHeader heading={'Participants'} />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule={'participant'}
                headers={[
                  { label: 'Sr. No.', key: 'srno' },
                  { label: 'Name', key: 'name' },
                  { label: 'Email', key: 'email' },
                  { label: 'Country', key: 'country' },
                  { label: 'Mobile Number', key: 'phoneNumber' },
                  { label: 'Ticket ID', key: 'ticketId' },
                  { label: 'Sites', key: 'site' },
                  { label: 'Event', key: 'event' },
                  { label: 'Event Date', key: 'eventDate' },
                  { label: 'Package', key: 'title' },
                  { label: 'Referrer User', key: 'refUser' },
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
