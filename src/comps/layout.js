import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import { useContext } from "react";
import { GlobalContext } from "../GlobalContext";

export default function Layout() {
  const { auth } = useContext(GlobalContext);
  return (
    <div className="wrapper">
      <Header isAuth={Boolean(auth.id)} />
      <div className="page-wrapper">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
