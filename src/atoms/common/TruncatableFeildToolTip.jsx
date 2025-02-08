import { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { useColor } from '../../contexts/contexts/ColorContext';

const TruncatableFieldToolTip = ({ content = '', maxLength = 20 }) => {
  const { isDarkMode } = useColor();
  const [showTooltip, setShowTooltip] = useState(false);

  const isTruncated = content.length > maxLength;

  return (
    <>
      <span className="flex items-center justify-start">
        {isTruncated ? content.substring(0, maxLength) + '...' : content === '' ? '-' : content}{' '}
        {isTruncated && (
          <button
            className="btn btn-link px-1 p-0 m-0"
            style={{ textDecoration: 'none' }}
            aria-label="View full content"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <FaEye className="text-xl" />
          </button>
        )}
      </span>

      {showTooltip && (
        <div className={`absolute z-10 ${isDarkMode ? 'bg-main' : 'bg-white'} border border-primary rounded-xl shadow-lg p-2 whitespace-normal`}>
          <p className="text-primary overflow-hidden text-ellipsis">{content}</p>
        </div>
      )}
    </>
  );
};

export default TruncatableFieldToolTip;
