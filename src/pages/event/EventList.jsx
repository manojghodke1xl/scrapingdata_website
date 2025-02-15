import { useState } from 'react';
import { formatDateTime } from '../../utils/dateFormats';
import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../atoms/table/Table';
import { deleteEventApi } from '../../apis/event-apis';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TruncatableCopyFeild from '../../atoms/common/TruncatableCopyFeild';
import TableHeader from '../../atoms/table/TableHeader';
import { sendCertificateApi } from '../../apis/participant-apis';

const EventList = () => {
  const [events, setEvents] = useState([]);

  const rows = events.map((event) => {
    const { _id, name, date, endDate, lastBookingDate, venue, site, createdAt, updatedAt, timeZone, certificate } = event;
    return {
      id: _id,
      exportData: event,
      bookingId: _id,
      Keys: <TruncatableCopyFeild content={_id} />,
      name: <TruncatableFieldToolTip title={'Event Name'} content={name} />,
      site: <TruncatableFieldToolTip title={'Sites'} content={`${site?.name} (${site?.host})`} />,
      venue: <TruncatableFieldToolTip title={'Venue'} content={venue} />,
      timeZone: <TruncatableFieldToolTip title={'Timezone'} content={timeZone?.label} />,
      date: formatDateTime(date, timeZone || null),
      endDate: formatDateTime(endDate, timeZone || null),
      lastBookingDate: formatDateTime(lastBookingDate, timeZone || null),
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt),
      certificate
    };
  });

  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className=" w-full">
        <TableHeader heading={'Events'} btn1={'Add Event'} href1={'/events/add-event'} icon1={<IoMdAdd />} btnLabel1={'Add Event'} />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule={'events'}
                headers={[
                  { label: 'Sr. No.', key: 'srno' },
                  { label: 'Keys', key: 'Keys' },
                  { label: 'Event Name', key: 'name' },
                  { label: 'Sites', key: 'site' },
                  { label: 'Venue', key: 'venue' },
                  { label: 'Timezone', key: 'timeZone' },
                  { label: 'Start Date', key: 'date' },
                  { label: 'End Date', key: 'endDate' },
                  { label: 'Last Booking Date', key: 'lastBookingDate' },
                  { label: 'Created Date', key: 'createdAt' },
                  { label: 'Updated Date', key: 'updatedAt' }
                ]}
                tableData={(data) => setEvents(data.events)}
                rows={rows}
                apiUrl={'events'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                edit={true}
                editPath={'/events/edit-event'}
                view={true}
                viewPath={'/events/view-event'}
                copy={true}
                copyPath={'/events/duplicate-event'}
                managePackage={true}
                managePackagePath={'/packages/package-list'}
                search={true}
                filter={true}
                filterCategory={[
                  { id: 0, name: 'Status' },
                  { id: 1, name: 'Sites' }
                ]}
                statuses={[
                  { id: 0, name: 'Active', bgColor: '#ECFDF3', color: '#027948', dotColor: '#12B76A' },
                  { id: 2, name: 'Inactive', bgColor: '#F2F4F7', color: '#344054', dotColor: '#667085' }
                ]}
                searchCategory={[{ id: 1, name: 'Name' }]}
                deleteBtn={true}
                deleteAction={true}
                deleteApi={deleteEventApi}
                deleteLabel={'Delete Event'}
                deleteMessage={'Are you sure you want to delete this event?'}
                sendCertificate={'ID'}
                sendCertificateUnique={true}
                approvalApi={sendCertificateApi}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventList;
