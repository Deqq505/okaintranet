import React, { useState } from 'react';
import Card from './ui/Card';
import ServiceModal from './ServiceModal';
import type { Service } from '../types';

const initialServices: Service[] = [
    {
        id: 1,
        clientName: 'Firma Budowlana "Murator"',
        location: 'Warszawa, ul. Prosta 51',
        serviceDate: '2024-07-20',
        durationHours: 8,
        kilometers: 120,
        description: 'Dostawa i montaż 10 okien na budowie biurowca.',
        agreedPrice: 25000,
        isSettled: false,
        createdBy: 'Jan Kowalski',
    },
    {
        id: 2,
        clientName: 'Janina Nowak',
        location: 'Kraków, os. Tęczowe 8/12',
        serviceDate: '2024-07-18',
        durationHours: 4,
        kilometers: 30,
        description: 'Wymiana drzwi wejściowych w mieszkaniu.',
        agreedPrice: 3500,
        isSettled: true,
        createdBy: 'Piotr Brzyski',
    },
     {
        id: 3,
        clientName: 'Develop Sp. z o.o.',
        location: 'Gdańsk, ul. Morska 113',
        serviceDate: '2024-07-15',
        durationHours: 16,
        kilometers: 450,
        description: 'Konsultacje techniczne i pomiary na nowym osiedlu.',
        isSettled: false,
        createdBy: 'Jan Kowalski',
    }
];

const StatusBadge: React.FC<{ isSettled: boolean }> = ({ isSettled }) => {
    const statusStyles = isSettled 
        ? 'bg-green-100 text-green-800'
        : 'bg-yellow-100 text-yellow-800';
    return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles}`}>
            {isSettled ? 'Rozliczone' : 'Do rozliczenia'}
        </span>
    );
}

const ServicesPage: React.FC = () => {
    const [services, setServices] = useState<Service[]>(initialServices);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    const handleAddNew = () => {
        setSelectedService(null);
        setModalOpen(true);
    };

    const handleView = (service: Service) => {
        setSelectedService(service);
        setModalOpen(true);
    };
    
    const handleSave = (serviceData: Omit<Service, 'id'>) => {
        const newService: Service = {
            id: Date.now(),
            ...serviceData
        };
        setServices(prev => [newService, ...prev]);
        setModalOpen(false);
    };

    const handleToggleSettled = (id: number) => {
        setServices(prev =>
            prev.map(s =>
                s.id === id ? { ...s, isSettled: !s.isSettled } : s
            )
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                     <p className="text-medium mt-1">Zarządzaj i rozliczaj wykonane usługi dla klientów.</p>
                </div>
                <button onClick={handleAddNew} className="bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    Dodaj nową usługę
                </button>
            </div>
            
            <Card className="overflow-hidden !p-0">
                 {/* Desktop Table View */}
                 <div className="overflow-x-auto hidden lg:block">
                     <table className="w-full text-sm text-left text-gray-500">
                         <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                             <tr>
                                 <th scope="col" className="px-6 py-3">Klient</th>
                                 <th scope="col" className="px-6 py-3">Data</th>
                                 <th scope="col" className="px-6 py-3">Opis</th>
                                 <th scope="col" className="px-6 py-3">Status</th>
                                 <th scope="col" className="px-6 py-3 text-right">Akcje</th>
                             </tr>
                         </thead>
                         <tbody>
                             {services.map((service) => (
                                 <tr key={service.id} className="bg-white border-b hover:bg-gray-50">
                                     <td className="px-6 py-4 font-bold text-dark">{service.clientName}</td>
                                     <td className="px-6 py-4">{service.serviceDate}</td>
                                     <td className="px-6 py-4 truncate max-w-xs">{service.description}</td>
                                     <td className="px-6 py-4"><StatusBadge isSettled={service.isSettled} /></td>
                                     <td className="px-6 py-4 text-right space-x-2">
                                         <button onClick={() => handleView(service)} className="text-primary hover:text-secondary font-medium">Podgląd</button>
                                         <button onClick={() => handleToggleSettled(service.id)} className="text-green-600 hover:text-green-800 font-medium">
                                            {service.isSettled ? 'Oznacz jako nieuregulowane' : 'Oznacz jako rozliczone'}
                                         </button>
                                     </td>
                                 </tr>
                             ))}
                         </tbody>
                     </table>
                 </div>

                 {/* Mobile Card View */}
                 <div className="lg:hidden p-4 space-y-4">
                     {services.map((service, index) => (
                         <Card key={service.id} className="w-full animate-fadeIn" style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}>
                             <div className="flex justify-between items-start">
                                 <div>
                                     <p className="font-bold text-dark">{service.clientName}</p>
                                     <p className="text-xs text-gray-400">{service.serviceDate}</p>
                                 </div>
                                 <StatusBadge isSettled={service.isSettled} />
                             </div>
                             <p className="text-sm text-medium my-2">{service.description}</p>
                             <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row gap-2">
                                 <button onClick={() => handleView(service)} className="w-full text-sm text-primary hover:text-secondary font-medium p-2 rounded-md bg-primary/10">Podgląd</button>
                                 <button onClick={() => handleToggleSettled(service.id)} className="w-full text-sm font-medium p-2 rounded-md"
                                 style={{
                                    color: service.isSettled ? '#ca8a04' : '#16a34a',
                                    backgroundColor: service.isSettled ? 'rgba(202, 138, 4, 0.1)' : 'rgba(22, 163, 74, 0.1)'
                                 }}
                                 >
                                    {service.isSettled ? 'Cofnij rozliczenie' : 'Rozlicz'}
                                 </button>
                             </div>
                         </Card>
                     ))}
                 </div>
            </Card>

            {isModalOpen && (
                <ServiceModal
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    onSave={handleSave}
                    service={selectedService}
                />
            )}
        </div>
    );
};

export default ServicesPage;