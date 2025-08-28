import React, { useState } from 'react';
import type { Page, NavItem } from '../types';
import { OKA_LOGO_BASE64 } from '../constants';

interface SidebarProps {
  navItems: NavItem[];
  activePage: Page;
  setActivePage: (page: Page) => void;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

const NavLink: React.FC<{ isActive: boolean; onClick: () => void; children: React.ReactNode; }> = ({ isActive, onClick, children }) => (
    <button
      onClick={onClick}
      className={`flex items-center w-full px-4 py-3 my-1 rounded-lg transition-colors duration-200 ${
        isActive
          ? 'bg-white/20 text-white'
          : 'text-gray-200 hover:bg-white/10 hover:text-white'
      }`}
    >
      {children}
    </button>
);

const Sidebar: React.FC<SidebarProps> = ({ navItems, activePage, setActivePage, isOpen, setOpen }) => {
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({ 'Kadry': true });

  const handleNavigation = (page: Page) => {
    setActivePage(page);
    if (window.innerWidth < 1024) {
      setOpen(false);
    }
  };

  const toggleSubMenu = (name: string) => {
    setOpenSubMenus(prev => ({ ...prev, [name]: !prev[name] }));
  };
  
  return (
    <>
      {/* Overlay for mobile */}
      <div 
        className={`fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      ></div>

      <div className={`fixed top-0 left-0 h-full w-64 bg-primary text-white flex-col z-30 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} flex`}>
        <div className="flex items-center justify-center h-20 border-b border-white/10 flex-shrink-0 px-4">
          <img src={OKA_LOGO_BASE64} alt="OKA S.C. Logo" className="h-14 w-auto object-contain" />
        </div>
        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul>
            {navItems.map((item) => (
              <li key={item.name}>
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleSubMenu(item.name)}
                      className="flex items-center justify-between w-full px-4 py-3 my-1 rounded-lg text-gray-200 hover:bg-white/10 hover:text-white"
                    >
                      <div className="flex items-center">
                        {item.icon}
                        <span className="ml-4 font-medium">{item.name}</span>
                      </div>
                      <svg className={`h-5 w-5 transition-transform ${openSubMenus[item.name] ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    </button>
                    {openSubMenus[item.name] && (
                      <ul className="pl-8">
                        {item.subItems.map(subItem => (
                          <li key={subItem.name}>
                            <NavLink isActive={activePage === subItem.name} onClick={() => handleNavigation(subItem.name)}>
                              {subItem.icon}
                              <span className="ml-4 font-normal">{subItem.name}</span>
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <NavLink isActive={activePage === item.name} onClick={() => handleNavigation(item.name as Page)}>
                    {item.icon}
                    <span className="ml-4 font-medium">{item.name}</span>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-4 py-6 border-t border-white/10 flex-shrink-0">
           <p className="text-xs text-gray-300 text-center">&copy; {new Date().getFullYear()} OKA S.C. Wszelkie prawa zastrzeżone.</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
