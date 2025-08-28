import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardPage from './components/DashboardPage';
import UserManagementPage from './components/UserManagementPage';
import DocumentsPage from './components/DocumentsPage';
import AiAssistantPage from './components/AiAssistantPage';
import WarehouseReleasesPage from './components/WarehouseReleasesPage';
import ServicesPage from './components/ServicesPage';
import CustomerReturnsPage from './components/CustomerReturnsPage';
import UrlopyPage from './components/UrlopyPage';
import WyjsciaWejsciaPage from './components/WyjsciaWejsciaPage';
import ProductionPage from './components/ProductionPage';
import LoginPage from './components/LoginPage';
import AccessDenied from './components/AccessDenied';
import { NAV_ITEMS, USERS } from './constants';
import type { Page, User, Role } from './types';
import { PERMISSIONS } from './types';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(USERS);
  const [activePage, setActivePage] = useState<Page>('Panel Główny');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = (userId: number, password: string): boolean => {
    const user = users.find(u => u.id === userId);
    if (user && user.password === password) {
      setCurrentUser(user);
      setActivePage('Panel Główny');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const filteredNavItems = useMemo(() => {
    if (!currentUser) return [];
    const userPermissions = PERMISSIONS[currentUser.role];
    
    return NAV_ITEMS.map(item => {
      if (item.subItems) {
        const filteredSubItems = item.subItems.filter(subItem => userPermissions.has(subItem.name));
        return filteredSubItems.length > 0 ? { ...item, subItems: filteredSubItems } : null;
      }
      return userPermissions.has(item.name as Page) ? item : null;
    }).filter(Boolean);
  }, [currentUser]);


  const renderContent = () => {
    if (!currentUser) return null;
    const userPermissions = PERMISSIONS[currentUser.role];

    if (!userPermissions.has(activePage)) {
        // Find the first available page if current is not allowed (e.g., after role change)
        const allNavigablePages: Page[] = NAV_ITEMS.flatMap(item => {
          if (item.subItems) {
            return item.subItems.map(subItem => subItem.name);
          }
          return item.name === 'Kadry' ? [] : [item.name as Page];
        });

        const firstAllowedPage = allNavigablePages.find(page => userPermissions.has(page)) || 'Panel Główny';
        setActivePage(firstAllowedPage);
        return <AccessDenied />;
    }

    switch (activePage) {
      case 'Panel Główny':
        return <DashboardPage currentUser={currentUser} />;
      case 'Zarządzanie użytkownikami':
        return <UserManagementPage users={users} setUsers={setUsers} />;
      case 'Dokumenty':
        return <DocumentsPage />;
      case 'Wydania Magazynowe':
        return <WarehouseReleasesPage />;
      case 'Usługi':
        return <ServicesPage />;
      case 'Zwroty od Klientów':
        return <CustomerReturnsPage />;
      case 'Produkcja':
        return <ProductionPage currentUser={currentUser} />;
      case 'Asystent AI':
        return <AiAssistantPage currentUser={currentUser} />;
      case 'Urlopy':
        return <UrlopyPage currentUser={currentUser} />;
      case 'Wyjścia/Wejścia':
        return <WyjsciaWejsciaPage currentUser={currentUser} />;
      default:
        return <DashboardPage currentUser={currentUser} />;
    }
  };
  
  if (!currentUser) {
    return <LoginPage users={users} onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <Sidebar 
        navItems={filteredNavItems}
        activePage={activePage} 
        setActivePage={setActivePage} 
        isOpen={isSidebarOpen}
        setOpen={setSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          pageTitle={activePage}
          user={currentUser}
          onLogout={handleLogout}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main key={activePage} className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 sm:p-6 lg:p-8 animate-fadeIn">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;