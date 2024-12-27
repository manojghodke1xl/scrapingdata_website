import { useState } from 'react';
import useGetAllSites from '../../hooks/useGetAllSites';
import TruncatableFieldModal from '../../atoms/modal/TruncatableFeildModel';
import { formatDateTime } from '../../utils/dateFormats';
import { Link } from 'react-router-dom';
import { IoMdAdd } from 'react-icons/io';
import TableComponent from '../../atoms/table/Table';
import { deleteEventApi } from '../../apis/event-apis';

const EventList = () => {
  const allsites = useGetAllSites();
  const [events, setEvents] = useState([]);

  const rows = events.map((event) => {
    const { _id, name, date, venue, site, createdAt, updatedAt } = event;
    return {
      id: _id,
      name: <TruncatableFieldModal title={'Event Name'} content={name} />,
      date: formatDateTime(date),
      sites: <TruncatableFieldModal title={'Sites'} content={`${site?.name} (${site?.host})`} />,
      venue: <TruncatableFieldModal title={'Venue'} content={venue} />,
      created: formatDateTime(createdAt),
      updated: formatDateTime(updatedAt)
    };
  });

  return (
    <div className="min-h-screen py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className=" w-full">
        <div className="w-full flex md:flex-wrap gap-y-3 sm:flex-nowrap justify-between pb-5 border-b border-primary">
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
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                headers={[
                  { label: 'Sr No.', key: 'srno' },
                  { label: 'Event', key: 'name' },
                  { label: 'Scheduled Date', key: 'date' },
                  { label: 'Sites', key: 'sites' },
                  { label: 'Venue', key: 'venue' },
                  { label: 'Created Date', key: 'created' },
                  { label: 'Updated Date', key: 'updated' }
                ]}
                tableData={(data) => setEvents(data.events)}
                rows={rows}
                apiUrl={'events'}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                edit={true}
                editPath={'/events/edit-event'}
                search={true}
                filter={true}
                filterCategory={[
                  { id: 0, name: 'Sites' },
                  { id: 1, name: 'Status' }
                ]}
                statuses={[
                  { id: 0, name: 'Active', bgColor: '#ECFDF3', color: '#027948', dotColor: '#12B76A' },
                  { id: 2, name: 'Inactive', bgColor: '#F2F4F7', color: '#344054', dotColor: '#667085' }
                ]}
                allsites={allsites}
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
