import React, { useState } from 'react';
import Card from './ui/Card';
import LeaveRequestModal from './LeaveRequestModal';
import type { LeaveRequest, User } from '../types';
import { LeaveRequestStatus, LeaveType } from '../types';

const initialLeaveRequests: LeaveRequest[] = [
    { id: 1, userId: 3, userName: 'Dawid Strzadała', leaveType: LeaveType.Wypoczynkowy, startDate: '2024-08-01', endDate: '2024-08-10', status: LeaveRequestStatus.Approved, comment: 'Wakacje' },
    { id: 2, userId: 4, userName: 'Adrian Strządała', leaveType: LeaveType.NaZadanie, startDate: '2024-07-29', endDate: '2024-07-29', status: LeaveRequestStatus.Pending },
    { id: 3, userId: 3, userName: 'Dawid Strzadała', leaveType: LeaveType.Okolicznosciowy, startDate: '2024-09-05', endDate: '2024-09-06', status: LeaveRequestStatus.Rejected, comment: 'Ślub brata' },
];

const StatusBadge: React.FC<{ status: LeaveRequestStatus }> = ({ status }) => {
    const statusConfig = {
        [LeaveRequestStatus.Pending]: { text: 'Oczekujący', color: 'yellow' },
        [LeaveRequestStatus.Approved]: { text: 'Zaakceptowany', color: 'green' },
        [LeaveRequestStatus.Rejected]: { text: 'Odrzucony', color: 'red' },
    };
    const { text, color } = statusConfig[status];
    return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${color}-100 text-${color}-800`}>
            {text}
        </span>
    );
};

interface UrlopyPageProps {
    currentUser: User;
}

const UrlopyPage: React.FC<UrlopyPageProps> = ({ currentUser }) => {
    const [requests, setRequests] = useState<LeaveRequest[]>(initialLeaveRequests);
    const [isModalOpen, setModalOpen] = useState(false);

    const isManager = currentUser.role === 'Admin' || currentUser.role === 'Manager';

    const handleSaveRequest = (data: Omit<LeaveRequest, 'id' | 'userId' | 'userName' | 'status'>) => {
        const newRequest: LeaveRequest = {
            id: Date.now(),
            userId: currentUser.id,
            userName: currentUser.name,
            status: LeaveRequestStatus.Pending,
            ...data,
        };
        setRequests(prev => [newRequest, ...prev]);
        setModalOpen(false);
    };
    
    const handleStatusChange = (id: number, status: LeaveRequestStatus.Approved | LeaveRequestStatus.Rejected) => {
        setRequests(requests.map(req => req.id === id ? { ...req, status } : req));
    };

    const userRequests = isManager ? requests : requests.filter(r => r.userId === currentUser.id);

    return (
        <div className="space-y-6">
            <Card>
                <h3 className="text-lg font-bold text-dark mb-4">Kalendarz Urlopów Zespołu</h3>
                <div className="bg-gray-100 rounded-lg overflow-hidden h-[600px]">
                    <iframe
                        src="https://calendar.google.com/calendar/embed?src=pl.polish%23holiday%40group.v.calendar.google.com&ctz=Europe%2FWarsaw&mode=MONTH"
                        style={{ border: 0, width: '100%', height: '100%' }}
                        frameBorder="0"
                        scrolling="no"
                        title="Kalendarz Urlopów"
                    ></iframe>
                </div>
                <p className="text-xs text-gray-500 mt-2">Wskazówka: Wklej publiczny URL swojego kalendarza Google w kodzie, aby zintegrować go z intranetem.</p>
            </Card>

            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <h2 className="text-xl font-bold text-dark">{isManager ? 'Wszystkie wnioski urlopowe' : 'Moje wnioski urlopowe'}</h2>
                <button onClick={() => setModalOpen(true)} className="bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center">
                    Złóż wniosek urlopowy
                </button>
            </div>

            <Card className="!p-0 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                {isManager && <th scope="col" className="px-6 py-3">Pracownik</th>}
                                <th scope="col" className="px-6 py-3">Typ wniosku</th>
                                <th scope="col" className="px-6 py-3">Daty</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                {isManager && <th scope="col" className="px-6 py-3 text-right">Akcje</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {userRequests.map((req, index) => (
                                <tr key={req.id} className="bg-white border-b hover:bg-gray-50 animate-fadeIn" style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}>
                                    {isManager && <td className="px-6 py-4 font-medium text-dark">{req.userName}</td>}
                                    <td className="px-6 py-4">{req.leaveType}</td>
                                    <td className="px-6 py-4">{req.startDate} - {req.endDate}</td>
                                    <td className="px-6 py-4"><StatusBadge status={req.status} /></td>
                                    {isManager && (
                                        <td className="px-6 py-4 text-right space-x-2">
                                            {req.status === LeaveRequestStatus.Pending && (
                                                <>
                                                    <button onClick={() => handleStatusChange(req.id, LeaveRequestStatus.Approved)} className="text-green-600 font-medium hover:text-green-800">Akceptuj</button>
                                                    <button onClick={() => handleStatusChange(req.id, LeaveRequestStatus.Rejected)} className="text-red-600 font-medium hover:text-red-800">Odrzuć</button>
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
                <LeaveRequestModal
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    onSave={handleSaveRequest}
                />
            )}
        </div>
    );
};

export default UrlopyPage;
