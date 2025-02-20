import { useEffect, useState } from 'react';
import { formatDateTime } from '../../utils/dateFormats';
import TableComponent from '../../atoms/table/Table';
import { getAllEventsApi } from '../../apis/event-apis';
import { showNotification } from '../../utils/showNotification';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import CountryFlag from '../../atoms/common/CountryFlag';
import TableHeader from '../../atoms/table/TableHeader';
import { useColor } from '../../contexts/contexts/ColorContext';
import { bulkUploadParticipantsApi, sendCertificateApi } from '../../apis/participant-apis';
import { IoMdAdd } from 'react-icons/io';
import ImportModal from '../../atoms/modal/ImportModal';
import { CiExport } from 'react-icons/ci';
import useGlobalContext from '../../hooks/useGlobalContext';

const ParticipantList = () => {
  const { isDarkMode } = useColor();
  const { setLoading } = useGlobalContext();
  const [participants, setParticipants] = useState([]);
  const [event, setEvent] = useState([]);
  const [showImportModal, setShowImportModal] = useState(false);
  const [fetchRefresh, setFetchRefresh] = useState(false);

  const rows = participants.map((participant) => {
    const { _id, booking, createdAt, updatedAt, ticketId } = participant;

    const { _id: bookingId, name, email, city, event, package: userPackage, site, status, refUser, phoneNumber, phoneCode, payment } = booking || {};

    return {
      id: _id,
      exportData: participant,
      bookingId,
      certificate: userPackage?.certificate,
      name: <TruncatableFieldToolTip title={'Name'} content={name ?? ''} />,
      email: <TruncatableFieldToolTip title={'Email'} content={email ?? ''} />,
      city: <TruncatableFieldToolTip title={'City'} content={city ?? ''} />,
      country: <CountryFlag divClassName={'justify-center'} dialingCode={phoneCode?.startsWith('+') ? phoneCode?.slice(1) : phoneCode} />,
      phoneNumber: <TruncatableFieldToolTip content={`${phoneCode ? (phoneCode?.startsWith('+') ? phoneCode : `+${phoneCode}`) : ''} ${phoneNumber ? phoneNumber : '-'}`} />,
      ticketId: <TruncatableFieldToolTip title={'Ticket ID'} content={ticketId ?? ''} />,
      site: <TruncatableFieldToolTip title={'Sites'} content={`${site?.name} (${site?.host})`} />,
      event: <TruncatableFieldToolTip title={'Event Name'} content={`${event?.name} (${event?.venue})`} />,
      eventDate: formatDateTime(event?.date),
      title: <TruncatableFieldToolTip title={'Package Name'} content={userPackage?.title ?? ''} />,
      refUser: <TruncatableFieldToolTip title={'Referrer User'} content={refUser?.name ?? '--'} />,
      couponCode: <TruncatableFieldToolTip title={'Coupon Code'} content={payment?.coupon?.code ?? '--'} />,
      status: (
        <div
          className={`rounded-xl ${
            status === 'success'
              ? `${isDarkMode ? 'border border-success' : 'bg-lightgreen'} text-success`
              : status === 'pending'
              ? `${isDarkMode ? 'border border-pending' : 'bg-fadeyellow'} text-pending`
              : `${isDarkMode ? 'border border-failed ' : 'bg-fadedred'} text-failed`
          } px-2 py-1 w-fit flex gap-2 items-center`}
        >
          <span className={`min-w-[8px] min-h-[8px] rounded-full ${status === 'success' ? 'bg-green' : 'bg-pending'}`}></span>
          <span>{status === 'success' ? 'Confirmed' : status === 'pending' ? 'Pending' : status === 'cancelled' ? 'Cancelled' : 'Failed'}</span>
        </div>
      ),
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt)
    };
  });

  const templateFields = {
    packageId: '',
    currency: '',
    userDetails: {
      name: '',
      email: '',
      phoneCode: '',
      phoneNumber: '',
      attendee: ''
    }
  };

  const importHeaderConfig = [
    { label: 'Sr. No.', key: 'srno' },
    { label: 'Package', key: 'packageId' },
    { label: 'Currency', key: 'currency' },
    { label: 'Name', key: 'userDetails.name' },
    { label: 'Email', key: 'userDetails.email' },
    { label: 'Phone Code', key: 'userDetails.phoneCode' },
    { label: 'Phone Number', key: 'userDetails.phoneNumber' },
    { label: 'Attendee', key: 'userDetails.attendee' }
  ];

  const handleImport = async (participants) => {
    setLoading(true);
    try {
      const { status, data } = await bulkUploadParticipantsApi(participants);
      if (status) {
        showNotification('success', data.message);
        setFetchRefresh((r) => !r);
      } else showNotification('warn', data.message);
    } catch (error) {
      showNotification('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      const { status, data } = await getAllEventsApi();
      if (status) setEvent(data.events);
      else showNotification('warn', data);
    })().catch((error) => showNotification('error', error.message));
  }, []);

  return (
    <>
      <div className="py-5 px-8 overflow-x-hidden mb-10">
        <div className="w-full">
          <TableHeader
            heading={'Participants'}
            btn1={true}
            href1={'/participants/add-participant'}
            icon1={<IoMdAdd />}
            btnLabel1={'Add Participant'}
            btn3={true}
            icon3={<CiExport strokeWidth={0.5} />}
            btnLabel3={'Import Participants'}
            onClick3={() => setShowImportModal(true)}
          />
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full align-middle">
                <TableComponent
                  selectable={true}
                  siteModule={'participant'}
                  actions={true}
                  headers={[
                    { label: 'Sr. No.', key: 'srno' },
                    { label: 'Name', key: 'name' },
                    { label: 'Email', key: 'email' },
                    { label: 'City', key: 'city' },
                    { label: 'Country', key: 'country' },
                    { label: 'Mobile Number', key: 'phoneNumber' },
                    { label: 'Ticket ID', key: 'ticketId' },
                    { label: 'Sites', key: 'site' },
                    { label: 'Event', key: 'event' },
                    { label: 'Event Date', key: 'eventDate' },
                    { label: 'Package', key: 'title' },
                    { label: 'Coupon Code', key: 'couponCode' },
                    { label: 'Referrer User', key: 'refUser' },
                    { label: 'Status', key: 'status' },
                    { label: 'Created Date', key: 'createdAt' },
                    { label: 'Updated Date', key: 'updatedAt' }
                  ]}
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
                  fetchRefresh={fetchRefresh}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ImportModal
        isOpen={showImportModal}
        label={'Participants'}
        setShowImportModal={setShowImportModal}
        onImport={handleImport}
        templateFields={templateFields}
        headerConfig={importHeaderConfig}
      />
    </>
  );
};

export default ParticipantList;
