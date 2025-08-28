import React, { useState } from 'react';
import Card from './ui/Card';
import WarehouseReleaseModal from './WarehouseReleaseModal';
import type { WarehouseRelease } from '../types';
import { WarehouseReleaseStatus } from '../types';

const initialReleases: WarehouseRelease[] = [
    {
        id: 1,
        docNumber: 'WZ/2024/07/001',
        issueDate: '2024-07-21',
        client: 'Klient A',
        constructionSite: 'Budowa biurowca "SKY TOWER"',
        items: [
            { id: 1, name: 'Okno PCV 120x150', quantity: 2, unit: 'szt.' },
            { id: 2, name: 'Roleta zewnętrzna', quantity: 2, unit: 'szt.' },
        ],
        issuedBy: 'Jan Kowalski',
        notes: 'Pilne zamówienie.',
        status: WarehouseReleaseStatus.Temporary,
    },
    {
        id: 2,
        docNumber: 'WZ/2024/07/002',
        issueDate: '2024-07-20',
        client: 'Klient B',
        items: [{ id: 1, name: 'Drzwi wejściowe', quantity: 1, unit: 'szt.' }],
        issuedBy: 'Jan Kowalski',
        notes: '',
        status: WarehouseReleaseStatus.Entered,
    },
];

const StatusBadge: React.FC<{ status: WarehouseReleaseStatus }> = ({ status }) => {
    const statusStyles = {
        [WarehouseReleaseStatus.Temporary]: 'bg-yellow-100 text-yellow-800',
        [WarehouseReleaseStatus.Entered]: 'bg-green-100 text-green-800',
    };
    return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status]}`}>
            {status}
        </span>
    );
}

const WarehouseReleasesPage: React.FC = () => {
    const [releases, setReleases] = useState<WarehouseRelease[]>(initialReleases);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedRelease, setSelectedRelease] = useState<WarehouseRelease | null>(null);

    const handleAddNew = () => {
        setSelectedRelease(null);
        setModalOpen(true);
    };

    const handleView = (release: WarehouseRelease) => {
        setSelectedRelease(release);
        setModalOpen(true);
    };

    const handleSave = (releaseData: Omit<WarehouseRelease, 'id' | 'docNumber' | 'issueDate'>) => {
        const newRelease: WarehouseRelease = {
            id: Date.now(),
            docNumber: `WZ/${new Date().getFullYear()}/${(new Date().getMonth() + 1).toString().padStart(2, '0')}/${(releases.length + 1).toString().padStart(3, '0')}`,
            issueDate: new Date().toISOString().split('T')[0],
            ...releaseData
        };
        setReleases(prev => [newRelease, ...prev]);
        setModalOpen(false);
    };

    const handleSetAsEntered = (id: number) => {
        setReleases(prev =>
            prev.map(r =>
                r.id === id ? { ...r, status: WarehouseReleaseStatus.Entered } : r
            )
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <p className="text-medium mt-1">Twórz i zarządzaj tymczasowymi dokumentami wydania magazynowego.</p>
                </div>
                <button onClick={handleAddNew} className="bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    Dodaj nowe wydanie
                </button>
            </div>
            
            <Card className="overflow-hidden !p-0">
                 {/* Desktop Table View */}
                 <div className="overflow-x-auto hidden lg:block">
                     <table className="w-full text-sm text-left text-gray-500">
                         <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                             <tr>
                                 <th scope="col" className="px-6 py-3">Numer</th>
                                 <th scope="col" className="px-6 py-3">Klient / Budowa</th>
                                 <th scope="col" className="px-6 py-3">Data</th>
                                 <th scope="col" className="px-6 py-3">Status</th>
                                 <th scope="col" className="px-6 py-3 text-right">Akcje</th>
                             </tr>
                         </thead>
                         <tbody>
                             {releases.map((release) => (
                                 <tr key={release.id} className="bg-white border-b hover:bg-gray-50">
                                     <td className="px-6 py-4 font-bold text-dark">{release.docNumber}</td>
                                     <td className="px-6 py-4">
                                        {release.client}
                                        {release.constructionSite && <span className="block text-xs text-gray-500">{release.constructionSite}</span>}
                                     </td>
                                     <td className="px-6 py-4">{release.issueDate}</td>
                                     <td className="px-6 py-4"><StatusBadge status={release.status} /></td>
                                     <td className="px-6 py-4 text-right space-x-2">
                                         <button onClick={() => handleView(release)} className="text-primary hover:text-secondary font-medium">Podgląd/Drukuj</button>
                                         {release.status === WarehouseReleaseStatus.Temporary && (
                                             <button onClick={() => handleSetAsEntered(release.id)} className="text-green-600 hover:text-green-800 font-medium">Oznacz jako wprowadzony</button>
                                         )}
                                     </td>
                                 </tr>
                             ))}
                         </tbody>
                     </table>
                 </div>

                 {/* Mobile Card View */}
                 <div className="lg:hidden p-4 space-y-4">
                     {releases.map((release, index) => (
                         <Card key={release.id} className="w-full animate-fadeIn" style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}>
                             <div className="flex justify-between items-start">
                                 <div>
                                     <p className="font-bold text-dark">{release.docNumber}</p>
                                     <p className="text-sm text-medium">{release.client}</p>
                                     {release.constructionSite && <p className="text-xs text-gray-500">{release.constructionSite}</p>}
                                     <p className="text-xs text-gray-400 mt-1">{release.issueDate}</p>
                                 </div>
                                 <StatusBadge status={release.status} />
                             </div>
                             <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row gap-2">
                                 <button onClick={() => handleView(release)} className="w-full text-sm text-primary hover:text-secondary font-medium p-2 rounded-md bg-primary/10">Podgląd/Drukuj</button>
                                 {release.status === WarehouseReleaseStatus.Temporary && (
                                     <button onClick={() => handleSetAsEntered(release.id)} className="w-full text-sm text-green-600 hover:text-green-800 font-medium p-2 rounded-md bg-green-600/10">Oznacz jako wprowadzony</button>
                                 )}
                             </div>
                         </Card>
                     ))}
                 </div>
            </Card>

            {isModalOpen && (
                <WarehouseReleaseModal
                    isOpen={isModalOpen}
                    onClose={() => setModalOpen(false)}
                    onSave={handleSave}
                    release={selectedRelease}
                />
            )}
        </div>
    );
};

export default WarehouseReleasesPage;
