import React, { useState, useEffect } from 'react';
import { navLinks } from '../constants';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { sun } from '../assets';
import Nkosuo from '../../src/assets/Nkosuo.png';

const Icon = ({ styles, name, imageUrl, isActive, disable, handleClick }) => {
  return (
    <div
      className={`flex items-center rounded-[10px] px-3 py-2 cursor-pointer transition-all duration-200
        ${isActive && isActive === name ? 'bg-[#2c2f32]' : 'hover:bg-[#2c2f32]/50'} ${styles}`}
      onClick={handleClick}
    >
      <div className="flex items-center justify-center h-[40px] w-[40px]">
        <img 
          src={imageUrl} 
          alt={name} 
          className={`h-5 w-5 transition-all duration-200
            ${isActive && isActive === name ? '' : 'opacity-70'}`} 
        />
      </div>
      
      <span className={`ml-2 text-sm font-medium whitespace-nowrap transition-all duration-200
        ${isActive && isActive === name ? 'text-white' : 'text-gray-400'}`}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </span>
    </div>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isActive, setIsActive] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Set active item based on current route
  useEffect(() => {
    const path = location.pathname.slice(1);
    if (path) {
      const activePage = navLinks.find(link => link.link === `/${path}`);
      if (activePage) {
        setIsActive(activePage.name);
      }
    } else {
      setIsActive('dashboard');
    }

    // Check if mobile view
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, [location.pathname]);

  return (
    <div className={`sticky top-5 flex h-[93vh] flex-col ${isCollapsed ? 'items-center' : 'items-start'} justify-between transition-all duration-300`}>
      {/* Only the logo image */}
      <Link to="/" className="flex justify-center items-center w-full">
        <img 
          src={Nkosuo} 
          alt="Nkosuo Logo" 
          className="w-20 h-20 object-contain"
        />
      </Link>

      {/* Navigation Menu */}
      <div
        className={`mt-6 flex flex-1 flex-col items-start
        justify-between rounded-[20px] bg-[#1c1c24] py-4 ${isCollapsed ? 'w-16' : 'w-full min-w-[200px]'} transition-all duration-300`}
      >
        <div className="flex flex-col items-start justify-between gap-3 w-full px-2">
          {navLinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                setIsActive(link.name);
                navigate(link.link);
              }}
            />
          ))}
        </div>
        
        {/* Settings/Theme Section */}
        <div className="px-2 w-full mt-4 border-t border-gray-800 pt-4">
          <div className="flex items-center rounded-[10px] px-3 py-2 cursor-pointer hover:bg-[#2c2f32]/50 transition-all duration-200">
            <div className="flex items-center justify-center h-[40px] w-[40px]">
              <img src={sun} alt="Theme" className="h-5 w-5 opacity-70" />
            </div>
            {!isCollapsed && (
              <span className="ml-2 text-sm font-medium text-gray-400">Theme</span>
            )}
          </div>
        </div>
      </div>
      
      {/* Version info */}
      <div className={`mt-4 text-xs text-gray-500 ${isCollapsed ? 'text-center' : 'px-2'}`}>
        {!isCollapsed && 'v1.0.0'}
      </div>
    </div>
  );
};

export default Sidebar;