import React from 'react';
import type { NavItem, User } from './types';

export const OKA_LOGO_BASE64 = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Q1MkIxZSIvPjx0ZXh0IHg9IjUwIiB5PSI2NSIgZm9udC1zaXplPSI1MCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9ImJvbGQiPk9LQTwvdGV4dD48L3N2Zz4=';

// Icons
const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const UsersIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);
const FileTextIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
);
const SparklesIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.9 4.2-4.2 1.9 4.2 1.9L12 15l1.9-4.2 4.2-1.9-4.2-1.9L12 3z" />
      <path d="M5 12_1.9-4.2-4.2-1.9 4.2-1.9 1.9 4.2z" />
      <path d="M19 12_1.9 4.2 4.2 1.9-4.2 1.9-1.9-4.2z" />
    </svg>
);
const ArchiveBoxIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 8v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8" />
        <path d="M23 3H1v5h22V3z" />
        <path d="M10 12h4" />
    </svg>
);
const WrenchIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
);
const UndoIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7v6h6" />
        <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13" />
    </svg>
);
const BeakerIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 3h15"/><path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3"/><path d="M6 14h12"/>
    </svg>
);
const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
      <line x1="16" x2="16" y1="2" y2="6"/>
      <line x1="8" x2="8" y1="2" y2="6"/>
      <line x1="3" x2="21" y1="10" y2="10"/>
    </svg>
);
const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
);
const CogIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/>
      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
      <path d="M12 2v2"/>
      <path d="M12 22v-2"/>
      <path d="m17 20.66-1-1.73"/>
      <path d="m11 10.27 1 1.73"/>
      <path d="m7 3.34 1 1.73"/>
      <path d="m13 13.73-1-1.73"/>
      <path d="M17 3.34l-1 1.73"/>
      <path d="m11 13.73 1-1.73"/>
      <path d="m7 20.66 1-1.73"/>
      <path d="m13 10.27-1 1.73"/>
    </svg>
);

// Users
export const USERS: User[] = [
  { id: 1, name: 'Piotr Brzyski', title: 'Administrator', email: 'p.brzyski@oka.sc', avatar: 'https://ui-avatars.com/api/?name=Piotr+Brzyski&background=d52b1e&color=fff&bold=true', role: 'Admin', password: 'oka12345' },
  { id: 2, name: 'Jacek Strzadała', title: 'Kierownik Biura', email: 'j.strzadala@oka.sc', avatar: 'https://ui-avatars.com/api/?name=Jacek+Strzadala&background=d52b1e&color=fff&bold=true', role: 'Manager', password: 'oka12345' },
  { id: 3, name: 'Dawid Strzadała', title: 'Pracownik Magazynu', email: 'd.strzadala@oka.sc', avatar: 'https://ui-avatars.com/api/?name=Dawid+Strzadala&background=d52b1e&color=fff&bold=true', role: 'Pracownik', password: 'oka12345' },
  { id: 4, name: 'Adrian Strządała', title: 'Specjalista ds. Sprzedaży', email: 'a.strzadala@oka.sc', avatar: 'https://ui-avatars.com/api/?name=Adrian+Strzadala&background=d52b1e&color=fff&bold=true', role: 'Pracownik', password: 'oka12345' },
  { id: 5, name: 'Michał Danel', title: 'Pracownik', email: 'm.danel@oka.sc', avatar: 'https://ui-avatars.com/api/?name=Michal+Danel&background=d52b1e&color=fff&bold=true', role: 'Pracownik', password: 'oka12345' },
  { id: 6, name: 'Wojciech Godziek', title: 'Administrator', email: 'w.godziek@oka.sc', avatar: 'https://ui-avatars.com/api/?name=Wojciech+Godziek&background=d52b1e&color=fff&bold=true', role: 'Admin', password: 'oka12345' },
];


// Navigation
export const NAV_ITEMS: NavItem[] = [
  { name: 'Panel Główny', icon: <HomeIcon className="h-5 w-5" /> },
  { 
    name: 'Kadry', 
    icon: <UsersIcon className="h-5 w-5" />,
    subItems: [
      { name: 'Urlopy', icon: <CalendarIcon className="h-5 w-5" /> },
      { name: 'Wyjścia/Wejścia', icon: <ClockIcon className="h-5 w-5" /> },
      { name: 'Zarządzanie użytkownikami', icon: <CogIcon className="h-5 w-5" /> },
    ]
  },
  { name: 'Dokumenty', icon: <FileTextIcon className="h-5 w-5" /> },
  { name: 'Wydania Magazynowe', icon: <ArchiveBoxIcon className="h-5 w-5" /> },
  { name: 'Zwroty od Klientów', icon: <UndoIcon className="h-5 w-5" /> },
  { name: 'Usługi', icon: <WrenchIcon className="h-5 w-5" /> },
  { name: 'Produkcja', icon: <BeakerIcon className="h-5 w-5" /> },
  { name: 'Asystent AI', icon: <SparklesIcon className="h-5 w-5" /> },
];
