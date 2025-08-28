import React, { useState } from 'react';
import Card from './ui/Card';
import CustomerReturnModal from './CustomerReturnModal';
import type { CustomerReturn } from '../types';
import { CustomerReturnStatus } from '../types';

const initialReturns: CustomerReturn[] = [
    {
        id: 1,
        docNumber: 'ZW/2024/07/001',
        returnDate: '2024-07-22',
        client: 'Klient A',
        originalWzNumber: 'WZ/2024/07/001',
        items: [
            { id: 1, name: 'Roleta zewnętrzna', quantity: 1, unit: 'szt.', reason: 'Uszkodzona w transporcie' },
        ],
        receivedBy: 'Jan Kowalski',
        status: CustomerReturnStatus.Pending,
    },
    {
        id: 2,
        docNumber: 'ZW/2024/07/002',
        returnDate: '2024-07-21',
        client: 'Klient C',
        items: [{ id: 1, name: 'Parapet wewnętrzny', quantity: 5, unit: 'szt.', reason: 'Zły wymiar'}],
        receivedBy: 'Piotr Brzyski',
        status: CustomerReturnStatus.Accepted,
    },
];

const StatusBadge: React.FC<{ status: CustomerReturnStatus }> = ({ status }) => {
    const statusStyles = {
        [CustomerReturnStatus.Pending]: 'bg-blue-100 text-blue-800',
        [CustomerReturnStatus.Accepted]: 'bg-green-100 text-green-800',
    };
    return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status]}`}>
            {status}
        </span>
    );
}

const CustomerReturnsPage: React.FC = () => {
    const [returns, setReturns] = useState<CustomerReturn[]>(initialReturns);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedReturn, setSelectedReturn] = useState<CustomerReturn | null>(null);

    const handleAddNew = () => {
        setSelectedReturn(null);
        setModalOpen(true);
    };

    const handleView = (customerReturn: CustomerReturn) => {
        setSelectedReturn(customerReturn);
        setModalOpen(true);
    };

    const handleSave = (returnData: Omit<CustomerReturn, 'id' | 'docNumber' | 'returnDate'>) => {
        const newReturn: CustomerReturn = {
            id: Date.now(),
            docNumber: `ZW/${new Date().getFullYear()}/${(new Date().getMonth() + 1).toString().padStart(2, '0')}/${(returns.length + 1).toString().padStart(3, '0')}`,
            returnDate: new Date().toISOString().split('T')[0],
            ...returnData
        };
        setReturns(prev => [newReturn, ...prev]);
        setModalOpen(false);
    };

    const handleSetAsAccepted = (id: number) => {
        setReturns(prev =>
            prev.map(r =>
                r.id === id ? { ...r, status: CustomerReturnStatus.Accepted } : r
            )
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <p className="text-medium mt-1">Rejestruj i zarządzaj zwrotami towarów od klientów.</p>
                </div>
                <button onClick={handleAddNew} className="bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    Dodaj nowy zwrot
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
                             {returns.map((ret) => (
                                 <tr key={ret.id} className="bg-white border-b hover:bg-gray-50">
                                     <td className="px-6 py-4 font-bold text-dark">{ret.docNumber}</td>
                                     <td className="px-6 py-4">{ret.client}</td>
                                     <td className="px-6 py-4">{ret.returnDate}</td>
                                     <td className="px-6 py-4"><StatusBadge status={ret.status} /></td>
                                     <td className="px-6 py-4 text-right space-x-2">
                                         <button onClick={() => handleView(ret)} className="text-primary hover:text-secondary font-medium">Podgląd</button>
                                         {ret.status === CustomerReturnStatus.Pending && (
                                             <button onClick={() => handleSetAsAccepted(ret.id)} className="text-green-600 hover:text-green-800 font-medium">Przyjmij zwrot</button>
                                         )}
                                     </td>
                                 </tr>
                             ))}
                         </tbody>
                     </table>
                 </div>

                 {/* Mobile Card View */}
                 <div className="lg:hidden p-4 space-y-4">
                     {returns.map((ret, index) => (
                         <Card key={ret.id} className="w-full animate-fadeIn" style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}>
                             <div className="flex justify-between items-start">
                                 <div>
                                     <p className="font-bold text-dark">{ret.docNumber}</p>
                                     <p className="text-sm text-medium">{ret.client}</p>
                                     <p className="text-xs text-gray-400">{ret.returnDate}</p>
                                 </div>
                                 <StatusBadge status={ret.status} />
                             </div>
                             <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row gap-2">
                                 <button onClick={() => handleView(ret)} className="w-full text-sm text-primary hover:text-secondary font-medium p-2 rounded-md bg-primary/10">Podgląd</button>
                                 {ret.status === CustomerReturnStatus.Pending && (
                                     <button onClick={() => handleSetAsAccepted(ret.id)} className="w-full text-sm text-green-600 hover:text-green-800 font-medium p-2 rounded-md bg-green-600/10">Przyjmij zwrot</button>
                                 )}
                             </div>
                         </Card>
                     ))}
                 </div>
            </Card>

            {isModalOpen && (
                <CustomerReturnModal
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    onSave={handleSave}
                    customerReturn={selectedReturn}
                />
            )}
        </div>
    );
};

export default CustomerReturnsPage;