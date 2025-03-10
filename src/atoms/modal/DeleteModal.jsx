import { IoCloseSharp } from 'react-icons/io5';

const DeleteModal = ({ isDeleteModalOpen, onConfirm, setDeleteModalOpen, label, message, children }) => {
  if (!isDeleteModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={() => setDeleteModalOpen((prev) => ({ ...prev, isDeleteModelOpen: false, deleteBoolean: false }))}
      ></div>
      <div className="flex items-start justify-center w-full min-h-screen px-2 text-center lg:absolute lg:top-[12%]">
        <div className={`bg-main rounded-2xl text-left overflow-hidden shadow-xl transform transition-all w-[95%] sm:w-[80%] md:w-[580px] px-6 2xl:px-8 py-6`}>
          <div className="w-full flex justify-end items-center">
            <div
              onClick={() => setDeleteModalOpen((prev) => ({ ...prev, isDeleteModelOpen: false, deleteBoolean: false }))}
              className=" flex justify-between w-full border-b border-primary mb-4 pb-4"
            >
              <h4 className="w-full sm:text-xl text-dark text-left ">{label}</h4>
              <IoCloseSharp className="cursor-pointer" />
            </div>
          </div>

          <div className="w-full flex flex-col justify-center items-center ">
            <div className="border-b border-primary w-full">
              <p className="mb-4 w-full text-primary font-normal text-base ">{message}</p>
              <div className="w-full flex justify-start items-center">{children}</div>
            </div>

            <div className="flex justify-end gap-5 w-full mt-6 ">
              <button
                onClick={() => setDeleteModalOpen((prev) => ({ ...prev, isDeleteModelOpen: false, deleteBoolean: false }))}
                className=" w-1/4 rounded-xl border border-primary text-primary py-2 "
              >
                Cancel
              </button>
              <button onClick={onConfirm} className="w-1/4 rounded-xl bg-red text-white py-2 ">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
