import { useCallback, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import MaterialSidebar from '../components/layout/sidebar/MaterialSidebar';
import useLayout from '../hooks/useLayout';

/**
 * StructuredLayout - A layout component that renders a Navbar, MaterialSidebar, and an Outlet.
 * It also handles the width of the sidebar based on the layout size.
 */
const StructuredLayout = () => {
  const { layoutSize } = useLayout();

  /**
   * Updates the width of the sidebar based on the layout size.
   */
  const updateSidebarWidth = useCallback(() => {
    // Set the width of the sidebar based on the layout size
    document.documentElement.style.setProperty('--sidebar-width', layoutSize === 'small' ? '180px' : layoutSize === 'large' ? '280px' : '220px');
  }, [layoutSize]);

  /**
   * Updates the width of the sidebar when the layout size changes.
   */
  useEffect(() => {
    updateSidebarWidth();
  }, [layoutSize, updateSidebarWidth]);

  return (
    <div className="w-screen h-screen overflow-hidden">
      {/* Renders the Navbar component */}
      <Navbar />
      <div className="w-screen h-full flex gap-0.5">
        {/* Renders the MaterialSidebar component */}
        <div className="sidebaar-showww h-screen bg-inherit">
          <div className="sidebaar-showww fixed h-screen my-0.5 border-r border-primary">
            <MaterialSidebar />
          </div>
        </div>
        {/* Renders the Outlet component */}
        <div className="calcc-widthhh overflow-y-auto min-h-screen custom-scrollbar">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StructuredLayout;
