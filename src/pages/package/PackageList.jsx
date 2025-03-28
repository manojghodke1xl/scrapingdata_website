import { IoMdAdd } from 'react-icons/io';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('eventId');
  const [packages, setPackages] = useState([]);
  const [event, setEvent] = useState([]);

  const rows = packages.map((userPackage) => {
    const { _id, title, maxLimit, hasBooking, event, site, createdAt, updatedAt, ticketIdPattern } = userPackage;
    return {
      id: _id,
      hasBooking,
      exportData: userPackage,
      key: <TruncatableCopyFeild content={_id} />,
      title: <TruncatableFieldToolTip content={title} />,
      event: <TruncatableFieldToolTip content={`${event.name} (${event.venue})`} />,
      site: <TruncatableFieldToolTip content={`${site.name} (${site.host})`} />,
      date: formatDateTime(event.date),
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
    { id: 9, label: 'Sites', key: 'site', dataKey: 'site', formatForExport: (value) => (value ? `${value.name} (${value.host})` : '') },
    { id: 3, label: 'Event Date', key: 'date', dataKey: 'event.date', formatForExport: (value) => formatDateTime(value) },
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

  const actionItems = [
    { id: 0, label: 'Edit', icon: 'edit', handler: (row) => navigate(`/packages/edit-package/${row.id}`) },
    { id: 1, label: 'Copy', icon: 'copy', handler: (row) => navigate(`/packages/duplicate-package/${row.id}`) },
    { id: 2, label: 'Delete', icon: 'delete', deleteAction: true }
  ];

  return (
    <div className="p-1 overflow-x-hidden mb-12">
      <TableHeader heading={'Packages'} btn1={'Add Package'} href1={'/packages/add-package'} icon1={<IoMdAdd />} btnLabel1={'Add Package'} />
      <TableComponent
        selectable={true}
        siteModule={'packages'}
        headers={columnConfig}
        tableData={(data) => setPackages(data.packages)}
        rows={rows}
        apiUrl={'package'}
        events={event}
        pagination={true}
        search={true}
        filter={true}
        filterCategory={[
          { id: 0, name: 'Event' },
          { id: 1, name: 'Sites' }
        ]}
        searchCategory={[{ id: 1, name: 'Name' }]}
        deleteBtn={true}
        eventId={eventId}
        deleteApi={deletePackageApi}
        deleteLabel={'Delete Package'}
        deleteMessage={'Are you sure you want to delete this package?'}
        actionItems={actionItems}
      />
    </div>
  );
};

export default PackageList;
