import { FiCopy } from 'react-icons/fi';
import { IoCloseSharp } from 'react-icons/io5';
import { showNotification } from '../../utils/showNotification';
import { useColor } from '../../contexts/contexts/ColorContext';

const ApiIntegrationModal = ({ isIntegrationModalOpen, setIntegrationModalOpen, sections = [] }) => {
  if (!isIntegrationModalOpen) return null;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    showNotification('success', 'Copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setIntegrationModalOpen(false)}></div>
      <div className="flex items-start justify-center w-full min-h-screen px-2 text-center lg:absolute lg:top-[12%]">
        <div
          className={`bg-main rounded-2xl text-left overflow-hidden shadow-xl transform transition-all w-[95%] sm:w-[80%] md:w-[580px] px-6 2xl:px-8 py-6`}
        >
          <div className="w-full flex justify-end items-center">
            <div onClick={() => setIntegrationModalOpen(false)} className=" flex justify-between w-full border-b border-primary mb-4 pb-4">
              <h4 className="w-full sm:text-xl text-dark text-left ">Webhook Configuration</h4>
              <IoCloseSharp className="cursor-pointer" />
            </div>
          </div>

          <div className="w-full flex flex-col justify-center items-center ">
            <div className="border-b border-primary w-full">
              <div className="w-full mt-5">
                {sections.map((section, index) => (
                  <div key={index} className="mb-6">
                    <label className="font-medium text-primary mb-2 px-2 py-2.5 ">{section.title}</label>
                    <div className="relative bg-grey p-4 rounded-lg border border-primary">
                      <code className="block text-sm text-primary whitespace-pre-wrap">{section.content}</code>
                      <button className="absolute top-2 right-2 p-2 text-secondary  flex items-center" onClick={() => handleCopy(section.content)}>
                        <FiCopy className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-5 w-full mt-6 ">
              <button onClick={() => setIntegrationModalOpen(false)} className=" w-1/4 rounded-xl border border-primary text-primary py-2 ">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiIntegrationModal;
