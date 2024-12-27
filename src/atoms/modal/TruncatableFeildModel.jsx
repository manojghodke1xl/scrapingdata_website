import { useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';

const TruncatableFieldModal = ({ title, content = '', maxLength = 20 }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const isTruncated = content.length > maxLength;

  return (
    <>
      <span>
        {isTruncated ? content.substring(0, maxLength) + '...' : content}{' '}
        {isTruncated && (
          <button onClick={handleOpen} className="btn btn-link p-0" style={{ textDecoration: 'none' }} aria-label="View full content">
            View
          </button>
        )}
      </span>

      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity" onClick={handleClose}></div>
          <div className="flex items-start justify-center w-full min-h-screen px-2 text-center lg:absolute lg:top-[12%]">
            <div className="bg-[#FFFFFF] rounded-2xl text-left overflow-hidden shadow-xl transform transition-all w-[95%] sm:w-[80%] md:w-[580px] px-6 2xl:px-8 py-6">
              <div className="w-full flex justify-end items-center">
                <div className=" flex justify-between w-full border-b border-primary mb-4 pb-4">
                  <h4 className="w-full sm:text-xl text-dark text-left ">{title}</h4>
                  <IoCloseSharp className="cursor-pointer text-3xl" onClick={handleClose} />
                </div>
              </div>

              <div className="w-full flex flex-col justify-center items-center ">
                <div className="border-b border-primary w-full">
                  <p className="mb-4 w-full text-primary font-normal text-base text-wrap">{content}</p>
                </div>

                <div className="flex justify-end gap-5 w-full mt-6 ">
                  <button onClick={handleClose} className=" w-1/4 rounded-xl border border-primary text-primary py-2 ">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TruncatableFieldModal;
