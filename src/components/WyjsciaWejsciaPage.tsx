import React, { useState } from 'react';
import Card from './ui/Card';
import TimeOffRequestModal from './TimeOffRequestModal';
import type { TimeOffRequest, User } from '../types';
import { TimeOffRequestStatus, TimeOffType } from '../types';

const initialRequests: TimeOffRequest[] = [
    { id: 1, userId: 4, userName: 'Adrian Strządała', requestType: TimeOffType.WczesniejszeWyjscie, date: '2024-07-30', time: '15:00', reason: 'Wizyta u lekarza', status: TimeOffRequestStatus.Pending },
    { id: 2, userId: 3, userName: 'Dawid Strzadała', requestType: TimeOffType.PozniejszePrzyjscie, date: '2024-07-25', time: '10:00', reason: 'Sprawy urzędowe', status: TimeOffRequestStatus.Approved },
];

const StatusBadge: React.FC<{ status: TimeOffRequestStatus }> = ({ status }) => {
    const statusConfig = {
        [TimeOffRequestStatus.Pending]: { text: 'Oczekujący', color: 'yellow' },
        [TimeOffRequestStatus.Approved]: { text: 'Zaakceptowany', color: 'green' },
        [TimeOffRequestStatus.Rejected]: { text: 'Odrzucony', color: 'red' },
    };
    const { text, color } = statusConfig[status];
    return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${color}-100 text-${color}-800`}>
            {text}
        </span>
    );
};

interface WyjsciaWejsciaPageProps {
    currentUser: User;
}

const WyjsciaWejsciaPage: React.FC<WyjsciaWejsciaPageProps> = ({ currentUser }) => {
    const [requests, setRequests] = useState<TimeOffRequest[]>(initialRequests);
    const [isModalOpen, setModalOpen] = useState(false);
    
    const isManager = currentUser.role === 'Admin' || currentUser.role === 'Manager';

    const handleSaveRequest = (data: Omit<TimeOffRequest, 'id' | 'userId' | 'userName' | 'status'>) => {
        const newRequest: TimeOffRequest = {
            id: Date.now(),
            userId: currentUser.id,
            userName: currentUser.name,
            status: TimeOffRequestStatus.Pending,
            ...data,
        };
        setRequests(prev => [newRequest, ...prev]);
        setModalOpen(false);
    };
    
    const handleStatusChange = (id: number, status: TimeOffRequestStatus.Approved | TimeOffRequestStatus.Rejected) => {
        setRequests(requests.map(req => req.id === id ? { ...req, status } : req));
    };

    const userRequests = isManager ? requests : requests.filter(r => r.userId === currentUser.id);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                     <h2 className="text-xl font-bold text-dark">{isManager ? 'Wnioski o wyjścia/wejścia' : 'Moje wnioski'}</h2>
                     <p className="text-medium mt-1">Zarządzaj wnioskami o niestandardowe godziny pracy.</p>
                </div>
                <button onClick={() => setModalOpen(true)} className="bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center">
                    Złóż wniosek
                </button>
            </div>

            <Card className="!p-0 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                {isManager && <th scope="col" className="px-6 py-3">Pracownik</th>}
                                <th scope="col" className="px-6 py-3">Typ wniosku</th>
                                <th scope="col" className="px-6 py-3">Data i godzina</th>
                                <th scope="col" className="px-6 py-3">Powód</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                {isManager && <th scope="col" className="px-6 py-3 text-right">Akcje</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {userRequests.map((req, index) => (
                                <tr key={req.id} className="bg-white border-b hover:bg-gray-50 animate-fadeIn" style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}>
                                    {isManager && <td className="px-6 py-4 font-medium text-dark">{req.userName}</td>}
                                    <td className="px-6 py-4">{req.requestType}</td>
                                    <td className="px-6 py-4">{req.date} o {req.time}</td>
                                    <td className="px-6 py-4 truncate max-w-xs">{req.reason}</td>
                                    <td className="px-6 py-4"><StatusBadge status={req.status} /></td>
                                    {isManager && (
                                        <td className="px-6 py-4 text-right space-x-2">
                                            {req.status === TimeOffRequestStatus.Pending && (
                                                <>
                                                    <button onClick={() => handleStatusChange(req.id, TimeOffRequestStatus.Approved)} className="text-green-600 font-medium hover:text-green-800">Akceptuj</button>
                                                    <button onClick={() => handleStatusChange(req.id, TimeOffRequestStatus.Rejected)} className="text-red-600 font-medium hover:text-red-800">Odrzuć</button>
                                                </>
                                            )}
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {isModalOpen && (
                <TimeOffRequestModal
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    onSave={handleSaveRequest}
                />
            )}
        </div>
    );
};

export default WyjsciaWejsciaPage;
