import { FiCopy } from 'react-icons/fi';
import { showNotification } from '../../utils/showNotification';

const TruncatableCopyFeild = ({ content, maxLength = 10 }) => {
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
            onClick={() => {
              navigator.clipboard.writeText(content);
              showNotification('success', 'Copied to clipboard!');
            }}
          >
            <FiCopy className="text-xl" />
          </button>
        )}
      </span>
    </>
  );
};

export default TruncatableCopyFeild;
