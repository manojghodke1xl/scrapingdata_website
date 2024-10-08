import { useContext } from "react";
import { GlobalContext } from "../GlobalContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function Auth() {
  const { pathname } = useLocation();
  const { auth } = useContext(GlobalContext);

  if (auth.email) return <Outlet />;
  else return <Navigate to="/signin" state={pathname} replace />;
}
