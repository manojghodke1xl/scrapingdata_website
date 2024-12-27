import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { GlobalContext } from '../../contexts/GlobalContext';

const DeAuthComponent = () => {
  const { auth } = useContext(GlobalContext);
  if (!auth.id) return <Outlet />;
  else return <Navigate to="/dashboard" replace />;
};

export default DeAuthComponent;
