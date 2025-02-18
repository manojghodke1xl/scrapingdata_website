import { Link } from 'react-router-dom';

const TableHeader = ({ heading, btn1, href1, icon1, btnLabel1, btn2, href2, icon2, btnLabel2, btn3, onClick3, icon3, btnLabel3 }) => {
  return (
    <div className="w-full flex md:flex-wrap gap-y-3 sm:flex-nowrap justify-between">
      <h4 className="text-3xl text-dark">{heading}</h4>
      <div className="w-full flex justify-end sm:w-fit gap-2">
        {btn3 && (
          <button onClick={onClick3} className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 hover:bg-hover border border-primary text-primary">
            <span className="text-2xl">{icon3}</span>
            <span className="hidden md:block">{btnLabel3}</span>
          </button>
        )}
        {btn2 && (
          <Link to={href2} className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 hover:bg-hover border border-primary text-primary">
            <span className="text-2xl">{icon2}</span>
            <span className="hidden md:block">{btnLabel2}</span>
          </Link>
        )}
        {btn1 && (
          <Link to={href1} className="flex gap-2 h-fit items-center px-2.5 md:px-2 sm:px-4 rounded-xl py-2.5 bg-primary hover:bg-primary-hover text-white">
            {/* {icon1} */}
            <span className="text-2xl">{icon1}</span>
            <span className="hidden md:block">{btnLabel1}</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default TableHeader;
