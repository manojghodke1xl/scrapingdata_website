import { Link } from 'react-router-dom';
import useLayout from '../../hooks/useLayout';

const TableHeader = ({ heading, isSuperAdmin = true, btn1, href1, icon1, btnLabel1, btn2, href2, icon2, btnLabel2 }) => {
  const { layoutSize } = useLayout();
  return (
    <div
      className={`w-full flex md:flex-wrap sm:flex-nowrap items-center justify-between ${
        layoutSize === 'small' ? 'px-1 py-1' : layoutSize === 'large' ? 'px-8 py-4' : 'px-4 py-2'
      }`}
    >
      <h4 className={`text-dark font-bold ${layoutSize === 'small' ? 'text-lg' : layoutSize === 'large' ? 'text-2xl' : 'text-xl'}`}>{heading}</h4>
      {/* <div className={`w-full flex justify-end sm:w-fit gap-2`}>
        {btn2 && (
          <Link to={href2} className="flex gap-1 h-fit items-center px-2 rounded-xl py-2 hover:bg-hover border border-primary text-primary">
            <span>{icon2}</span>
            <span className="hidden md:block">{btnLabel2}</span>
          </Link>
        )}
        {btn1 && isSuperAdmin && (
          <Link to={href1} className="flex gap-1 h-fit items-center px-2 rounded-xl py-2 bg-primary hover:bg-primary-hover text-white">
           
            <span>{icon1}</span>
            <span className="hidden md:block">{btnLabel1}</span>
          </Link>
        )}
      </div> */}
    </div>
  );
};

export default TableHeader;
