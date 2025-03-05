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
      name: <TruncatableFieldToolTip content={name} />,
      email: <TruncatableFieldToolTip content={email} />,
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
          <span className={`min-w-[8px] min-h-[8px] rounded-full ${status === 'success' ? 'bg-green' : 'bg-pending'}`}></span>
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
                siteModule={'booking'}
                headers={[
                  { id: 0, label: 'Keys', key: 'Keys' },
                  { id: 1, label: 'Customer Name', key: 'name' },
                  { id: 2, label: 'Email', key: 'email' },
                  { id: 3, label: 'Country', key: 'phoneCode' },
                  { id: 4, label: 'Mobile Number', key: 'phoneNumber' },
                  { id: 5, label: 'Event', key: 'event' },
                  { id: 6, label: 'Package', key: 'title' },
                  { id: 7, label: 'Site', key: 'site' },
                  { id: 8, label: 'Status', key: 'status' },
                  { id: 9, label: 'Created At', key: 'createdAt' },
                  { id: 10, label: 'Updated At', key: 'updatedAt' }
                ]}
                tableData={(data) => setBookings(data.bookings)}
                rows={rows}
                apiUrl={'booking'}
                tableCountLabel={true}
                pagination={true}
                search={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingList;
