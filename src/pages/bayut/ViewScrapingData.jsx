import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';
import { showNotification } from '../../utils/showNotification';
import { formatDateTime } from '../../utils/dateFormats';
// import { viewEnquiryNote } from './EnquiryNotes';
// import NoteComponent from '../../atoms/common/NoteComponent';
import CountryFlag from '../../atoms/common/CountryFlag';
import { getBayutPropertyById } from '../../apis/bayut-apis';

const ViewScrapingData = () => {
  const { id } = useParams();
  console.log("id", id)
  const { setLoading } = useGlobalContext();
  // const [enquiry, setEnquiry] = useState({});
  // console.log("enquiry",enquiry)
  const [propertyData, setPropertyData] = useState([]);
  console.log("propertyData", propertyData)

  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      const { status, data } = await getBayutPropertyById(id);
      console.log("data", data)
      if (status) setPropertyData(data.property);
      else showNotification('warn', data);
    })()
      .catch((error) => showNotification('error', error.message))
      .finally(() => setLoading(false));
  }, [id, setLoading]);

  const checkScrollability = () => {
    const contentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    setIsScrollable(contentHeight > windowHeight);
  };

  useEffect(() => {
    checkScrollability();
    window.addEventListener('resize', checkScrollability);
    return () => window.removeEventListener('resize', checkScrollability);
  }, []);
  const safeData = propertyData?.data?.similarPropertyTransactions || [];
  const [activeTab, setActiveTab] = useState("");
  const [activeType, setActiveType] = useState('SALE');
  const filteredSections = safeData.filter(
    (s) => s.location === activeTab && s.type === activeType
  );
  console.log(filteredSections)
  // default show table
  useEffect(() => {
    if (safeData?.length > 1) {
      setActiveTab(safeData[1].location);
      setActiveType("SALE");
    }
  }, [safeData]);

  return (
    <div className="py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
        <div>
          <span className="text-3xl font-semibold text-dark">Property Details</span>
        </div>
        <div className=" w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
          <Link to={'/bayut/scraping_data-list'} className="px-4 py-2 text-primary font-medium bg-inherit hover:bg-hover rounded-xl border border-primary whitespace-nowrap">
            Back
          </Link>
        </div>
      </div>
      {/* Property Details view */}
      <div className="w-full justify-center items-center border-b border-primary mt-5 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-3/12 w-full flex flex-col">
            <span className=" text-primary">Property Details</span>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-x-12">
            <div className="mt-5">
              <h1 className="font-semibold text-primary">Property Id</h1>
              <p className="text-placeholder font-normal"> {propertyData?.propertyId || 'Id unavailable'}</p>
            </div>
            <div className="mt-5">
              <h1 className="font-semibold text-primary">Agent Name</h1>
              <p className="text-placeholder font-normal"> {propertyData?.data?.agent || 'No agent name available'}</p>
            </div>
            <div className="mt-5">
              <h1 className="font-semibold text-primary">Address</h1>
              <p className="text-placeholder font-normal"> {propertyData?.data?.location || 'No Address available'}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full justify-center items-center border-b border-primary mt-5 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-3/12 w-full flex flex-col">
            <span className=" text-primary">Property Description</span>
          </div>
          <div className="w-full grid">
            <div className="mt-5">
              <p className="text-placeholder font-normal"> {propertyData?.data?.description || 'Description is not available'}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Property Information view */}
      <div className="w-full justify-center items-center border-b border-primary mt-5 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-3/12 w-full flex flex-col">
            <span className=" text-primary">
              <div className="flex items-center gap-2">Property Information</div>
            </span>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-x-12">
            {propertyData?.data?.propertyInformation &&
              Object.entries(propertyData.data.propertyInformation).map(([key, value]) => (
                <div className="mt-5 space-y-1" key={key}>
                  <h1 className="font-semibold text-primary">{key}</h1>
                  <p className="text-placeholder font-normal">{value || "No info available"}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* Building Information view */}
      <div className="w-full justify-center items-center border-b border-primary mt-5 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-3/12 w-full flex flex-col">
            <span className=" text-primary">
              Building Information
            </span>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-x-12">
            {propertyData?.data?.buildingInformation &&
              Object.entries(propertyData.data.buildingInformation).map(([key, value]) => (
                <div className="mt-5 space-y-1" key={key}>
                  <h1 className="font-semibold text-primary">{key}</h1>
                  <p className="text-placeholder font-normal">{value || "No info available"}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* Regulatory Information view */}
      <div className="w-full justify-center items-center border-b border-primary mt-5 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-3/12 w-full flex flex-col">
            <span className="block text-primary">
              <div className="flex items-center gap-2">Regulatory Information</div>
            </span>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-x-12">
            {propertyData?.data?.regulatoryInformation &&
              Object.entries(propertyData.data.regulatoryInformation).map(([key, value]) => (
                <div className="mt-5 space-y-1" key={key}>
                  <h1 className="font-semibold text-primary">{key}</h1>
                  <p className="text-placeholder font-normal">{value || "No info available"}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* For Amenities view */}
      <div className="w-full justify-center items-center border-b  border-primary mt-5 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full flex flex-col md:flex-row justify-evenly">
          <div className="sm:w-3/12 w-full flex flex-col">
            <span className="block text-primary">
              <div className="flex items-center gap-2">Amenities</div>
            </span>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-x-2">
            {propertyData?.data?.amenities &&
              Object.entries(propertyData.data.amenities).map(([key, value]) => (
                <div className="mt-5 px-4" key={key}>
                  <h1 className="font-semibold text-primary mb-3">{key}</h1>
                  {Array.isArray(value) ? (
                    <div className="text-placeholder font-normal space-y-1">
                      {value.map((item, idx) => (
                        <p key={idx}>{item}</p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-placeholder font-normal">{value || "No info available"}</p>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* For validated Information view */}
      <div className="w-full justify-center items-center border-b  border-primary mt-5 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <div className="w-full flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-3/12 w-full flex flex-col">
            <span className="block text-primary">
              <div className="flex items-center gap-2">Validated Information</div>
            </span>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-x-24">
            {propertyData?.data?.validatedInformation &&
              Object.entries(propertyData.data.validatedInformation).map(([key, value]) => (
                <div className="mt-5 space-y-1" key={key}>
                  <h1 className="font-semibold text-primary">{key}</h1>
                  <p className="text-placeholder font-normal">{value || "No info available"}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* Similar Property Transactions view */}
      <div className="w-full border-b border-primary mt-5 pb-7">
        <div className="w-full 
               flex flex-col md:flex-row md:items-start md:gap-10">
          <div className="w-full md:w-3/12">
            <span className="block text-primary">
              <div className="flex items-center gap-3">Similar Property Transactions</div>
            </span>
          </div>
          <div className="w-full md:w-12/12 flex flex-col gap-4 min-w-0">
            {/* <h1 className="text-primary font-bold text-gray-800 mb-4"> {propertyData?.data?.SimilarPropertyTransactions[0].propertyHeading}</h1> */}
            <div className="flex gap-3 flex-wrap">
              {Array.from(new Set(safeData.map((s) => s.location))).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full border transition ${activeTab === tab ? 'bg-green-100 text-green-700 border-green-500 font-semibold' : 'bg-gray-100 text-gray-600'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            {/* SALE / RENT Tabs */}
            <div className="flex gap-3 mb-6 border-b pb-2">
              {['SALE', 'RENT'].map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`px-4 py-1 font-medium transition ${activeType === type ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
                >
                  {type}
                </button>
              ))}
            </div>
            {filteredSections.length > 0 ? (
              filteredSections.map((section, index) => (
                <div key={index} className="border rounded-xl p-4 shadow mb-6 bg-gray-50 w-full">
                  <h2 className="text-xl font-semibold text-blue-600 mb-3">
                    {section.location} - {section.type}
                  </h2>
                  {/* Transactions Table */}
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          {Object.keys(section.transactions[0]).map((col, i) => (
                            <th key={i} className="border px-4 py-2 text-left font-medium">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.transactions.slice(0, 6).map((txn, rowIdx) => (
                          <tr key={rowIdx} className="hover:bg-gray-50 transition-colors">
                            {Object.values(txn).map((val, colIdx) => (
                              <td key={colIdx} className="border px-4 py-2">
                                {val}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No transactions available</p>
            )}
          </div>

        </div>
      </div>

      {/* <div className="w-full justify-center items-center border-b  border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end ">
        <NoteComponent note={viewEnquiryNote} />
      </div> */}
      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <Link to={'/bayut/scraping_data-list'} className="px-4 py-2 text-primary font-medium bg-inherit hover:bg-hover rounded-xl border border-primary whitespace-nowrap">
            Back
          </Link>
        </div>
      )}
    </div>
  );
};

export default ViewScrapingData;
