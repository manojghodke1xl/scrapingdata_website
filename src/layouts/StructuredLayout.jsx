import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import MaterialSidebar from '../components/layout/sidebar/MaterialSidebar';

const StructuredLayout = () => {
  return (
    <>
      <div className="w-screen h-screen overflow-hidden">
        <Navbar />
        <div className="w-screen h-full flex gap-0.5">
          <div className="sidebaar-showww w-[320px] h-screen bg-white">
            <div className="sidebaar-showww fixed w-[320px] h-screen my-0.5 border-r border-primary">
              <MaterialSidebar />
            </div>
          </div>
          <div className="calcc-widthhh overflow-y-auto min-h-screen">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default StructuredLayout;
