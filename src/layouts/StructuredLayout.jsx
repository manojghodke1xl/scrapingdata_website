import { useCallback, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import MaterialSidebar from '../components/layout/sidebar/MaterialSidebar';
import useLayout from '../hooks/useLayout';

const StructuredLayout = () => {
  const { layoutSize } = useLayout();

  const updateSidebarWidth = useCallback(() => {
    document.documentElement.style.setProperty('--sidebar-width', layoutSize === 'small' ? '180px' : layoutSize === 'large' ? '280px' : '220px');
  }, [layoutSize]);

  useEffect(() => {
    updateSidebarWidth();
  }, [layoutSize, updateSidebarWidth]);

  return (
    <>
      <div className="w-screen h-screen overflow-hidden">
        <Navbar />
        <div className="w-screen h-full flex gap-0.5">
          <div className="sidebaar-showww h-screen bg-inherit">
            <div className="sidebaar-showww fixed h-screen my-0.5 border-r border-primary">
              <MaterialSidebar />
            </div>
          </div>
          <div className="calcc-widthhh overflow-y-auto min-h-screen custom-scrollbar">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default StructuredLayout;
