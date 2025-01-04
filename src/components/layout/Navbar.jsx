import { useState, useEffect, useRef, useCallback } from 'react';
import Person from '../../assets/images/person.png';
import Logo from '../../assets/images/marsCMS-logo.png';
import MaterialSidebar from './sidebar/MaterialSidebar';
import { IoIosMenu } from 'react-icons/io';
import useGlobalContext from '../../hooks/useGlobalContext';

const Navbar = () => {
  const { dispatch } = useGlobalContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const sidebarRef = useRef(null);
  const dropdownRef = useRef(null);

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
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isSidebarOpen) document.addEventListener('mousedown', handleClickOutside);
    else document.removeEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside, isSidebarOpen]);

  return (
    <>
      <div className="w-screen py-2 px-4 sm:px-6 flex justify-between border-b border-primary">
        <div className="px-2 flex items-center font-bold">
          <img src={Logo} width={160} alt="logo" />
        </div>

        <div className="flex gap-1 sm:gap-2 items-center pr-6">
          <span className="hidden sm:block" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <img src={Person} width={34} alt="Person" className="cursor-pointer" />
          </span>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div ref={dropdownRef} className="absolute top-10 right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
              <button onClick={() => dispatch({ type: 'SIGNOUT' })} className="w-full text-left px-4 py-2 hover:bg-gray-100">
                Logout
              </button>
            </div>
          )}
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
