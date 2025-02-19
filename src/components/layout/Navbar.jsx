import { useState, useEffect, useRef, useCallback } from 'react';
import Person from '../../assets/images/person.png';
import Logo from '../../assets/images/marsCMS-logo.png';
import DarkLogo from '../../assets/images/dark-mode-logo.png';

import MaterialSidebar from './sidebar/MaterialSidebar';
import { IoIosMenu } from 'react-icons/io';
import useGlobalContext from '../../hooks/useGlobalContext';
import { useColor } from '../../contexts/contexts/ColorContext';
import { GrSun } from 'react-icons/gr';
import { PiMoonStarsLight } from 'react-icons/pi';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useColor();
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
        <Link to={'/dashboard'} className="px-2 flex items-center font-bold">
          <img src={isDarkMode ? DarkLogo : Logo} className='w-fit' alt="logo" />
        </Link>

        <div className="flex gap-5  items-center pr-6">
          <button type="button" onClick={toggleDarkMode} className="sm:p-1 hover:bg-hover rounded-full">
            {isDarkMode ? <GrSun size={28} strokeWidth={1.667} className="text-secondary" /> : <PiMoonStarsLight size={28} strokeWidth={1.667} className="text-secondary" />}
          </button>
          <img src={Person} alt="Person" className="cursor-pointer w-8 h-8 " onClick={() => setIsDropdownOpen(!isDropdownOpen)} />

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div ref={dropdownRef} className={`absolute top-10 right-0 mt-2 w-48 bg-main border border-primary overflow-hidden rounded-lg shadow-lg z-50`}>
              <button onClick={() => dispatch({ type: 'SIGNOUT' })} className="w-full text-left px-4 py-2 hover:bg-hover">
                Logout
              </button>
            </div>
          )}
          <div className="flex lg:hidden ml-3 flex-row gap-3">
            <button onClick={handleToggleSidebar}>
              <IoIosMenu className="text-4xl text-primary" />
            </button>
            {isSidebarOpen && (
              <div className="absolute inset-0 w-screen bg-black bg-opacity-50 z-40 overflow-y-auto scrollbar-hide">
                <div className="lg:hidden block w-[312px] sm:w-[330px] md:w-[340px] h-screen" ref={sidebarRef}>
                  <div className={`lg:hidden block fixed w-[312px] sm:w-[320px] md:w-[340px] h-screen border-r border-primary my-0.5 ${isDarkMode ? 'bg-main' : 'bg-white'}`}>
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
