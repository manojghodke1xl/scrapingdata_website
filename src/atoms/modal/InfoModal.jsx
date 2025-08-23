import { useEffect, useState } from 'react';

const InfoModal = ({ show, onClose, title, data }) => {
  if (!show) return null;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      // enable transition after mounting
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [show]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(); // close only when clicking backdrop, not modal content
    }
  };
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-white rounded-2xl shadow-xl w-full max-w-3xl transform transition-all duration-300 ${
          isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-[24px] font-bold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl">
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-2 gap-x-12 gap-y-4">
          {Object.entries(data || {}).map(([key, value]) => (
            <div key={key} className="grid grid-cols-2">
              <span className="text-gray-600 font-medium border-b text-[16px]  py-2">{key}</span>
              <span className="font-semibold text-gray-900 text-start border-b text-[16px]  py-2">{value || '-'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
