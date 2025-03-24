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
      name: <TruncatableFieldToolTip content={name} />,
      site: <TruncatableFieldToolTip content={`${site?.name} (${site?.host})`} />,
      venue: <TruncatableFieldToolTip content={venue} />,
      timeZone: <TruncatableFieldToolTip content={timeZone?.label} />,
      date: formatDateTime(date, timeZone || null),
      endDate: formatDateTime(endDate, timeZone || null),
      lastBookingDate: formatDateTime(lastBookingDate, timeZone || null),
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt),
      certificate
    };
  });

  const columnConfig = [
    { id: 0, label: 'Keys', key: 'Keys', dataKey: '_id' },
    { id: 1, label: 'Event Name', key: 'name', dataKey: 'name' },
    { id: 2, label: 'Sites', key: 'site', dataKey: 'site', formatForExport: (value) => (value ? `${value.name} (${value.host})` : 'N/A') },
    { id: 3, label: 'Venue', key: 'venue', dataKey: 'venue' },
    { id: 4, label: 'Timezone', key: 'timeZone', dataKey: 'timeZone.label', formatForExport: (value) => value || 'N/A' },
    { id: 5, label: 'Start Date', key: 'date', dataKey: 'date', formatForExport: (value, data) => (value ? formatDateTime(value, data.timeZone || null) : 'N/A') },
    { id: 6, label: 'End Date', key: 'endDate', dataKey: 'endDate', formatForExport: (value, data) => (value ? formatDateTime(value, data.timeZone || null) : 'N/A') },
    {
      id: 7,
      label: 'Last Booking Date',
      key: 'lastBookingDate',
      dataKey: 'lastBookingDate',
      formatForExport: (value, data) => (value ? formatDateTime(value, data.timeZone || null) : 'N/A')
    },
    { id: 8, label: 'Created Date', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => (value ? formatDateTime(value) : 'N/A') },
    { id: 9, label: 'Updated Date', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => (value ? formatDateTime(value) : 'N/A') }
  ];

  return (
    <div className="p-1 overflow-x-hidden mb-12">
      <TableHeader heading={'Events'} btn1={'Add Event'} href1={'/events/add-event'} icon1={<IoMdAdd />} btnLabel1={'Add Event'} />
      <TableComponent
        selectable={true}
        siteModule={'events'}
        headers={columnConfig}
        tableData={(data) => setEvents(data.events)}
        rows={rows}
        apiUrl={'events'}
        tableCountLabel={true}
        pagination={true}
        actions={true}
        editPath={'/events/edit-event'}
        viewPath={'/events/view-event'}
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
  );
};

export default EventList;
