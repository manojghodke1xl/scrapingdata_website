import { useEffect, useState } from 'react';

const PropertyTrans = ({ show, onClose, transactions }) => {
  if (!show || !transactions || transactions.length === 0) return null;

  const [activeTab, setActiveTab] = useState(transactions[1]?.location || '');
  const [activeType, setActiveType] = useState('SALE');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      // small delay so Tailwind transitions can trigger
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [show]);

  let data = [...transactions];

  // Filter sections based on activeTab + activeType
  const filteredSections = data.slice(1).filter((section) => section.location === activeTab && section.type === activeType);

  return (
    // <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={(e) => e.target === e.currentTarget && onClose()}>
    //   <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl p-6 overflow-auto max-h-[90vh]">
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={`bg-white rounded-2xl shadow-xl w-full max-w-6xl p-6 overflow-auto max-h-[90vh] transform transition-all duration-300 ${
          isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-[24px] font-bold">Similar Property Transactions</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">
            &times;
          </button>
        </div>

        {/* Property Heading */}
        <h1 className="text-xl font-bold text-gray-800 mb-4"> {`2 Bedroom Apartments in ${activeTab}`}</h1>

        {/* Location Tabs */}
        <div className="flex gap-3 mb-4 flex-wrap">
          {Array.from(new Set(data.slice(1).map((s) => s.location))).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full border transition ${
                activeTab === tab ? 'bg-green-100 text-green-700 border-green-500 font-semibold' : 'bg-gray-100 text-gray-600'
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

        {/* Render Filtered Sections */}
        {filteredSections.length > 0 ? (
          filteredSections.map((section, index) => (
            <div key={index} className="border rounded-xl p-4 shadow mb-6 bg-gray-50">
              {/* Subheading */}
              <h2 className="text-xl font-semibold text-blue-600 mb-3">
                {section.location} - {section.type}
              </h2>

              {/* Transactions Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      {Object.keys(section.transactions[0]).map((col, i) => (
                        <th key={i} className="border px-4 py-2 text-left font-medium text-[16px]">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.transactions.slice(0, 6).map((txn, rowIdx) => (
                      <tr key={rowIdx} className="hover:bg-gray-50 transition-colors">
                        {Object.values(txn).map((val, colIdx) => (
                          <td key={colIdx} className="border px-4 py-2 text-[16px] font-medium">
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
  );
};

export default PropertyTrans;
