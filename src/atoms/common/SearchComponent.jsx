import { IoSearchOutline } from 'react-icons/io5';

const SearchComponent = ({ onChange, disabled, value, divClassName, inputRef }) => {
  return (
    <div className={`${divClassName} bg-main flex items-center gap-1`} onClick={(e) => e.stopPropagation()}>
      <IoSearchOutline className="text-secondary text-xl" />
      <input
        ref={inputRef}
        type="text"
        name="search"
        id="search"
        placeholder="Search"
        value={value}
        className={`w-full bg-inherit placeholder:text-secondary py-2 placeholder:font-medium focus:outline-none focus:ring-0 focus:border-0 border-0 text-primary disabled:bg-grey disabled:cursor-not-allowed`}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
};

export default SearchComponent;
