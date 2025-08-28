export type Page = 
  | 'Panel Główny' 
  | 'Dokumenty' 
  | 'Asystent AI' 
  | 'Wydania Magazynowe' 
  | 'Usługi' 
  | 'Zwroty od Klientów'
  | 'Produkcja'
  // HR Module
  | 'Urlopy'
  | 'Wyjścia/Wejścia'
  | 'Zarządzanie użytkownikami';

export type Role = 'Admin' | 'Manager' | 'Pracownik';

export interface User {
  id: number;
  name: string;
  title: string;
  email: string;
  avatar: string;
  role: Role;
  password: string;
}

export interface NavItem {
  name: Page | 'Kadry';
  icon: React.ReactNode;
  subItems?: NavSubItem[];
}
export interface NavSubItem {
  name: Page;
  icon: React.ReactNode;
}

export const PERMISSIONS: Record<Role, Set<Page>> = {
  Admin: new Set([
    'Panel Główny', 'Dokumenty', 'Asystent AI', 'Wydania Magazynowe', 
    'Usługi', 'Zwroty od Klientów', 'Urlopy', 'Wyjścia/Wejścia', 'Zarządzanie użytkownikami',
    'Produkcja'
  ]),
  Manager: new Set([
    'Panel Główny', 'Dokumenty', 'Asystent AI', 'Wydania Magazynowe', 
    'Usługi', 'Zwroty od Klientów', 'Urlopy', 'Wyjścia/Wejścia',
    'Produkcja'
  ]),
  Pracownik: new Set([
    'Panel Główny', 'Dokumenty', 'Asystent AI', 'Usługi', 'Urlopy', 'Wyjścia/Wejścia',
    'Produkcja'
  ]),
};


export interface Document {
  id: number;
  name: string;
  type: 'PDF' | 'Word' | 'Spreadsheet' | 'Presentation';
  lastModified: string;
  size: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Types for Warehouse Releases
export enum WarehouseReleaseStatus {
  Temporary = 'Tymczasowe',
  Entered = 'Wprowadzone do ERP',
}

export interface WarehouseReleaseItem {
  id: number;
  name: string;
  quantity: number;
  unit: string;
}

export interface WarehouseRelease {
  id: number;
  docNumber: string;
  issueDate: string;
  client: string;
  constructionSite?: string;
  items: WarehouseReleaseItem[];
  issuedBy: string;
  notes: string;
  status: WarehouseReleaseStatus;
}

// Types for Services
export interface Service {
    id: number;
    clientName: string;
    location: string;
    serviceDate: string;
    durationHours: number;
    kilometers: number;
    description: string;
    agreedPrice?: number;
    isSettled: boolean;
    createdBy: string;
}

// Types for Customer Returns
export enum CustomerReturnStatus {
    Pending = 'Oczekuje na weryfikację',
    Accepted = 'Zwrot przyjęty',
}

export interface CustomerReturnItem {
    id: number;
    name: string;
    quantity: number;
    unit: string;
    reason: string;
}

export interface CustomerReturn {
    id: number;
    docNumber: string;
    returnDate: string;
    client: string;
    originalWzNumber?: string;
    items: CustomerReturnItem[];
    receivedBy: string;
    status: CustomerReturnStatus;
}

// Types for Production
export enum ProductionOrderStatus {
  ToDo = 'Do zrobienia',
  Done = 'Zrobione',
}

export type Palette = 'Atlas' | 'Sempre' | 'Teluria' | 'Tikkurila' | 'Inna';
export type ProductType = 'Tynk' | 'Farba';

export interface ProductionOrderItem {
  id: number;
  palette: Palette;
  productType: ProductType;
  base: string;
  color: string;
  capacity: string;
  quantity: number;
}

export interface ProductionOrder {
  id: number;
  orderNumber: string;
  creationDate: string;
  client: string;
  items: ProductionOrderItem[];
  createdBy: string;
  notes?: string;
  status: ProductionOrderStatus;
}


// Types for HR Module
export enum LeaveRequestStatus {
  Pending = 'Oczekujący',
  Approved = 'Zaakceptowany',
  Rejected = 'Odrzucony',
}

export enum LeaveType {
  Wypoczynkowy = 'Wypoczynkowy',
  NaZadanie = 'Na żądanie',
  Okolicznosciowy = 'Okolicznościowy',
  Bezpłatny = 'Bezpłatny',
  Opiekunczy = 'Opiekuńczy',
}

export interface LeaveRequest {
  id: number;
  userId: number;
  userName: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  comment?: string;
  status: LeaveRequestStatus;
}

export enum TimeOffRequestStatus {
  Pending = 'Oczekujący',
  Approved = 'Zaakceptowany',
  Rejected = 'Odrzucony',
}

export enum TimeOffType {
  WczesniejszeWyjscie = 'Wcześniejsze wyjście',
  PozniejszePrzyjscie = 'Późniejsze przyjście',
}

export interface TimeOffRequest {
  id: number;
  userId: number;
  userName: string;
  requestType: TimeOffType;
  date: string;
  time: string;
  reason: string;
  status: TimeOffRequestStatus;
}
