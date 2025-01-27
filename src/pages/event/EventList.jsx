import { useState } from 'react';
import { formatDateTime } from '../../utils/dateFormats';
import { Link } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../atoms/table/Table';
import { deleteEventApi } from '../../apis/event-apis';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';

const EventList = () => {
  const [events, setEvents] = useState([]);

  const rows = events.map((event) => {
    const { _id, name, date, endDate, lastBookingDate, venue, site, createdAt, updatedAt } = event;
    return {
      id: _id,
      exportData: event,
      Keys: _id,
      name: <TruncatableFieldToolTip title={'Event Name'} content={name} />,
      site: <TruncatableFieldToolTip title={'Sites'} content={`${site?.name} (${site?.host})`} />,
      venue: <TruncatableFieldToolTip title={'Venue'} content={venue} />,
      date: formatDateTime(date),
      endDate: formatDateTime(endDate),
      lastBookingDate: formatDateTime(lastBookingDate),
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className=" w-full">
        <div className="w-full flex md:flex-wrap gap-y-3 sm:flex-nowrap justify-between">
          <div className="">
            <h4 className="text-3xl text-dark">All Events List</h4>
          </div>
          <div className="w-full flex justify-end sm:w-fit">
            <Link to="/events/add-event" className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-hover text-white">
              <IoMdAdd size={22} />
              <span className="hidden md:block">Add Event</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule={'events'}
                headers={[
                  { label: 'Sr No.', key: 'srno' },
                  { label: 'Keys', key: 'Keys' },
                  { label: 'Event Name', key: 'name' },
                  { label: 'Sites', key: 'site' },
                  { label: 'Venue', key: 'venue' },
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
                deleteApi={deleteEventApi}
                deleteLabel={'Delete Event'}
                deleteMessage={'Are you sure you want to delete this event?'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventList;
