import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDateTime } from '../../utils/dateFormats';
import TableComponent from '../../atoms/table/Table';
// import NoteComponent from '../../atoms/common/NoteComponent';
// import { enquiryListNote } from './EnquiryNotes';
import { AiOutlineApi } from 'react-icons/ai';
import { BsDownload } from 'react-icons/bs';
import { FaLinkedin } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import TruncatableFieldToolTip from '../../atoms/common/TruncatableFeildToolTip';
import TableHeader from '../../atoms/table/TableHeader';
import { deleteEnquiryApi } from '../../apis/leads/enquiry-apis';
import { getBayutProperty } from '../../apis/bayut-apis';
import propertydata from './propertyResponse.json'; // Assuming this is the file containing the property data
import useGlobalContext from '../../hooks/useGlobalContext';
import InfoModal from '../../atoms/modal/InfoModal';

const ScrapingDataList = () => {
  const navigate = useNavigate();
  const { setLoading } = useGlobalContext();
  const { showNotification } = useGlobalContext();
  const [propertyData, setPropertyData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalTitle, setModalTitle] = useState('');

  const handleOpenModal = (title, data) => {
    setModalTitle(title);
    setModalData(data);
    setModalOpen(true);
  };

  // const rows = propertyData.map((enquiry) => {
  //   const {
  //     _id,
  //     name,
  //     email,
  //     service,
  //     subject,
  //     createdAt,
  //     updatedAt,
  //     site,
  //     url,
  //     campaign,
  //     medium,
  //     source,
  //     content,
  //     term,
  //     campaignId,
  //     mobile,
  //     ccode,
  //     application_url,
  //     position_applying_for,
  //     linkedin,
  //     comments,
  //     enquiryType,
  //     preferredConsultation,
  //     organisation,
  //     interviewPurpose,
  //     eventName,
  //     eventType,
  //     eventDate,
  //     eventLocation,
  //     bookSessionFor,
  //     eventTopic
  //   } = enquiry;

  //   return {
  //     id: _id,
  //     exportData: enquiry,
  //     name: <TruncatableFieldToolTip content={name} />,
  //     number: <TruncatableFieldToolTip content={`${ccode ?? ''} ${mobile}`} />,
  //     email: <TruncatableFieldToolTip content={email} />,
  //     service: <TruncatableFieldToolTip content={service} />,
  //     subject: <TruncatableFieldToolTip content={subject} />,
  //     site: <TruncatableFieldToolTip content={`${site?.name} (${site?.host})`} />,
  //     url: <TruncatableFieldToolTip content={url} />,
  //     campaign: <TruncatableFieldToolTip content={campaign} />,
  //     medium: <TruncatableFieldToolTip content={medium} />,
  //     source: <TruncatableFieldToolTip content={source} />,
  //     content: <TruncatableFieldToolTip content={content} />,
  //     term: <TruncatableFieldToolTip content={term} />,
  //     campaignId: <TruncatableFieldToolTip content={campaignId} />,
  //     createdAt: formatDateTime(createdAt),
  //     updatedAt: formatDateTime(updatedAt),
  //     enquiryType: <TruncatableFieldToolTip content={enquiryType} />,
  //     organisation: <TruncatableFieldToolTip content={organisation} />,
  //     interviewPurpose: <TruncatableFieldToolTip content={interviewPurpose} />,
  //     preferredConsultation: <TruncatableFieldToolTip content={preferredConsultation} />,
  //     eventName: <TruncatableFieldToolTip content={eventName} />,
  //     eventType: <TruncatableFieldToolTip content={eventType} />,
  //     eventDate: <TruncatableFieldToolTip content={eventDate} />,
  //     eventLocation: <TruncatableFieldToolTip content={eventLocation} />,
  //     bookSessionFor: <TruncatableFieldToolTip content={bookSessionFor} />
  //   };
  // });

  const rows = propertyData.map((property) => {
    const { _id, propertyId, url, status, createdAt, updatedAt, scrapedData } = property;

    const {
      title,
      agent,
      price,
      priceCurrency,
      priceText,
      location,
      displayAddress,
      propertyInformation,
      buildingInformation,
      regulatoryInformation,
      amenities,
      validatedInformation,
      verified
    } = scrapedData || {};
    const totalBuildingArea = buildingInformation?.['Total Building Area'];
    const parkingAvailability = validatedInformation?.['Parking Availability'];

    return {
      id: _id,
      exportData: property,

      // Basic
      propertyId: <TruncatableFieldToolTip content={propertyId} />,
      url: (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <TruncatableFieldToolTip content={url} />
        </a>
      ),
      status: <TruncatableFieldToolTip content={status} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt),

      // Core info
      title: <TruncatableFieldToolTip content={title} />,
      agent: <TruncatableFieldToolTip content={agent} />,
      totalBuildingArea: <TruncatableFieldToolTip content={totalBuildingArea} />,
      parkingAvailability: <TruncatableFieldToolTip content={parkingAvailability} />,
      price: <TruncatableFieldToolTip content={`${priceCurrency} ${priceText}`} />,
      location: <TruncatableFieldToolTip content={location} />,
      displayAddress: <TruncatableFieldToolTip content={displayAddress} />,
      verified: verified ? 'Yes' : 'No',

      // Property info
      type: <TruncatableFieldToolTip content={propertyInformation?.Type} />,
      purpose: <TruncatableFieldToolTip content={propertyInformation?.Purpose} />,
      furnishing: <TruncatableFieldToolTip content={propertyInformation?.Furnishing} />,
      completion: <TruncatableFieldToolTip content={propertyInformation?.Completion} />,
      reference: <TruncatableFieldToolTip content={propertyInformation?.['Reference no.']} />,

      // Building info
      building: <TruncatableFieldToolTip content={buildingInformation?.['Building Name']} />,
      yearOfCompletion: <TruncatableFieldToolTip content={buildingInformation?.['Year of Completion']} />,
      totalFloors: <TruncatableFieldToolTip content={buildingInformation?.['Total Floors']} />,

      // Regulatory
      permitNumber: <TruncatableFieldToolTip content={regulatoryInformation?.['Permit Number']} />,
      rera: <TruncatableFieldToolTip content={regulatoryInformation?.['RERA']} />,
      agency: <TruncatableFieldToolTip content={regulatoryInformation?.['Registered Agency']} />,
      // display information using model
      PropertyInformation: (
        <TruncatableFieldToolTip
          content={
            <span className="cursor-pointer text-blue-600 underline" onClick={() => handleOpenModal('Property Information', propertyInformation)}>
              Property Information
            </span>
          }
        />
      ),

      BuildingInformation: (
        <TruncatableFieldToolTip
          content={
            <span className="cursor-pointer text-blue-600 underline" onClick={() => handleOpenModal('Building Information', buildingInformation)}>
              Building Information
            </span>
          }
        />
      ),
      RegulatoryInformation: (
        <TruncatableFieldToolTip
          content={
            <span className="cursor-pointer text-blue-600 underline" onClick={() => handleOpenModal('Regulatory Information', regulatoryInformation)}>
              Regulatory Information
            </span>
          }
        />
      ),

      Amenities: (
        <TruncatableFieldToolTip
          content={
            <span className="cursor-pointer text-blue-600 underline" onClick={() => handleOpenModal('Amenities', amenities)}>
              Amenities
            </span>
          }
        />
      ),

      // At the bottom of your component

      //    { id: 7, label: 'Property Information', key: 'PropertyInformation', dataKey: 'PropertyInformation' },
      // { id: 8, label: 'Building Information', key: 'BuildingInformation', dataKey: 'BuildingInformation' },
      // { id: 9, label: 'Regulatory Information', key: 'RegulatoryInformation', dataKey: 'RegulatoryInformation' },
      // { id: 10, label: 'Amenities', key: 'Amenities', dataKey: 'Amenities' },

      // Validated info
      developer: <TruncatableFieldToolTip content={validatedInformation?.Developer} />,
      ownership: <TruncatableFieldToolTip content={validatedInformation?.Ownership} />,
      usage: <TruncatableFieldToolTip content={validatedInformation?.Usage} />
    };
  });

  // const columnConfig = [
  //   { id: 0, label: 'Property Name', key: 'name', dataKey: 'name' },
  //   { id: 1, label: 'Email', key: 'email', dataKey: 'email' },
  //   { id: 2, label: 'Service', key: 'service', dataKey: 'service' },
  //   { id: 3, label: 'Contact Number', key: 'number', dataKey: 'number' },
  //   { id: 4, label: 'Subject', key: 'subject', dataKey: 'subject' },
  //   { id: 5, label: 'Sites', key: 'site', dataKey: 'site', formatForExport: (value) => (value ? `${value?.name} (${value?.host})` : '') },
  //   { id: 6, label: 'URL', key: 'url', dataKey: 'url' },
  //   { id: 7, label: 'Campaign Name', key: 'campaign', dataKey: 'campaign' },
  //   { id: 8, label: 'Medium', key: 'medium', dataKey: 'medium' },
  //   { id: 9, label: 'Source', key: 'source', dataKey: 'source' },
  //   { id: 10, label: 'Content', key: 'content', dataKey: 'content' },
  //   { id: 11, label: 'Term', key: 'term', dataKey: 'term' },
  //   { id: 12, label: 'Campaign ID', key: 'campaignId', dataKey: 'campaignId' },
  //   { id: 13, label: 'Created At', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
  //   { id: 14, label: 'Updated At', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) },

  //   { id: 15, label: 'Enquiry Type', key: 'enquiryType', dataKey: 'enquiryType' },

  //   { id: 16, label: 'Organisation', key: 'organisation', dataKey: 'organisation' },
  //   { id: 17, label: 'Interview Purpose', key: 'interviewPurpose', dataKey: 'interviewPurpose' },
  //   { id: 18, label: 'Event Name', key: 'eventName', dataKey: 'eventName' },
  //   { id: 19, label: 'Event Type', key: 'eventType', dataKey: 'eventType' },
  //   { id: 20, label: 'Event Date', key: 'eventDate', dataKey: 'eventDate' },
  //   { id: 21, label: 'Event Location', key: 'eventLocation', dataKey: 'eventLocation' },
  //   { id: 22, label: 'Book Session For', key: 'bookSessionFor', dataKey: 'bookSessionFor' },
  //   { id: 23, label: 'Event Topic', key: 'eventTopic', dataKey: 'eventTopic' },

  //   { id: 24, label: 'Preferred Consultation', key: 'preferredConsultation', dataKey: 'preferredConsultation' },
  //   { id: 25, label: 'Resume URL', key: 'application_resume', dataKey: 'application_resume' },
  //   { id: 26, label: 'Cover Letter URL', key: 'application_cover_letter', dataKey: 'application_cover_letter' },
  //   { id: 27, label: 'Portfolio URL', key: 'application_portfolio', dataKey: 'application_portfolio' },
  //   { id: 28, label: 'Position Applying For', key: 'position_applying_for', dataKey: 'position_applying_for' },
  //   { id: 29, label: 'LinkedIn', key: 'linkedin', dataKey: 'linkedin' },
  //   { id: 30, label: 'Comments', key: 'comments', dataKey: 'comments' }
  // ];

  const columnConfig = [
    { id: 0, label: 'Property ID', key: 'propertyId', dataKey: 'propertyId' },
    { id: 1, label: 'Title', key: 'title', dataKey: 'title' },
    { id: 2, label: 'Total Area', key: 'totalBuildingArea', dataKey: 'totalBuildingArea' },
    { id: 3, label: 'Price', key: 'price', dataKey: 'price', formatForExport: (value, row) => `${row.priceCurrency} ${row.priceText}` },
    { id: 4, label: 'Address', key: 'displayAddress', dataKey: 'displayAddress' },
    { id: 5, label: 'Agent', key: 'agent', dataKey: 'agent' },

    { id: 6, label: 'URL', key: 'url', dataKey: 'url' },
    { id: 7, label: 'Property Information', key: 'PropertyInformation', dataKey: 'PropertyInformation' },
    { id: 8, label: 'Building Information', key: 'BuildingInformation', dataKey: 'BuildingInformation' },
    { id: 9, label: 'Regulatory Information', key: 'RegulatoryInformation', dataKey: 'RegulatoryInformation' },
    { id: 10, label: 'Amenities', key: 'Amenities', dataKey: 'Amenities' },

    // Amenities
    // { id: 11, label: 'Amenities', key: 'amenities', dataKey: 'amenities' },

    // Validated Information
    { id: 12, label: 'Developer', key: 'developer', dataKey: 'developer' },
    { id: 13, label: 'Ownership', key: 'ownership', dataKey: 'ownership' },
    { id: 14, label: 'Usage', key: 'usage', dataKey: 'usage' },
    { id: 15, label: 'Parking Availability', key: 'parkingAvailability', dataKey: 'parkingAvailability' },

    // Metadata
    { id: 16, label: 'Created At', key: 'createdAt', dataKey: 'createdAt', formatForExport: (value) => formatDateTime(value) },
    { id: 17, label: 'Updated At', key: 'updatedAt', dataKey: 'updatedAt', formatForExport: (value) => formatDateTime(value) },
    { id: 18, label: 'Verified', key: 'verified', dataKey: 'verified' }
  ];

  const actionItems = [
    { id: 0, label: 'View', icon: 'view', handler: (row) => navigate(`/enquiry/view-enquiry/${row.id}`) },
    { id: 1, label: 'Delete', icon: 'delete', deleteAction: true }
  ];

  useEffect(() => {
    setLoading(true);
    (async () => {
      const { status, data } = await getBayutProperty();
      if (status) {
        setPropertyData(data.enquiry);
      } else showNotification('warn', data);
    })()
      .catch((error) => showNotification('error', error.message))
      .finally(() => setLoading(false));
  }, [setLoading]);

  return (
    <div className="p-1 overflow-x-hidden mb-12">
      <TableHeader
        heading="Scraping Data"
        btn2={true}
        btn1={true}
        href1={'/bayut/scraping_data-integration'}
        href2={'/bayut/add-scraping_data'}
        icon1={<AiOutlineApi />}
        icon2={<IoMdAdd />}
        btnLabel1={'API Integration'}
        btnLabel2={'Add Scraping Data'}
      />
      <TableComponent
        selectable={true}
        siteModule={'enquiry'}
        headers={columnConfig}
        tableData={(data) => setPropertyData(data.enquiry)}
        exportData={propertyData}
        rows={rows}
        apiUrl={'propertydata'}
        pagination={true}
        search={true}
        filter={true}
        filterCategory={[{ id: 0, name: 'Sites' }]}
        searchCategory={[
          { id: 0, name: 'Name' },
          { id: 1, name: 'Email' }
        ]}
        deleteBtn={true}
        deleteLabel="Delete Enquiry"
        deleteMessage="Are you sure you want to delete this enquiry?"
        deleteApi={deleteEnquiryApi}
        actionItems={actionItems}
      />
      {/* <NoteComponent note={enquiryListNote} /> */}
      <InfoModal show={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle} data={modalData} />;
    </div>
  );
};

export default ScrapingDataList;
