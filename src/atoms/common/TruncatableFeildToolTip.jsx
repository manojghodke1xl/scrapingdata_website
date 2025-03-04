import { useState, useRef } from 'react';

const TruncatableFieldToolTip = ({ content = '', maxLength = 20 }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef(null);

  const isTruncated = content.length > maxLength;

  return (
    <div className="relative">
      <span className="flex items-center justify-start">
        {isTruncated ? content.substring(0, maxLength) : content === '' ? '-' : content}
        {isTruncated ? (
          <button className="btn btn-link p-0 m-0" aria-label="View full content" onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
            ...
          </button>
        ) : (
          <span>{content || '-'}</span>
        )}
      </span>

      {showTooltip && (
        <div ref={tooltipRef} className="absolute transform -translate-y-full -mt-2 z-50 bg-main border border-primary rounded-xl shadow-lg p-2 whitespace-nowrap">
          <p className="text-primary overflow-hidden text-ellipsis">{content}</p>
        </div>
      )}
    </div>
  );
};

export default TruncatableFieldToolTip;
