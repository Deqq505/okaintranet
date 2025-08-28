import React, { useState } from 'react';
import Card from './ui/Card';
import ProductionOrderModal from './ProductionOrderModal';
import type { ProductionOrder, User } from '../types';
import { ProductionOrderStatus } from '../types';

const initialProductionOrders: ProductionOrder[] = [
    {
        id: 1,
        orderNumber: 'PROD/2024/07/001',
        creationDate: '2024-07-22',
        client: 'Klient Hurtowy A',
        items: [
            { id: 1, palette: 'Atlas', productType: 'Tynk', base: 'Baza A', color: 'A001', capacity: '25kg', quantity: 10 },
            { id: 2, palette: 'Sempre', productType: 'Farba', base: 'Baza C', color: 'S203', capacity: '10L', quantity: 5 },
        ],
        createdBy: 'Jacek Strzadała',
        notes: 'Pilne, dostawa na jutro rano.',
        status: ProductionOrderStatus.ToDo,
    },
    {
        id: 2,
        orderNumber: 'PROD/2024/07/002',
        creationDate: '2024-07-21',
        client: 'Klient Indywidualny B',
        items: [
            { id: 1, palette: 'Tikkurila', productType: 'Farba', base: 'Optiva 5', color: 'NCS S 0500-N', capacity: '5L', quantity: 2 },
        ],
        createdBy: 'Adrian Strządała',
        status: ProductionOrderStatus.Done,
    },
];

const StatusBadge: React.FC<{ status: ProductionOrderStatus }> = ({ status }) => {
    const statusStyles = {
        [ProductionOrderStatus.ToDo]: 'bg-orange-100 text-orange-800',
        [ProductionOrderStatus.Done]: 'bg-green-100 text-green-800',
    };
    return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status]}`}>
            {status}
        </span>
    );
}

interface ProductionPageProps {
    currentUser: User;
}

const ProductionPage: React.FC<ProductionPageProps> = ({ currentUser }) => {
    const [orders, setOrders] = useState<ProductionOrder[]>(initialProductionOrders);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<ProductionOrder | null>(null);

    const handleAddNew = () => {
        setSelectedOrder(null);
        setModalOpen(true);
    };

    const handleView = (order: ProductionOrder) => {
        setSelectedOrder(order);
        setModalOpen(true);
    };

    const handleSave = (orderData: Omit<ProductionOrder, 'id' | 'orderNumber' | 'creationDate' | 'createdBy'>) => {
        const newOrder: ProductionOrder = {
            id: Date.now(),
            orderNumber: `PROD/${new Date().getFullYear()}/${(new Date().getMonth() + 1).toString().padStart(2, '0')}/${(orders.length + 1).toString().padStart(3, '0')}`,
            creationDate: new Date().toISOString().split('T')[0],
            createdBy: currentUser.name,
            ...orderData
        };
        setOrders(prev => [newOrder, ...prev]);
        setModalOpen(false);
    };

    const handleToggleStatus = (id: number) => {
        setOrders(prev =>
            prev.map(o => {
                if (o.id === id) {
                    return { ...o, status: o.status === ProductionOrderStatus.ToDo ? ProductionOrderStatus.Done : ProductionOrderStatus.ToDo };
                }
                return o;
            })
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <p className="text-medium mt-1">Twórz i zarządzaj zamówieniami produkcyjnymi na mieszanie tynków i farb.</p>
                </div>
                <button onClick={handleAddNew} className="bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    Dodaj nowe zamówienie
                </button>
            </div>
            
            <Card className="overflow-hidden !p-0">
                 {/* Desktop Table View */}
                 <div className="overflow-x-auto hidden lg:block">
                     <table className="w-full text-sm text-left text-gray-500">
                         <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                             <tr>
                                 <th scope="col" className="px-6 py-3">Numer</th>
                                 <th scope="col" className="px-6 py-3">Klient</th>
                                 <th scope="col" className="px-6 py-3">Data</th>
                                 <th scope="col" className="px-6 py-3">Status</th>
                                 <th scope="col" className="px-6 py-3 text-right">Akcje</th>
                             </tr>
                         </thead>
                         <tbody>
                             {orders.map((order) => (
                                 <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                                     <td className="px-6 py-4 font-bold text-dark">{order.orderNumber}</td>
                                     <td className="px-6 py-4">{order.client}</td>
                                     <td className="px-6 py-4">{order.creationDate}</td>
                                     <td className="px-6 py-4"><StatusBadge status={order.status} /></td>
                                     <td className="px-6 py-4 text-right space-x-2">
                                         <button onClick={() => handleView(order)} className="text-primary hover:text-secondary font-medium">Podgląd</button>
                                         <button onClick={() => handleToggleStatus(order.id)} className="font-medium"
                                             style={{color: order.status === ProductionOrderStatus.ToDo ? '#16a34a' : '#f97316'}}
                                         >
                                            {order.status === ProductionOrderStatus.ToDo ? 'Oznacz jako zrobione' : 'Cofnij na "Do zrobienia"'}
                                         </button>
                                     </td>
                                 </tr>
                             ))}
                         </tbody>
                     </table>
                 </div>

                 {/* Mobile Card View */}
                 <div className="lg:hidden p-4 space-y-4">
                     {orders.map((order, index) => (
                         <Card key={order.id} className="w-full animate-fadeIn" style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}>
                             <div className="flex justify-between items-start">
                                 <div>
                                     <p className="font-bold text-dark">{order.orderNumber}</p>
                                     <p className="text-sm text-medium">{order.client}</p>
                                     <p className="text-xs text-gray-400 mt-1">{order.creationDate}</p>
                                 </div>
                                 <StatusBadge status={order.status} />
                             </div>
                             <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row gap-2">
                                 <button onClick={() => handleView(order)} className="w-full text-sm text-primary hover:text-secondary font-medium p-2 rounded-md bg-primary/10">Podgląd</button>
                                 <button onClick={() => handleToggleStatus(order.id)} className="w-full text-sm font-medium p-2 rounded-md"
                                     style={{
                                         color: order.status === ProductionOrderStatus.ToDo ? '#16a34a' : '#f97316',
                                         backgroundColor: order.status === ProductionOrderStatus.ToDo ? 'rgba(22, 163, 74, 0.1)' : 'rgba(249, 115, 22, 0.1)',
                                     }}
                                 >
                                     {order.status === ProductionOrderStatus.ToDo ? 'Oznacz jako zrobione' : 'Cofnij'}
                                 </button>
                             </div>
                         </Card>
                     ))}
                 </div>
            </Card>

            {isModalOpen && (
                <ProductionOrderModal
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    onSave={handleSave}
                    order={selectedOrder}
                />
            )}
        </div>
    );
};

export default ProductionPage;
