import { useRef, useState } from 'react';

const Tooltip = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef(null);

  return (
    <div
      className="relative inline-block  rounded-xl shadow-lg"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div ref={tooltipRef} className="absolute transform -translate-y-full -mt-2 z-50 bg-main border border-primary rounded-xl shadow-lg p-2 whitespace-nowrap">
          <p className="text-primary overflow-hidden text-ellipsis">{content}</p>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
