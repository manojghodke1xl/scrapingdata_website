import { useState, useEffect, useRef } from 'react';

const FileTypesTooltip = () => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const tooltipRef = useRef(null);

  const toggleTooltip = () => {
    setIsTooltipVisible(!isTooltipVisible);
  };

  const handleClickOutside = (event) => {
    if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
      setIsTooltipVisible(false);
    }
  };

  useEffect(() => {
    if (isTooltipVisible) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isTooltipVisible]);

  return (
    <div className="relative inline-block" ref={tooltipRef}>
      {/* Button and text with left alignment */}
      <div className="text-sm text-primary">
        <span className="block">
          Accepted File Types: PDF, PowerPoint, Images, Videos, Archives, Documents, Excel &nbsp;
          <button onClick={toggleTooltip} className="mt-1 text-brand-500 underline hover:text-brand-700 text-left">
            Click for full list
          </button>
        </span>
      </div>

      {/* Tooltip with left alignment */}
      {isTooltipVisible && (
        <div className="absolute z-10 mt-2 p-4 bg-white border border-gray-300 shadow-lg rounded-lg w-96 text-sm left-0 text-left">
          <h4 className="font-semibold text-primary">Full List of Supported File Types:</h4>
          <ul className="mt-2 text-primary">
            <li>
              <strong>PDF:</strong> .pdf
            </li>
            <li>
              <strong>PowerPoint:</strong> .ppt, .pptx, .pps, .ppsx, .pot, .potx
            </li>
            <li>
              <strong>Images:</strong> .jpg, .jpeg, .png, .gif, .svg
            </li>
            <li>
              <strong>Videos:</strong> .mp4, .mov, .mkv, .webm, .mpg, .mpeg
            </li>
            <li>
              <strong>Archives:</strong> .zip, .tar, .rar, .7z, .tar.gz
            </li>
            <li>
              <strong>Documents:</strong> .doc, .docx, .txt, .csv
            </li>
            <li>
              <strong>Excel:</strong> .xls, .xlsx, .csv, .xlsm, .ods, .tsv
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileTypesTooltip;
