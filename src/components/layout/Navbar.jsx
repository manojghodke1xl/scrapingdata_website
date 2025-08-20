// Importing required dependencies and assets
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Person from '../../assets/images/person.png';
import Logo from '../../assets/images/marsCMS-logo.png';
import DarkLogo from '../../assets/images/dark-mode-logo.png';
import { IoIosMenu } from 'react-icons/io';
import { GrSun } from 'react-icons/gr';
import { PiMoonStarsLight } from 'react-icons/pi';
import MaterialSidebar from './sidebar/MaterialSidebar';
import useGlobalContext from '../../hooks/useGlobalContext';
import useColorContext from '../../hooks/useColorContext';
import { updateAdminPreferencesApi } from '../../apis/admin-apis';
import { showNotification } from '../../utils/showNotification';
import LayoutDropdown from '../../atoms/common/LayoutDropdown';
import useLayout from '../../hooks/useLayout';

/**
 * Navbar Component - Main navigation bar of the application
 * Handles dark mode toggle, layout size, sidebar, and user dropdown
 */
const Navbar = () => {
  // Global state and context hooks
  const {
    dispatch,
    auth: { id }
  } = useGlobalContext();
  const { isDarkMode, toggleDarkMode } = useColorContext();
  const { layoutSize, updateLayoutSize } = useLayout();

  // Local state management
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Refs for handling click outside events
  const sidebarRef = useRef(null);
  const dropdownRef = useRef(null);

  // Toggle sidebar visibility
  const handleToggleSidebar = useCallback(() => {
    setIsSidebarOpen(!isSidebarOpen);
  }, [isSidebarOpen]);

  // Handle clicking outside sidebar to close it
  const handleClickOutside = useCallback(
    (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) handleToggleSidebar();
    },
    [handleToggleSidebar]
  );

  // Effect hook to handle clicking outside dropdown menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Effect hook to handle clicking outside sidebar
  useEffect(() => {
    if (isSidebarOpen) document.addEventListener('mousedown', handleClickOutside);
    else document.removeEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside, isSidebarOpen]);

  /**
   * Toggles dark mode and updates user preferences in the backend
   * Shows notification on success/failure
   */
  const handleDarkModeToggle = async () => {
    toggleDarkMode();
    try {
      const payload = { darkMode: !isDarkMode };
      const { status, data } = await updateAdminPreferencesApi(id, payload);
      if (!status) showNotification('warn', data);
    } catch (error) {
      showNotification('error', error.message);
    }
  };

  return (
    <>
      {/* Main navbar container */}
      <div className="w-screen py-1.5 px-2 flex justify-between border-b border-primary">
        {/* Logo and home link */}
        <Link to={'/dashboard'} className="px-2 flex items-center font-bold">
          <img src={isDarkMode ? DarkLogo : Logo} className={`${layoutSize === 'small' ? 'w-24' : layoutSize === 'large' ? 'w-fit' : 'w-32'}`} alt="logo" />
        </Link>

        {/* Right side controls */}
        <div className="flex gap-4 items-center pr-2">
          {/* Layout size controls */}
          <LayoutDropdown layoutSize={layoutSize} updateLayoutSize={updateLayoutSize} />

          {/* Dark mode toggle button */}
          <button
            type="button"
            onClick={handleDarkModeToggle}
            className={`sm:p-1 hover:bg-hover rounded-full ${layoutSize === 'small' ? 'p-1 text-base' : layoutSize === 'large' ? 'p-2 text-2xl' : 'p-2 text-lg'}`}
          >
            {isDarkMode ? <GrSun strokeWidth={1.667} className="text-secondary" /> : <PiMoonStarsLight strokeWidth={1.667} className={`text-secondary`} />}
          </button>

          {/* User profile picture and dropdown trigger */}
          <img
            src={Person}
            alt="Person"
            className={`cursor-pointer w-8 h-8 ${layoutSize === 'small' ? 'w-4 h-4' : layoutSize === 'large' ? 'w-6 h-6' : 'w-8 h-8'}`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />

          {/* User dropdown menu */}
          {isDropdownOpen && (
            <div ref={dropdownRef} className={`absolute top-10 right-0 mt-2 w-40 bg-main border border-primary overflow-hidden rounded-lg shadow-lg z-50`}>
              <button onClick={() => {
                dispatch({ type: 'SIGNOUT' })
                localStorage.removeItem("isSuperAdmin")
              }} className="w-full text-left px-4 py-2 hover:bg-hover">
                Logout
              </button>
            </div>
          )}

          {/* Mobile menu button and sidebar */}
          <div className="flex lg:hidden flex-row">
            <button onClick={handleToggleSidebar}>
              <IoIosMenu className={`text-primary ${layoutSize === 'small' ? 'text-lg' : layoutSize === 'large' ? 'text-3xl' : 'text-2xl'}`} />
            </button>
            {isSidebarOpen && (
              <div className="absolute inset-0 w-screen bg-black bg-opacity-50 z-40 overflow-y-auto scrollbar-hide">
                <div className="lg:hidden block w-[312px] sm:w-[330px] md:w-[340px] h-screen" ref={sidebarRef}>
                  <div className={`lg:hidden block fixed mobile-sidebar-showww h-screen border-r border-primary my-0.5 bg-main`}>
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
