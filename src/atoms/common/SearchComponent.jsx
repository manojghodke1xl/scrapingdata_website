import { IoSearchOutline } from 'react-icons/io5';

const SearchComponent = ({ onChange, disabled, value }) => {
  return (
    <>
      <span className="py-2">
        <IoSearchOutline className="text-secondary text-xl" />
      </span>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search"
        value={value}
        className="bg-inherit placeholder:text-secondary w-full md:w-[160px] py-2.5 placeholder:font-medium focus:outline-none focus:ring-0 focus:border-0 border-0 text-primary disabled:bg-grey disabled:cursor-not-allowed"
        onChange={onChange}
        disabled={disabled}
      />
    </>
  );
};

export default SearchComponent;
