import React, { useState, useRef, useEffect } from 'react';
import type { User } from '../types';

interface HeaderProps {
  pageTitle: string;
  user: User;
  onLogout: () => void;
  onMenuClick: () => void;
}

const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="4" y1="6" x2="20" y2="6" />
        <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
);

const Header: React.FC<HeaderProps> = ({ pageTitle, user, onLogout, onMenuClick }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const notificationRef = useRef<HTMLDivElement>(null);

  const mockNotifications = [
    { id: 1, icon: '📅', text: 'Nowy wniosek urlopowy od Adrian Strządała.', time: '5 minut temu' },
    { id: 2, icon: '✅', text: 'Twoje zamówienie PROD/2024/07/002 zostało zrealizowane.', time: '1 godzinę temu' },
    { id: 3, icon: '📢', text: 'Nowe ogłoszenie: Integracja firmowa!', time: 'wczoraj' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setNotificationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <header className="flex items-center justify-between h-20 px-4 sm:px-8 bg-white border-b border-gray-200 flex-shrink-0">
      <div className="flex items-center">
        <button onClick={onMenuClick} className="lg:hidden p-2 -ml-2 mr-2 text-gray-600 hover:text-primary focus:outline-none">
          <MenuIcon className="h-6 w-6" />
        </button>
        <h2 className="text-xl sm:text-2xl font-bold text-dark">{pageTitle}</h2>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative" ref={notificationRef}>
          <button onClick={() => { setNotificationOpen(!isNotificationOpen); setHasUnread(false); }} className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-gray-500"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            {hasUnread && <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-secondary ring-2 ring-white"></span>}
          </button>
          {isNotificationOpen && (
             <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 animate-scaleIn origin-top-right">
                <div className="p-3 border-b">
                    <h4 className="text-sm font-semibold text-dark">Powiadomienia</h4>
                </div>
                <ul className="py-1 max-h-80 overflow-y-auto">
                    {mockNotifications.length > 0 ? mockNotifications.map(notif => (
                        <li key={notif.id} className="flex items-start px-4 py-3 hover:bg-gray-100 cursor-pointer">
                            <div className="text-xl mr-3">{notif.icon}</div>
                            <div>
                                <p className="text-sm text-dark">{notif.text}</p>
                                <p className="text-xs text-medium mt-1">{notif.time}</p>
                            </div>
                        </li>
                    )) : (
                        <li className="px-4 py-3 text-sm text-center text-gray-500">Brak nowych powiadomień.</li>
                    )}
                </ul>
            </div>
          )}
        </div>
        <div className="relative">
          <button onClick={() => setDropdownOpen(!isDropdownOpen)} className="flex items-center focus:outline-none">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="ml-3 hidden sm:block text-left">
              <p className="text-sm font-semibold text-dark">{user.name}</p>
              <p className="text-xs text-medium">{user.title}</p>
            </div>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
              <button
                onClick={onLogout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Wyloguj
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
