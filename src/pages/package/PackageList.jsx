import { IoMdAdd } from 'react-icons/io';
import { useSearchParams } from 'react-router-dom';
import TableComponent from '../../atoms/table/Table';
import { useEffect, useState } from 'react';
import { formatDateTime } from '../../utils/dateFormats';
import { getAllEventsApi } from '../../apis/event-apis';
import { showNotification } from '../../utils/showNotification';
import { deletePackageApi } from '../../apis/package-apis';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TruncatableCopyFeild from '../../atoms/common/TruncatableCopyFeild';
import TableHeader from '../../atoms/table/TableHeader';

const PackageList = () => {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('eventId');
  const [packages, setPackages] = useState([]);
  const [event, setEvent] = useState([]);

  const rows = packages.map((userPackage) => {
    const { _id, title, amount, maxLimit, hasBooking, event, createdAt, updatedAt, ticketIdPattern } = userPackage;
    return {
      id: _id,
      hasBooking,
      exportData: userPackage,
      key: <TruncatableCopyFeild content={_id} />,
      title: <TruncatableFieldToolTip content={title} />,
      event: <TruncatableFieldToolTip content={`${event.name} (${event.venue})`} />,
      date: formatDateTime(event.date),
      amount: <TruncatableFieldToolTip content={amount} />,
      maxLimit: <TruncatableFieldToolTip content={maxLimit} />,
      ticketIdPattern: <TruncatableFieldToolTip content={ticketIdPattern} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  const columnConfig = [
    { id: 0, label: 'Key', key: 'key', dataKey: '_id' },
    { id: 1, label: 'Package Title', key: 'title', dataKey: 'title' },
    {
      id: 2,
      label: 'Event',
      key: 'event',
      dataKey: 'event',
      formatForExport: (value) => (value ? `${value.name} (${value.venue})` : '')
    },
    { id: 3, label: 'Event Date', key: 'date', dataKey: 'event.date', formatForExport: (value) => formatDateTime(value) },
    { id: 4, label: 'Price', key: 'amount', dataKey: 'amount' },
    { id: 5, label: 'Max Attendees', key: 'maxLimit', dataKey: 'maxLimit' },
    { id: 6, label: 'Ticket ID Pattern', key: 'ticketIdPattern', dataKey: 'ticketIdPattern' },
    { id: 7, label: 'Created Date', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
    { id: 8, label: 'Updated Date', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) }
  ];

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
        <TableHeader heading={'Packages'} btn1={'Add Package'} href1={'/packages/add-package'} icon1={<IoMdAdd />} btnLabel1={'Add Package'} />
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full align-middle">
              <TableComponent
                selectable={true}
                siteModule={'packages'}
                headers={columnConfig}
                tableData={(data) => setPackages(data.packages)}
                rows={rows}
                apiUrl={'package'}
                events={event}
                tableCountLabel={true}
                pagination={true}
                actions={true}
                editPath={'/packages/edit-package'}
                copyPath={'/packages/duplicate-package'}
                deleteAction={true}
                search={true}
                filter={true}
                filterCategory={[{ id: 1, name: 'Event' }]}
                searchCategory={[{ id: 1, name: 'Name' }]}
                deleteBtn={true}
                eventId={eventId}
                deleteApi={deletePackageApi}
                deleteLabel={'Delete Package'}
                deleteMessage={'Are you sure you want to delete this package?'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageList;
