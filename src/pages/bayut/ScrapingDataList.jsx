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
import PropertyTrans from '../../atoms/modal/PropertyTrans';

const ScrapingDataList = () => {
  const navigate = useNavigate();
  const { setLoading } = useGlobalContext();
  const { showNotification } = useGlobalContext();
  const [propertyData, setPropertyData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalTitle, setModalTitle] = useState('');
  const [transactionsOpen, setTransactionsOpen] = useState(false);
  const [transactionsData, setTransactionsData] = useState([]);

  const handleOpenModal = (title, data) => {
    setModalTitle(title);
    setModalData(data);
    setModalOpen(true);
  };

  useEffect(() => {
    console.log('property  data>>>>>>>>>>>>>>>>>>>>>', propertyData);
  }, [propertyData]);

  // Helper function to normalize tooltip content
  const safeValue = (value) => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'object') return JSON.stringify(value); // optional: stringify objects
    return String(value);
  };

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
      SimilarPropertyTransactions,
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
      propertyId: <TruncatableFieldToolTip content={safeValue(propertyId)} />,
      url: (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <TruncatableFieldToolTip content={safeValue(url)} />
        </a>
      ),
      status: <TruncatableFieldToolTip content={safeValue(status)} />,
      createdAt: formatDateTime(createdAt),
      updatedAt: formatDateTime(updatedAt),

      // Core info
      title: <TruncatableFieldToolTip content={safeValue(title)} />,
      agent: <TruncatableFieldToolTip content={safeValue(agent)} />,
      totalBuildingArea: <TruncatableFieldToolTip content={safeValue(totalBuildingArea)} />,
      parkingAvailability: <TruncatableFieldToolTip content={safeValue(parkingAvailability)} />,
      price: <TruncatableFieldToolTip content={safeValue(`${priceCurrency || ''} ${priceText || ''}`)} />,
      location: <TruncatableFieldToolTip content={safeValue(location)} />,
      displayAddress: <TruncatableFieldToolTip content={safeValue(displayAddress)} />,
      verified: verified ? 'Yes' : 'No',

      // Property info
      type: <TruncatableFieldToolTip content={safeValue(propertyInformation?.Type)} />,
      purpose: <TruncatableFieldToolTip content={safeValue(propertyInformation?.Purpose)} />,
      furnishing: <TruncatableFieldToolTip content={safeValue(propertyInformation?.Furnishing)} />,
      completion: <TruncatableFieldToolTip content={safeValue(propertyInformation?.Completion)} />,
      reference: <TruncatableFieldToolTip content={safeValue(propertyInformation?.['Reference no.'])} />,

      // Building info
      building: <TruncatableFieldToolTip content={safeValue(buildingInformation?.['Building Name'])} />,
      yearOfCompletion: <TruncatableFieldToolTip content={safeValue(buildingInformation?.['Year of Completion'])} />,
      totalFloors: <TruncatableFieldToolTip content={safeValue(buildingInformation?.['Total Floors'])} />,

      // Regulatory
      permitNumber: <TruncatableFieldToolTip content={safeValue(regulatoryInformation?.['Permit Number'])} />,
      rera: <TruncatableFieldToolTip content={safeValue(regulatoryInformation?.['RERA'])} />,
      agency: <TruncatableFieldToolTip content={safeValue(regulatoryInformation?.['Registered Agency'])} />,

      // Info shown in modal → pass label, not object!
      PropertyInformation: (
        <button
          className="
    cursor-pointer text-white border border-blue-600 rounded-lg px-1 py-1
    font-medium bg-blue-600 hover:bg-blue-700
    transition-all duration-300 shadow-sm hover:shadow-md active:scale-95
    overflow-hidden truncate
  "
          onClick={() => handleOpenModal('Property Information', propertyInformation)}
        >
          Property Information
        </button>
      ),
      BuildingInformation: (
        <button
          className="
      cursor-pointer text-white border border-indigo-600 rounded-lg px-1 py-1
      font-medium bg-indigo-600 hover:bg-indigo-700
      transition-all duration-300 shadow-sm hover:shadow-md active:scale-95
      overflow-hidden truncate
    "
          onClick={() => handleOpenModal('Building Information', buildingInformation)}
        >
          Building Information
        </button>
      ),

      PropertyTransactions: (
        <button
          className="
      cursor-pointer text-white border border-purple-600 rounded-lg px-1 py-1
      font-medium bg-purple-600 hover:bg-purple-700
      transition-all duration-300 shadow-sm hover:shadow-md active:scale-95
      overflow-hidden truncate
    "
          onClick={() => {
            setTransactionsData(SimilarPropertyTransactions || []);
            setTransactionsOpen(true);
          }}
        >
          Similar Property Transactions
        </button>
      ),
      RegulatoryInformation: (
        <button
          className="
      cursor-pointer text-white border border-teal-600 rounded-lg px-1 py-1
      font-medium bg-teal-600 hover:bg-teal-700
      transition-all duration-300 shadow-sm hover:shadow-md active:scale-95
      overflow-hidden truncate
    "
          onClick={() => handleOpenModal('Regulatory Information', regulatoryInformation)}
        >
          Regulatory Information
        </button>
      ),
      Amenities: (
        <button
          className="
cursor-pointer text-white border border-teal-600 rounded-lg px-1 py-1
      font-medium bg-teal-600 hover:bg-teal-700
      transition-all duration-300 shadow-sm hover:shadow-md active:scale-95
      overflow-hidden truncate
"
          onClick={() => handleOpenModal('Amenities', amenities)}
        >
          Amenities
        </button>
      ),

      // Validated info
      developer: <TruncatableFieldToolTip content={safeValue(validatedInformation?.Developer)} />,
      ownership: <TruncatableFieldToolTip content={safeValue(validatedInformation?.Ownership)} />,
      usage: <TruncatableFieldToolTip content={safeValue(validatedInformation?.Usage)} />
    };
  });

  const columnConfig = [
    { id: 0, label: 'Property ID', key: 'propertyId', dataKey: 'propertyId' },
    { id: 1, label: 'Title', key: 'title', dataKey: 'title' },
    // { id: 1, label: 'Total Area', key: 'TotalArea', dataKey: 'TotalArea' },
    // { id: 1, label: 'SqFt Calculation', key: 'sqft', dataKey: 'sqft' },
    { id: 2, label: 'Total Building Area', key: 'totalBuildingArea', dataKey: 'totalBuildingArea' },
    { id: 3, label: 'Price', key: 'price', dataKey: 'price', formatForExport: (value, row) => `${row.priceCurrency} ${row.priceText}` },
    { id: 4, label: 'Address', key: 'displayAddress', dataKey: 'displayAddress' },
    { id: 5, label: 'Agent', key: 'agent', dataKey: 'agent' },

    { id: 6, label: 'URL', key: 'url', dataKey: 'url' },
    { id: 7, label: 'Property Information', key: 'PropertyInformation', dataKey: 'PropertyInformation' },
    { id: 8, label: 'Building Information', key: 'BuildingInformation', dataKey: 'BuildingInformation' },
    { id: 9, label: 'Regulatory Information', key: 'RegulatoryInformation', dataKey: 'RegulatoryInformation' },
    { id: 19, label: 'Similar Property Transactions', key: 'PropertyTransactions', dataKey: 'PropertyTransactions' },
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
    { id: 0, label: 'View', icon: 'view', handler: (row) => navigate(`/bayut/view-scraping_data/${row.id}`) },
    { id: 1, label: 'Delete', icon: 'delete', deleteAction: true }
  ];

  return (
    <div className="p-1 overflow-x-hidden mb-12">
      <TableHeader
        heading="Scraping Data List"
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
        tableData={(data) => setPropertyData(data.properties)}
        exportData={propertyData}
        rows={rows}
        apiUrl={'scrape/properties'}
        pagination={true}
        search={true}
        filter={true}
        filterCategory={[{ id: 0, name: 'Sites' }]}
        searchCategory={[
          { id: 0, name: 'Name' },
          { id: 1, name: 'Email' }
        ]}
        deleteBtn={true}
        deleteLabel="Delete Entry"
        deleteMessage="Are you sure you want to delete this Entry?"
        deleteApi={deleteEnquiryApi}
        actionItems={actionItems}
      />
      {/* <NoteComponent note={enquiryListNote} /> */}
      <InfoModal show={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle} data={modalData} />;
      <PropertyTrans show={transactionsOpen} onClose={() => setTransactionsOpen(false)} transactions={transactionsData} />
    </div>
  );
};

export default ScrapingDataList;
