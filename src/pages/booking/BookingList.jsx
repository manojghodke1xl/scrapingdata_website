import { useState } from 'react';
import TableComponent from '../../atoms/table/Table';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import { formatDateTime } from '../../utils/dateFormats';
import TruncatableCopyFeild from '../../atoms/common/TruncatableCopyFeild';
import CountryFlag from '../../atoms/common/CountryFlag';
import TableHeader from '../../atoms/table/TableHeader';

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
      status,
      createdAt,
      updatedAt,
      phoneNumber,
      phoneCode
    } = booking;

    return {
      id: _id,
      exportData: booking,
      Keys: <TruncatableCopyFeild content={_id} />,
      name: <TruncatableFieldToolTip title={'Customer Name'} content={name} />,
      email: <TruncatableFieldToolTip title={'Email'} content={email} />,
      phoneCode: <CountryFlag dialingCode={phoneCode?.startsWith('+') ? phoneCode.slice(1) : phoneCode} />,
      phoneNumber: (
        <TruncatableFieldToolTip
          title={'Mobile Number'}
          content={`${phoneCode ? (phoneCode.startsWith('+') ? phoneCode : `+${phoneCode}`) : ''} ${phoneNumber ? phoneNumber : '-'}`}
        />
      ),
      event: <TruncatableFieldToolTip title={'Event Name'} content={`${event.name} (${event.venue})`} />,
      title: <TruncatableFieldToolTip title={'Package Name'} content={title} />,
      site: <TruncatableFieldToolTip title={'Sites'} content={`${site?.name} (${site?.host})`} />,
      status: (
        <div
          className={`rounded-xl ${
            status === 'success' ? 'bg-lightgreen text-success' : status === 'pending' ? 'bg-fadeyellow text-pending' : 'bg-fadedred text-failed'
          } px-2 py-1 w-fit flex gap-2 items-center`}
        >
          <span className={`min-w-[12px] min-h-[12px] rounded-full ${status === 'success' ? 'bg-green' : 'bg-pending'}`}></span>
          <span>{status === 'success' ? 'Success' : status === 'pending' ? 'Pending' : 'Failed'}</span>
        </div>
      ),
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  return (
    <div className="py-5 px-8 overflow-x-hidden mb-10">
      <div className="w-full">
        <TableHeader heading={'Bookings'} />
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
                  { label: 'Country', key: 'phoneCode' },
                  { label: 'Mobile Number', key: 'phoneNumber' },
                  { label: 'Event', key: 'event' },
                  { label: 'Package', key: 'title' },
                  { label: 'Site', key: 'site' },
                  { label: 'Status', key: 'status' },
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
