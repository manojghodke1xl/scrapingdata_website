import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useGlobalContext from '../../hooks/useGlobalContext';

const AuthComponent = () => {
  const { pathname } = useLocation();
  const { auth } = useGlobalContext();
  if (auth.id) return <Outlet />;
  else return <Navigate to="/" state={pathname} replace />;
};

export default AuthComponent;
