import { Navigate, Outlet } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';

const DeAuthComponent = () => {
  const { auth } = useGlobalContext();
  if (!auth.id) return <Outlet />;
  else return <Navigate to="/dashboard" replace />;
};

export default DeAuthComponent;
