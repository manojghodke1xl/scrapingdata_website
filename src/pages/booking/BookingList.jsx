import { useState } from 'react';
import TableComponent from '../../atoms/table/Table';
import TruncatableFieldModal from '../../atoms/modal/TruncatableFeildModel';
import { formatDateTime } from '../../utils/dateFormats';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  const rows = bookings.map((booking) => {
    const {
      _id,
      name,
      email,
      event,
      package: { title },
      site,
      staus,
      createdAt,
      updatedAt,
      phoneNumber
    } = booking;
    console.log(staus);

    return {
      id: _id,
      exportData: booking,
      Keys: _id,
      name: <TruncatableFieldModal title={'Customer Name'} content={name} />,
      email: <TruncatableFieldModal title={'Email'} content={email} />,
      email: <TruncatableFieldModal title={'Mobile Number'} content={phoneNumber} />,
      event: <TruncatableFieldModal title={'Event Name'} content={`${event.name} (${event.venue})`} />,
      title: <TruncatableFieldModal title={'Package Name'} content={title} />,
      site: <TruncatableFieldModal title={'Sites'} content={`${site?.name} (${site?.host})`} />,
      staus: (
        <div
          className={`rounded-xl ${
            staus === 'success' ? 'bg-lightgreen text-success' : staus === 'pending' ? 'bg-fadeyellow text-pending' : 'bg-fadedred text-failed'
          } px-2 py-1 w-fit flex gap-2 items-center`}
        >
          <span className={`min-w-[12px] min-h-[12px] rounded-full ${staus === 'success' ? 'bg-green' : 'bg-pending'}`}></span>
          <span>{staus === 'success' ? 'Success' : staus === 'pending' ? 'Pending' : 'Failed'}</span>
        </div>
      ),
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  return (
    <div className="min-h-screen py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className=" w-full">
        <div className="w-full flex md:flex-wrap gap-y-3 sm:flex-nowrap justify-between pb-5 border-b border-primary">
          <div className="">
            <h4 className="text-3xl text-dark">Bookings</h4>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule="booking"
                headers={[
                  { label: 'Sr No.', key: 'srno' },
                  { label: 'Keys', key: 'Keys' },
                  { label: 'Customer Name', key: 'name' },
                  { label: 'Email', key: 'email' },
                  { label: 'Event', key: 'event' },
                  { label: 'Package', key: 'title' },
                  { label: 'Site', key: 'site' },
                  { label: 'Status', key: 'staus' },
                  { label: 'Created At', key: 'createdAt' },
                  { label: 'Updated At', key: 'updatedAt' }
                ]}
                tableData={(data) => setBookings(data.bookings)}
                rows={rows}
                apiUrl={'bookings'}
                tableCountLabel={true}
                pagination={true}
                search={true}
                // filter={true}
                // filterCategory={[
                //   { id: 1, name: 'Sites' },
                //   { id: 2, name: 'Status' }
                // ]}
                // statuses={[
                //   { id: 0, name: 'Active', bgColor: '#ECFDF3', color: '#027948', dotColor: '#12B76A' },
                //   { id: 2, name: 'Inactive', bgColor: '#F2F4F7', color: '#344054', dotColor: '#667085' }
                // ]}
                // searchCategory={[{ id: 1, name: 'Title' }]}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <NoteComponent note={casestudyListNote} /> */}
    </div>
  );
};

export default BookingList;
