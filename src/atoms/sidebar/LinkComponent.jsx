import { Link } from 'react-router-dom';
import useLayout from '../../hooks/useLayout';

const LinkComponent = ({ navLinks, onClick, isActive }) => {
  const { layoutSize } = useLayout();

  return navLinks.map(({ to, title, icon }) => (
    <Link
      key={title}
      to={to[0]}
      onClick={onClick}
      className={`rounded-xl flex gap-2 items-center ${isActive(to) ? 'bg-primary-faded text-brand' : 'text-primary hover:bg-hover bg-inherit'} ${
        layoutSize === 'small' ? 'text-sm px-2 py-1' : layoutSize === 'large' ? 'text-xl px-6 py-2' : 'text-base px-4 py-2'
      }`}
    >
      <span>{icon}</span>
      <span>{title}</span>
    </Link>
  ));
};

export default LinkComponent;
