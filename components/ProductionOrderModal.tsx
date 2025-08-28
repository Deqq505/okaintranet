import React, { useState, useEffect } from 'react';
import type { ProductionOrder, ProductionOrderItem, Palette, ProductType } from '../types';
import { ProductionOrderStatus } from '../types';

interface ProductionOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<ProductionOrder, 'id' | 'orderNumber' | 'creationDate' | 'createdBy'>) => void;
  order: ProductionOrder | null;
}

const PALETTES: Palette[] = ['Atlas', 'Sempre', 'Teluria', 'Tikkurila', 'Inna'];
const PRODUCT_TYPES: ProductType[] = ['Tynk', 'Farba'];

const ProductionOrderModal: React.FC<ProductionOrderModalProps> = ({ isOpen, onClose, onSave, order }) => {
  const [client, setClient] = useState('');
  const [items, setItems] = useState<Omit<ProductionOrderItem, 'id'>[]>([{ palette: 'Atlas', productType: 'Tynk', base: '', color: '', capacity: '', quantity: 1 }]);
  const [notes, setNotes] = useState('');

  const isViewMode = order !== null;

  useEffect(() => {
    if (order) {
        setClient(order.client);
        setItems(order.items);
        setNotes(order.notes || '');
    } else {
        // Reset form on new
        setClient('');
        setItems([{ palette: 'Atlas', productType: 'Tynk', base: '', color: '', capacity: '', quantity: 1 }]);
        setNotes('');
    }
  }, [order, isOpen]);
  
  const handleAddItem = () => {
    setItems([...items, { palette: 'Atlas', productType: 'Tynk', base: '', color: '', capacity: '', quantity: 1 }]);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleItemChange = (index: number, field: keyof Omit<ProductionOrderItem, 'id'>, value: string | number) => {
    const newItems = [...items];
    (newItems[index] as any)[field] = value;
    setItems(newItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!client || items.length === 0) return;
    onSave({
      client,
      items: items.map((item, index) => ({ ...item, id: index + 1 })),
      notes: notes || undefined,
      status: ProductionOrderStatus.ToDo,
    });
  };

  if (!isOpen) return null;

  const renderViewField = (label: string, value: React.ReactNode) => (
    <div className="mb-2">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold text-dark">{value}</p>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center" aria-modal="true" role="dialog">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col no-print animate-scaleIn">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-dark">{isViewMode ? `Zamówienie: ${order.orderNumber}` : 'Nowe Zamówienie Produkcyjne'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2">&times;</button>
        </div>

        {isViewMode && order ? (
            <div className="p-6 overflow-y-auto">
                {renderViewField("Klient", order.client)}
                {order.notes && renderViewField("Uwagi", order.notes)}
                <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">Pozycje</h3>
                <div className="space-y-3">
                    {order.items.map((item, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-md">
                            <p className="font-bold">{index + 1}. {item.productType} - {item.palette}</p>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1 mt-1 text-sm">
                                {renderViewField("Baza", item.base)}
                                {renderViewField("Kolor", item.color)}
                                {renderViewField("Pojemność", item.capacity)}
                                {renderViewField("Ilość", item.quantity)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ) : (
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
                <div className="p-6 space-y-4">
                    <div>
                        <label htmlFor="client" className="block text-sm font-medium text-gray-700">Klient</label>
                        <input type="text" id="client" value={client} onChange={e => setClient(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2" />
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Pozycje zamówienia</h3>
                        <div className="space-y-4">
                        {items.map((item, index) => (
                            <div key={index} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-end p-3 bg-gray-50 rounded-md relative">
                                <div className="sm:col-span-2">
                                    <label className="text-xs font-medium text-gray-600">Paleta</label>
                                    <select value={item.palette} onChange={e => handleItemChange(index, 'palette', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 text-sm">
                                        {PALETTES.map(p => <option key={p} value={p}>{p}</option>)}
                                    </select>
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="text-xs font-medium text-gray-600">Produkt</label>
                                    <select value={item.productType} onChange={e => handleItemChange(index, 'productType', e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 text-sm">
                                        {PRODUCT_TYPES.map(p => <option key={p} value={p}>{p}</option>)}
                                    </select>
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="text-xs font-medium text-gray-600">Baza</label>
                                    <input type="text" placeholder="np. Baza A" value={item.base} onChange={e => handleItemChange(index, 'base', e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 text-sm" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="text-xs font-medium text-gray-600">Kolor</label>
                                    <input type="text" placeholder="np. A001" value={item.color} onChange={e => handleItemChange(index, 'color', e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 text-sm" />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="text-xs font-medium text-gray-600">Pojemność</label>
                                    <input type="text" placeholder="np. 25kg" value={item.capacity} onChange={e => handleItemChange(index, 'capacity', e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 text-sm" />
                                </div>
                                <div className="sm:col-span-1">
                                    <label className="text-xs font-medium text-gray-600">Ilość</label>
                                    <input type="number" value={item.quantity} min="1" onChange={e => handleItemChange(index, 'quantity', parseInt(e.target.value, 10) || 1)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 text-sm" />
                                </div>
                                <div className="sm:col-span-1 flex justify-end">
                                    {items.length > 1 && <button type="button" onClick={() => handleRemoveItem(index)} className="text-red-500 hover:text-red-700 p-2 rounded-full bg-red-100 h-9 w-9 flex items-center justify-center">-</button>}
                                </div>
                            </div>
                        ))}
                        </div>
                        <button type="button" onClick={handleAddItem} className="mt-3 text-sm text-primary hover:text-secondary font-medium">+ Dodaj kolejną pozycję</button>
                    </div>

                    <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Uwagi (opcjonalnie)</label>
                        <textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} rows={2} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm p-2"></textarea>
                    </div>
                </div>
            </form>
        )}
        
        <div className="flex justify-end items-center p-4 border-t bg-gray-50">
          <button onClick={onClose} type="button" className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200 transform active:scale-95">
            {isViewMode ? 'Zamknij' : 'Anuluj'}
          </button>
          {!isViewMode && (
              <button type="submit" onClick={handleSubmit} className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-red-700 transition-all duration-200 transform hover:scale-105 active:scale-95">Zapisz zamówienie</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductionOrderModal;
