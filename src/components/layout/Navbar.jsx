import { useState, useEffect, useRef, useCallback } from 'react';
import Person from '../../assets/images/person.png';
import MaterialSidebar from './sidebar/MaterialSidebar';
import { IoIosMenu } from 'react-icons/io';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleToggleSidebar = useCallback(() => {
    setIsSidebarOpen(!isSidebarOpen);
  }, [isSidebarOpen]);

  const handleClickOutside = useCallback(
    (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) handleToggleSidebar();
    },
    [handleToggleSidebar]
  );

  useEffect(() => {
    if (isSidebarOpen) document.addEventListener('mousedown', handleClickOutside);
    else document.removeEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside, isSidebarOpen]);

  return (
    <>
      <div className="w-screen py-2 px-4 sm:px-6 flex justify-between border-b border-primary">
        <div className="px-2 flex items-center font-bold">
          <h1 className="text-3xl">MarsCMS</h1>
        </div>

        <div className="flex gap-1 sm:gap-2 items-center pr-6">
          <span className="hidden sm:block">
            <img src={Person} width={34} alt="Person" />
          </span>
          <div className="flex lg:hidden ml-3">
            <button onClick={handleToggleSidebar}>
              <IoIosMenu className="text-4xl text-primary" />
            </button>
            {isSidebarOpen && (
              <div className="absolute inset-0 w-screen bg-gray-200/45 z-40 overflow-y-auto scrollbar-hide">
                <div className="lg:hidden block w-[312px] sm:w-[330px] md:w-[340px] h-screen" ref={sidebarRef}>
                  <div className="lg:hidden block fixed w-[312px] sm:w-[320px] md:w-[340px] h-screen border-r border-primary my-0.5 bg-white">
                    <div className="relative">
                      <MaterialSidebar handleToggleSidebar={handleToggleSidebar} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
