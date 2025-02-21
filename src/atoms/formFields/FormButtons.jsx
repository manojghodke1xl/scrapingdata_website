import { Link } from 'react-router-dom';

const FormButtons = ({ loading = false, to = '', type = 'submit', onClick, btnLebal = 'Add' }) => {
  return (
    <div className=" w-full flex gap-4 justify-end items-end md:w-fit lg:w-full xl:w-fit">
      {to && (
        <Link to={to} className="px-4 py-2 text-primary font-medium bg-inherit hover:bg-hover rounded-xl border border-primary whitespace-nowrap">
          Cancel
        </Link>
      )}
      <button
        type={type}
        className="px-4 py-2 text-white font-medium bg-primary hover:bg-primary-hover rounded-xl whitespace-nowrap disabled:bg-primary-faded disabled:cursor-not-allowed"
        disabled={loading}
        onClick={onClick}
      >
        {btnLebal}
      </button>
    </div>
  );
};

export default FormButtons;
