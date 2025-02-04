import { IoCloseSharp } from 'react-icons/io5';

const CommonModal = ({ isModalVisible, onConfirm, setModalVisibility, label, message }) => {
  if (!isModalVisible) return null;

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="fixed inset-0 bg-secondary bg-opacity-75 transition-opacity" onClick={setModalVisibility}></div>
      <div className="flex items-start justify-center w-full min-h-screen px-2 text-center lg:absolute lg:top-[12%]">
        <div className="bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all w-[95%] sm:w-[80%] md:w-[580px] px-6 2xl:px-8 py-6 border border-primary">
          <div className="w-full flex justify-end items-center">
            <div onClick={setModalVisibility} className=" flex justify-between w-full border-b border-primary mb-4 pb-4">
              <h4 className="w-full sm:text-xl text-dark text-left ">{label}</h4>
              <IoCloseSharp className="cursor-pointer" />
            </div>
          </div>

          <div className="w-full flex flex-col justify-center items-center ">
            <div className="border-b border-primary w-full">
              <p className="mb-4 w-full text-primary font-normal text-base ">{message}</p>
            </div>

            <div className="flex justify-end gap-5 w-full mt-6 ">
              <button onClick={setModalVisibility} className=" w-1/4 rounded-xl border border-primary text-primary py-2 ">
                Cancel
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  setModalVisibility();
                }}
                className="w-1/4 rounded-xl bg-primary text-white py-2 "
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonModal;
