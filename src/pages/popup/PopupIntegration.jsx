import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { showNotification } from '../../utils/showNotification';
import { FiCopy } from 'react-icons/fi';

const PopupIntegration = () => {
  const [isScrollable, setIsScrollable] = useState(false);

  const sections = [
    {
      title: 'Request Method',
      content: 'POST'
    },
    {
      title: 'Endpoint',
      content: `${import.meta.env.VITE_API_URL}/getpopups`
    },
    {
      title: 'Request Body Parameters',
      content: `{
  "header": "Content-Type: application/json",
  "uastring": "userAgent",
  "ipaddress": "192.168.1.1",
  "sitekey": "site key"
}`
    },
    {
      title: 'Mandatory Parameters',
      content: `{
  "sitekey": "site key"
}`
    },
    {
      title: 'Request Headers',
      content: `{
  "Content-Type": "application/json"
}`
    },
    {
      title: 'Response Details',
      content: `{
  "statusCode": 200,
  "data": { popups }
}`
    }
  ];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    showNotification('success', 'Copied to clipboard!');
  };

  const checkScrollability = () => {
    const contentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    setIsScrollable(contentHeight > windowHeight);
  };

  useEffect(() => {
    checkScrollability();
    window.addEventListener('resize', checkScrollability);
    return () => window.removeEventListener('resize', checkScrollability);
  }, []);

  return (
    <div className="py-8 p-4 sm:p-8 overflow-x-hidden mb-20">
      <div className="w-full pb-8 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end">
        <div>
          <span className="text-3xl font-semibold text-dark">Get Site Popups Guide</span>
        </div>
        <div className=" w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
          <Link to={'/pop-up/pop-up-list'} className="px-4 py-2 text-primary font-medium bg-white hover:bg-gray-50 rounded-xl border border-primary whitespace-nowrap">
            Back
          </Link>
        </div>
      </div>

      <div className="w-full justify-center items-center border-b border-primary mt-7 pb-7 gap-y-4 gap-2 lg:items-start md:items-end xl:items-end">
        <div className="w-full sm:w-[85%] md:w-[80%] lg:w-[90%] xl:w-[74%] 2xl:w-[60%] flex flex-col gap-y-2 md:flex-row justify-evenly">
          <div className="sm:w-7/12 w-full flex flex-col">
            <span className=" text-primary">API Integration Details</span>
          </div>
          <div className="w-full mt-5">
            {sections.map((section, index) => (
              <div key={index} className="mb-6">
                <label className="font-medium text-primary mb-2 px-2 py-2.5 ">{section.title}</label>
                <div className="relative bg-grey p-4 rounded-lg border border-gray-300">
                  <code className="block text-sm text-primary whitespace-pre-wrap">{section.content}</code>
                  <button className="absolute top-2 right-2 p-2 text-secondary  flex items-center" onClick={() => handleCopy(section.content)}>
                    <FiCopy className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {!isScrollable && (
        <div className="w-full flex justify-end items-center gap-4 pt-8  border- border-primary">
          <Link to={'/pop-up/pop-up-list'} className="px-4 py-2 text-primary font-medium bg-white hover:bg-gray-50 rounded-xl border border-primary whitespace-nowrap">
            Back
          </Link>
        </div>
      )}
    </div>
  );
};

export default PopupIntegration;
