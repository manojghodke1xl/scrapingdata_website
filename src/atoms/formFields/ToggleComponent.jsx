import { CiCircleInfo } from 'react-icons/ci';

const ToggleComponent = ({ divClassName = 'mt-5', bgColor, label, description, isEnableState, setIsEnableState }) => {
  return (
    <div className={`${divClassName} rounded-xl border border-primary py-2 px-4 w-full flex justify-between items-center ${bgColor}`}>
      <div className="flex flex-col">
        <div className="flex gap-2 items-center">
          <span className="font-medium">{label}</span>
          <CiCircleInfo />
        </div>
        {description && <p className="text-secondary font-normal pt-0.5">{description}</p>}
      </div>

      <label className="flex justify-start sm:justify-start cursor-pointer select-none items-center w-fit">
        <div className="relative">
          <input type="checkbox" checked={isEnableState} onChange={() => setIsEnableState(!isEnableState)} className="sr-only" />
          <div className={`block h-8 w-14 rounded-full ${isEnableState ? 'bg-primary' : 'bg-[#E5E7EB]'}`}></div>
          <div className={`dot absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-black transition ${isEnableState ? 'translate-x-6' : ''}`}>
            {isEnableState ? <span className="active"></span> : <span className="inactive"></span>}
          </div>
        </div>
      </label>
    </div>
  );
};

export default ToggleComponent;
