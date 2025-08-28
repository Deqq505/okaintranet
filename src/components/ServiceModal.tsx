import React, { useState, useEffect } from 'react';
import type { Service } from '../types';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<Service, 'id'>) => void;
  service: Service | null;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, onSave, service }) => {
  const [clientName, setClientName] = useState('');
  const [location, setLocation] = useState('');
  const [serviceDate, setServiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [durationHours, setDurationHours] = useState(0);
  const [kilometers, setKilometers] = useState(0);
  const [description, setDescription] = useState('');
  const [agreedPrice, setAgreedPrice] = useState<number | undefined>(undefined);

  const isViewMode = service !== null;

  useEffect(() => {
    if (service) {
      setClientName(service.clientName);
      setLocation(service.location);
      setServiceDate(service.serviceDate);
      setDurationHours(service.durationHours);
      setKilometers(service.kilometers);
      setDescription(service.description);
      setAgreedPrice(service.agreedPrice);
    } else {
      // Reset form for new entry
      setClientName('');
      setLocation('');
      setServiceDate(new Date().toISOString().split('T')[0]);
      setDurationHours(0);
      setKilometers(0);
      setDescription('');
      setAgreedPrice(undefined);
    }
  }, [service, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      clientName,
      location,
      serviceDate,
      durationHours,
      kilometers,
      description,
      agreedPrice,
      isSettled: false, // New services are not settled by default
      createdBy: 'Jan Kowalski', // Placeholder
    });
  };

  if (!isOpen) return null;

  const renderField = (label: string, value: React.ReactNode) => (
      <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="font-semibold text-dark">{value}</p>
      </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center" aria-modal="true" role="dialog">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col no-print animate-scaleIn">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-dark">{isViewMode ? 'Podgląd usługi' : 'Nowa Karta Usługi'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
            {isViewMode && service ? (
                 <div className="space-y-4">
                    {renderField("Klient", service.clientName)}
                    {renderField("Lokalizacja", service.location)}
                    {renderField("Data usługi", service.serviceDate)}
                    <div className="grid grid-cols-2 gap-4">
                        {renderField("Czas trwania (godz.)", `${service.durationHours} h`)}
                        {renderField("Kilometry", `${service.kilometers} km`)}
                    </div>
                    {service.agreedPrice && renderField("Ustalona cena", `${service.agreedPrice.toFixed(2)} PLN`)}
                    {renderField("Opis", <pre className="font-sans whitespace-pre-wrap bg-gray-50 p-2 rounded-md">{service.description}</pre>)}
                    {renderField("Status", <span className={`font-bold ${service.isSettled ? 'text-green-600' : 'text-yellow-600'}`}>{service.isSettled ? 'Rozliczono' : 'Oczekuje na rozliczenie'}</span>)}
                 </div>
            ) : (
                <div className="space-y-4">
                    <div>
                        <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">Nazwa Klienta</label>
                        <input type="text" id="clientName" value={clientName} onChange={e => setClientName(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" />
                    </div>
                     <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Miejsce wykonania</label>
                        <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="serviceDate" className="block text-sm font-medium text-gray-700">Data usługi</label>
                            <input type="date" id="serviceDate" value={serviceDate} onChange={e => setServiceDate(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" />
                        </div>
                        <div>
                            <label htmlFor="durationHours" className="block text-sm font-medium text-gray-700">Czas trwania (godz.)</label>
                            <input type="number" id="durationHours" value={durationHours} min="0" onChange={e => setDurationHours(Number(e.target.value))} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" />
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="kilometers" className="block text-sm font-medium text-gray-700">Liczba kilometrów</label>
                            <input type="number" id="kilometers" value={kilometers} min="0" onChange={e => setKilometers(Number(e.target.value))} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" />
                        </div>
                        <div>
                            <label htmlFor="agreedPrice" className="block text-sm font-medium text-gray-700">Ustalona cena (opcjonalnie)</label>
                            <input type="number" id="agreedPrice" value={agreedPrice || ''} min="0" step="0.01" onChange={e => setAgreedPrice(e.target.value ? Number(e.target.value) : undefined)} placeholder="np. 150.50" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Opis usługi</label>
                        <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={4} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2"></textarea>
                    </div>
                </div>
            )}
        </form>
        
        <div className="flex justify-end items-center p-4 border-t bg-gray-50">
          <button onClick={onClose} type="button" className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200 transform active:scale-95">
            {isViewMode ? 'Zamknij' : 'Anuluj'}
            </button>
          {!isViewMode && (
              <button type="submit" onClick={handleSubmit} className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-red-700 transition-all duration-200 transform hover:scale-105 active:scale-95">Zapisz usługę</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
