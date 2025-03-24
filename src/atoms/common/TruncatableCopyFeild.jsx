import { useState } from 'react';
import { FiCopy } from 'react-icons/fi';
import { showNotification } from '../../utils/showNotification';

const TruncatableCopyFeild = ({ content }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <>
      <span className="flex items-center justify-start gap-1">
        <button
          className="px-1 p-0 m-0"
          aria-label="View full content"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onClick={() => {
            navigator.clipboard.writeText(content);
            showNotification('success', 'Copied to clipboard!');
          }}
        >
          <FiCopy className="text-xl text-primary" />
        </button>
      </span>
      {showTooltip && (
        <div className={`absolute z-10 bg-main border border-primary rounded-xl shadow-lg p-2 whitespace-normal`}>
          <p className="text-primary overflow-hidden text-ellipsis">{content}</p>
        </div>
      )}
    </>
  );
};

export default TruncatableCopyFeild;
