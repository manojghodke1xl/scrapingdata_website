import { Link } from 'react-router-dom';
import { showNotification } from '../../utils/showNotification';
import { FiCopy } from 'react-icons/fi';

/**
 * ApiIntegrationComponent - Displays API integration details with copyable code sections
 * @param {Object[]} sections - Array of sections containing title and content
 * @param {string} href - Back button link destination
 * @param {string} title - Title of the component (defaults to 'API Integration')
 */
const ApiIntegrationComponent = ({ sections, href, title }) => {
  /**
   * Handles copying text to clipboard and shows notification
   * @param {string} text - Text to be copied
   */
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    showNotification('success', 'Copied to clipboard!');
  };

  return (
    <div className="py-4 p-4 sm:p-4 overflow-x-hidden mb-20">
      {/* Header section with title and back button */}
      <div className="w-full pb-4 border-b border-primary flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
        <div>
          <span className="text-3xl font-semibold text-dark">{title || 'API Integration'}</span>
        </div>
        {/* Back button container */}
        <div className=" w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
          <Link to={href} className="px-4 py-2 text-primary font-medium bg-inherit hover:bg-hover rounded-xl border border-primary whitespace-nowrap">
            Back
          </Link>
        </div>
      </div>

      {/* Main content section */}
      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[90%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          {/* Section title */}
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">API Integration Details</span>
          </div>
          {/* Code sections container */}
          <div className="w-full mt-5">
            {sections.map((section, index) => (
              <div key={index} className="mb-6">
                <label className="font-medium text-primary mb-2 px-2 py-2.5 ">{section.title}</label>
                {/* Code block with copy button */}
                <div className="relative bg-grey p-4 rounded-lg border border-primary gap-x-2">
                  <code className="block text-sm text-primary whitespace-pre-wrap">{section.content}</code>
                  <button className="absolute top-2 right-2 p-2 text-secondary flex items-center" onClick={() => handleCopy(section.content)} aria-label="Copy to clipboard">
                    <FiCopy className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiIntegrationComponent;
