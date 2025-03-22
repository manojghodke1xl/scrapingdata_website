import { useCallback, useState } from 'react';
import { IoReorderFourOutline } from 'react-icons/io5';

const LayoutDropdown = ({ layoutSize, updateLayoutSize }) => {
  const [isOpen, setIsOpen] = useState(false);
  // Optimized toggle handler with useCallback
  const handleToggle = useCallback((e) => setIsOpen(e.target.open), []);
  const options = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' }
  ];
  return (
    <div>
      <details
        name="tone"
        open={isOpen}
        className={`relative w-full cursor-default rounded-xl bg-inherit text-left text-primary shadow-sm border border-primary focus:outline-none focus:ring-0 sm:text-lg sm:leading-6 ${
          layoutSize === 'small' ? 'text-sm py-1 px-3' : layoutSize === 'large' ? 'py-2 px-4' : 'text-base py-2 px-4'
        }`}
        onToggle={handleToggle}
      >
        <summary className={`cursor-pointer w-full text-primary list-none focus:outline-none focus:ring-0 focus:border-0`}>
          <span className={`flex items-center w-fit`}>
            <IoReorderFourOutline className={`${layoutSize === 'small' ? 'text-base' : layoutSize === 'large' ? 'text-xl' : 'text-lg'}`} />
          </span>
        </summary>
        <ul className="absolute p-1 top-11 right-0 z-40 min-w-[150px] max-w-[150px] max-h-[350px] rounded-xl bg-main md:text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm overflow-y-auto custom-scrollbar">
          {options.map(({ value, label }) => (
            <li
              key={value}
              className={`relative flex items-center gap-1.5 cursor-pointer rounded-xl transition-colors hover:bg-hover ${layoutSize === value && 'bg-primary-faded'} ${
                layoutSize === 'small' ? 'text-sm py-1' : layoutSize === 'large py-2' ? 'text-base' : 'text-base py-2'
              }`}
              onClick={() => updateLayoutSize(value)}
            >
              <IoReorderFourOutline className={`${layoutSize === 'small' ? 'text-base' : layoutSize === 'large' ? 'text-xl' : 'text-lg'}`} />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
};

export default LayoutDropdown;
