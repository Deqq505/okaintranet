import React, { useState, useEffect } from 'react';
import type { WarehouseRelease, WarehouseReleaseItem } from '../types';
import { WarehouseReleaseStatus } from '../types';
import PrintableWarehouseRelease from './PrintableWarehouseRelease';

interface WarehouseReleaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<WarehouseRelease, 'id' | 'docNumber' | 'issueDate'>) => void;
  release: WarehouseRelease | null;
}

const WarehouseReleaseModal: React.FC<WarehouseReleaseModalProps> = ({ isOpen, onClose, onSave, release }) => {
  const [client, setClient] = useState('');
  const [constructionSite, setConstructionSite] = useState('');
  const [items, setItems] = useState<Omit<WarehouseReleaseItem, 'id'>[]>([{ name: '', quantity: 1, unit: 'szt.' }]);
  const [notes, setNotes] = useState('');

  const isViewMode = release !== null;

  useEffect(() => {
    if (!isOpen) {
        // Reset form on close
        setClient('');
        setConstructionSite('');
        setItems([{ name: '', quantity: 1, unit: 'szt.' }]);
        setNotes('');
    }
  }, [isOpen]);
  
  const handleAddItem = () => {
    setItems([...items, { name: '', quantity: 1, unit: 'szt.' }]);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleItemChange = (index: number, field: keyof Omit<WarehouseReleaseItem, 'id'>, value: string | number) => {
    const newItems = [...items];
    (newItems[index] as any)[field] = value;
    setItems(newItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      client,
      constructionSite: constructionSite || undefined,
      items: items.map((item, index) => ({ ...item, id: index + 1 })),
      notes,
      issuedBy: 'Jan Kowalski', // Placeholder
      status: WarehouseReleaseStatus.Temporary,
    });
  };
  
  const handlePrint = () => {
      window.print();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center" aria-modal="true" role="dialog">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col no-print animate-scaleIn">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-dark">{isViewMode ? `Podgląd WZ: ${release.docNumber}` : 'Nowe Wydanie Magazynowe'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
        </div>

        {isViewMode ? (
            <div className="p-6 overflow-y-auto">
                <PrintableWarehouseRelease release={release} />
            </div>
        ) : (
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
                <div className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="client" className="block text-sm font-medium text-gray-700">Klient</label>
                            <input type="text" id="client" value={client} onChange={e => setClient(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" />
                        </div>
                         <div>
                            <label htmlFor="constructionSite" className="block text-sm font-medium text-gray-700">Nazwa budowy (opcjonalnie)</label>
                            <input type="text" id="constructionSite" value={constructionSite} onChange={e => setConstructionSite(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Pozycje</h3>
                        <div className="space-y-3">
                        {items.map((item, index) => (
                            <div key={index} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center p-2 bg-gray-50 rounded-md">
                                <input type="text" placeholder="Nazwa" value={item.name} onChange={e => handleItemChange(index, 'name', e.target.value)} required className="sm:col-span-6 mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
                                <input type="number" placeholder="Ilość" value={item.quantity} onChange={e => handleItemChange(index, 'quantity', parseInt(e.target.value, 10) || 1)} required className="sm:col-span-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
                                <input type="text" placeholder="Jedn." value={item.unit} onChange={e => handleItemChange(index, 'unit', e.target.value)} required className="sm:col-span-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
                                <div className="sm:col-span-2 flex justify-end">
                                    {items.length > 1 && <button type="button" onClick={() => handleRemoveItem(index)} className="text-red-500 hover:text-red-700 p-2 rounded-full bg-red-100">-</button>}
                                </div>
                            </div>
                        ))}
                        </div>
                        <button type="button" onClick={handleAddItem} className="mt-2 text-sm text-primary hover:text-secondary font-medium">+ Dodaj pozycję</button>
                    </div>
                    <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Uwagi</label>
                        <textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2"></textarea>
                    </div>
                </div>
            </form>
        )}
        
        <div className="flex justify-end items-center p-4 border-t bg-gray-50">
          <button onClick={onClose} type="button" className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200 transform active:scale-95">Anuluj</button>
          {isViewMode ? (
              <button onClick={handlePrint} type="button" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-red-700 transition-all duration-200 transform hover:scale-105 active:scale-95">Drukuj</button>
          ) : (
              <button type="submit" onClick={handleSubmit} className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-red-700 transition-all duration-200 transform hover:scale-105 active:scale-95">Zapisz</button>
          )}
        </div>
      </div>
      {/* Hidden printable content for view mode */}
      {isViewMode && (
          <div className="hidden printable-area">
              <PrintableWarehouseRelease release={release} />
          </div>
      )}
    </div>
  );
};

export default WarehouseReleaseModal;