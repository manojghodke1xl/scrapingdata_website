import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { GlobalContext } from '../../contexts/GlobalContext';

const AuthComponent = () => {
  const { pathname } = useLocation();
  const { auth } = useContext(GlobalContext);
  if (auth.id) return <Outlet />;
  else return <Navigate to="/" state={pathname} replace />;
};

export default AuthComponent;
