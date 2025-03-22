import { useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { CiExport } from 'react-icons/ci';
import { formatDateTime } from '../../utils/dateFormats';
import TableComponent from '../../atoms/table/Table';
import { getAllEventsApi } from '../../apis/event-apis';
import { showNotification } from '../../utils/showNotification';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import CountryFlag from '../../atoms/common/CountryFlag';
import TableHeader from '../../atoms/table/TableHeader';
import useColorContext from '../../hooks/useColorContext';
import { sendCertificateApi } from '../../apis/participant-apis';

const ParticipantList = () => {
  const { isDarkMode } = useColorContext();
  const [participants, setParticipants] = useState([]);
  const [event, setEvent] = useState([]);

  const rows = participants.map((participant) => {
    const { _id, booking, createdAt, updatedAt, ticketId } = participant;

    const { _id: bookingId, name, email, city, event, package: userPackage, site, status, refUser, phoneNumber, phoneCode, payment } = booking || {};

    return {
      id: _id,
      exportData: participant,
      bookingId,
      certificate: userPackage?.certificate,
      name: <TruncatableFieldToolTip content={name ?? ''} />,
      email: <TruncatableFieldToolTip content={email ?? ''} />,
      city: <TruncatableFieldToolTip content={city ?? ''} />,
      country: <CountryFlag divClassName={'justify-center'} dialingCode={phoneCode?.startsWith('+') ? phoneCode?.slice(1) : phoneCode} />,
      phoneNumber: <TruncatableFieldToolTip content={`${phoneCode ? (phoneCode?.startsWith('+') ? phoneCode : `+${phoneCode}`) : ''} ${phoneNumber ? phoneNumber : '-'}`} />,
      ticketId: <TruncatableFieldToolTip content={ticketId ?? ''} />,
      site: <TruncatableFieldToolTip content={`${site?.name} (${site?.host})`} />,
      event: <TruncatableFieldToolTip content={`${event?.name} (${event?.venue})`} />,
      eventDate: formatDateTime(event?.date),
      title: <TruncatableFieldToolTip content={userPackage?.title ?? ''} />,
      refUser: <TruncatableFieldToolTip content={refUser?.name ?? '--'} />,
      couponCode: <TruncatableFieldToolTip content={payment?.coupon?.code ?? '--'} />,
      status: (
        <div
          className={`rounded-xl ${
            status === 'success'
              ? `${isDarkMode ? 'border border-success' : 'bg-lightgreen'} text-success`
              : status === 'pending'
              ? `${isDarkMode ? 'border border-pending' : 'bg-fadeyellow'} text-pending`
              : `${isDarkMode ? 'border border-failed' : 'bg-fadedred'} text-failed`
          } p-0.5 w-fit text-sm flex gap-1 items-center`}
        >
          <span className={`w-2 h-2 rounded-full ${status === 'success' ? 'bg-green' : 'bg-pending'}`}></span>
          <span>{status === 'success' ? 'Confirmed' : status === 'pending' ? 'Pending' : status === 'cancelled' ? 'Cancelled' : 'Failed'}</span>
        </div>
      ),
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  const columnConfig = [
    { id: 0, label: 'Name', key: 'name', dataKey: 'booking.name' },
    { id: 1, label: 'Email', key: 'email', dataKey: 'booking.email' },
    { id: 2, label: 'City', key: 'city', dataKey: 'booking.city' },
    { id: 3, label: 'Country', key: 'country', dataKey: 'booking.phoneCode', formatForExport: (value) => (value ? (value.startsWith('+') ? value : `+${value}`) : '') },
    {
      id: 4,
      label: 'Contact Number',
      key: 'phoneNumber',
      dataKey: 'booking',
      formatForExport: (value) =>
        `${value.phoneCode ? (value.phoneCode?.startsWith('+') ? value.phoneCode : `+${value.phoneCode}`) : ''} ${value.phoneNumber ? value.phoneNumber : ''}`
    },
    { id: 5, label: 'Ticket ID', key: 'ticketId', dataKey: 'ticketId' },
    { id: 6, label: 'Sites', key: 'site', dataKey: 'booking.site', formatForExport: (value) => (value ? `${value.name} (${value.host})` : '') },
    { id: 7, label: 'Event', key: 'event', dataKey: 'booking.event', formatForExport: (value) => (value ? `${value.name} (${value.venue})` : '') },
    { id: 8, label: 'Event Date', key: 'eventDate', dataKey: 'booking.event.date', formatForExport: (value) => formatDateTime(value) },
    { id: 9, label: 'Package', key: 'title', dataKey: 'booking.package.title' },
    { id: 10, label: 'Coupon Code', key: 'couponCode', dataKey: 'booking.payment.coupon.code' },
    { id: 11, label: 'Referrer User', key: 'refUser', dataKey: 'booking.refUser.name' },
    {
      id: 12,
      label: 'Status',
      key: 'status',
      dataKey: 'booking.status',
      formatForExport: (value) => (value === 'success' ? 'Confirmed' : value === 'pending' ? 'Pending' : value === 'cancelled' ? 'Cancelled' : 'Failed')
    },
    { id: 13, label: 'Created At', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
    { id: 14, label: 'Updated At', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) }
  ];

  useEffect(() => {
    (async () => {
      const { status, data } = await getAllEventsApi();
      if (status) setEvent(data.events);
      else showNotification('warn', data);
    })().catch((error) => showNotification('error', error.message));
  }, []);

  return (
    <div className="p-1 overflow-x-hidden mb-12">
      <div className="w-full">
        <TableHeader
          heading={'Participants'}
          btn1={true}
          href1={'/participants/add-participant'}
          icon1={<IoMdAdd />}
          btnLabel1={'Add Participant'}
          btn2={true}
          icon2={<CiExport strokeWidth={0.5} />}
          btnLabel2={'Import Participants'}
          href2={'/participants/import-participants'}
        />
        <div className="flex flex-col min-w-full align-middle overflow-x-auto">
          <TableComponent
            selectable={true}
            siteModule={'participant'}
            actions={true}
            headers={columnConfig}
            tableData={(data) => setParticipants(data.participants)}
            rows={rows}
            apiUrl={'participant'}
            tableCountLabel={true}
            pagination={true}
            search={true}
            filter={true}
            filterCategory={[
              { id: 0, name: 'Sites' },
              { id: 1, name: 'Event' }
            ]}
            events={event}
            searchCategory={[
              { id: 1, name: 'Name' },
              { id: 2, name: 'Email' }
            ]}
            sendCertificate={true}
            approvalApi={sendCertificateApi}
          />
        </div>
      </div>
    </div>
  );
};

export default ParticipantList;
