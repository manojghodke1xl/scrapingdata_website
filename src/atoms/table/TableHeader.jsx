import { IoMdAdd } from 'react-icons/io';
import { Link } from 'react-router-dom';

const TableHeader = ({ btn1, btn2 ,href1,href2 }) => {
  return (
    <div className="w-full flex md:flex-wrap gap-y-3 sm:flex-nowrap justify-between pb-5 border-b border-primary">
      <div className="">
        <h4 className="text-3xl text-dark">Case Study</h4>
      </div>
      <div className="w-full flex justify-end sm:w-fit gap-2">
        {btn1 && (
          <Link to={href1} className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 border border-primary text-primary">
            <IoMdAdd size={22} />
            <span className="hidden md:block">Add Case Study</span>
          </Link>
        )}
        {btn2 && (
          <Link to={href2} className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-hover text-white">
            <AiOutlineApi size={22} />
            <span className="hidden md:block">Integration Guide PDF</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default TableHeader;
