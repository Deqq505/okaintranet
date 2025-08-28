import React, { useState } from 'react';
import Card from './ui/Card';
import type { User } from '../types';

interface DashboardPageProps {
  currentUser: User;
}

const WelcomeBanner: React.FC<{ name: string }> = ({ name }) => {
    return (
        <div className="bg-primary rounded-xl shadow-lg p-8 mb-8 flex justify-start items-center text-white">
            <div>
                <h2 className="text-3xl font-bold">Witaj z powrotem, {name.split(' ')[0]}!</h2>
                <p className="mt-2 text-gray-200">Oto co nowego w firmie. Miłego dnia!</p>
            </div>
        </div>
    );
}

const QuickStats = () => (
    <Card className="h-full">
        <h3 className="text-lg font-bold text-dark mb-4">Szybkie Statystyki</h3>
        <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-2 rounded-lg bg-yellow-50">
                <p className="font-bold text-yellow-600 text-2xl">1</p>
                <p className="text-xs text-yellow-800">WZ do wprowadzenia</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-blue-50">
                <p className="font-bold text-blue-600 text-2xl">1</p>
                <p className="text-xs text-blue-800">Zwroty do weryfikacji</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-orange-50">
                <p className="font-bold text-orange-600 text-2xl">2</p>
                <p className="text-xs text-orange-800">Wnioski urlopowe</p>
            </div>
             <div className="text-center p-2 rounded-lg bg-indigo-50">
                <p className="font-bold text-indigo-600 text-2xl">1</p>
                <p className="text-xs text-indigo-800">Wnioski o wyjście</p>
            </div>
        </div>
    </Card>
);


const announcementsData = [
   { 
       id: 1, 
       title: 'Integracja firmowa w przyszły piątek!', 
       date: '15 Lipca, 2024',
       content: 'Zapraszamy wszystkich na coroczną integrację firmową! W tym roku spotykamy się w restauracji "Pod Dębem" o godzinie 18:00. Gwarantujemy dobrą zabawę, pyszne jedzenie i świetną atmosferę. Prosimy o potwierdzenie obecności u Jacka do końca tygodnia.' 
   },
   { 
       id: 2, 
       title: 'Nowe zasady pracy zdalnej', 
       date: '12 Lipca, 2024',
       content: 'Od 1 sierpnia wprowadzamy nowe zasady dotyczące pracy zdalnej. Każdy pracownik będzie mógł pracować zdalnie przez 2 dni w tygodniu. Szczegółowy regulamin zostanie udostępniony wkrótce w zakładce Dokumenty. Prosimy o zapoznanie się ze zmianami.' 
   },
];

interface Announcement {
    id: number;
    title: string;
    date: string;
    content: string;
}

interface AnnouncementModalProps {
   announcement: Announcement | null;
   onClose: () => void;
}

const AnnouncementModal: React.FC<AnnouncementModalProps> = ({ announcement, onClose }) => {
    if (!announcement) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col no-print animate-scaleIn" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-5 border-b">
                    <h2 className="text-xl font-bold text-dark">{announcement.title}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-3xl leading-none">&times;</button>
                </div>
                <div className="p-6 overflow-y-auto space-y-4">
                    <p className="text-sm text-medium">{announcement.date}</p>
                    <p className="text-dark whitespace-pre-wrap">{announcement.content}</p>
                </div>
                 <div className="flex justify-end items-center p-4 border-t bg-gray-50">
                     <button onClick={onClose} type="button" className="bg-primary text-white py-2 px-4 rounded-md shadow-sm text-sm font-medium hover:bg-red-700">Zamknij</button>
                 </div>
            </div>
        </div>
    );
};

const Announcements: React.FC<{ onAnnouncementClick: (announcement: Announcement) => void }> = ({ onAnnouncementClick }) => (
    <Card>
        <h3 className="text-lg font-bold text-dark mb-4">Najnowsze Ogłoszenia</h3>
        <ul className="space-y-4">
            {announcementsData.map(announcement => (
               <li key={announcement.id}>
                   <button onClick={() => onAnnouncementClick(announcement)} className="w-full text-left p-4 bg-light rounded-lg hover:bg-gray-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary">
                       <p className="font-semibold text-dark">{announcement.title}</p>
                       <p className="text-sm text-medium">{announcement.date}</p>
                   </button>
               </li>
            ))}
        </ul>
    </Card>
);

const DashboardPage: React.FC<DashboardPageProps> = ({ currentUser }) => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

  return (
    <div className="space-y-8">
      <WelcomeBanner name={currentUser.name} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 animate-fadeIn" style={{ animationDelay: '100ms', animationFillMode: 'backwards' }}>
             <QuickStats />
        </div>
        <div className="lg:col-span-2 animate-fadeIn" style={{ animationDelay: '200ms', animationFillMode: 'backwards' }}>
            <Announcements onAnnouncementClick={setSelectedAnnouncement} />
        </div>
      </div>
      <AnnouncementModal announcement={selectedAnnouncement} onClose={() => setSelectedAnnouncement(null)} />
    </div>
  );
};

export default DashboardPage;