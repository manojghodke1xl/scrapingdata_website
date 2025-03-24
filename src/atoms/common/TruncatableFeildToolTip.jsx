import { useState, useRef } from 'react';
import { showNotification } from '../../utils/showNotification';
// import useLayout from '../../hooks/useLayout';

const TruncatableFieldToolTip = ({ content = '', maxLength = 20 }) => {
  // const { layoutSize } = useLayout();
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef(null);

  const isTruncated = content.length > maxLength;

  return (
    <div className="relative" onMouseEnter={() => isTruncated && setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
      {/* this css for span tag to modify text based on layout ${layoutSize === 'small' ? 'text-sm' : layoutSize === 'large' ? 'text-xl' : 'text-base'} */}
      <span className={`flex items-center justify-start`}>
        {isTruncated ? content.substring(0, maxLength) : content === '' ? '-' : content}
        {isTruncated && (
          <button
            className="p-0 m-0 flex items-center"
            aria-label="View full content"
            onClick={() => {
              navigator.clipboard.writeText(content);
              showNotification('success', 'Copied to clipboard!');
            }}
          >
            ...
          </button>
        )}
      </span>

      {isTruncated && showTooltip && (
        <div ref={tooltipRef} className="absolute transform -translate-y-full -mt-8 z-50 bg-main border border-primary rounded-xl shadow-lg p-1 whitespace-nowrap">
          {/* this css for p tag to modify text based on layout ==  ${layoutSize === 'small' ? 'text-sm' : layoutSize === 'large' ? 'text-xl' : 'text-base'} */}
          <p className={`text-primary overflow-hidden text-ellipsis`}>{content}</p>
        </div>
      )}
    </div>
  );
};

export default TruncatableFieldToolTip;
