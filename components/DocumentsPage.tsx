import React from 'react';
import type { Document } from '../types';
import Card from './ui/Card';

const initialDocuments: Document[] = [
  { id: 1, name: 'Polityka Pracy Zdalnej.pdf', type: 'PDF', lastModified: '2024-07-12', size: '2.5 MB' },
  { id: 2, name: 'Onboarding - Plan na pierwszy tydzień.docx', type: 'Word', lastModified: '2024-07-10', size: '1.2 MB' },
  { id: 3, name: 'Wyniki Finansowe Q2 2024.xlsx', type: 'Spreadsheet', lastModified: '2024-07-05', size: '5.8 MB' },
  { id: 4, name: 'Prezentacja Strategii 2025.pptx', type: 'Presentation', lastModified: '2024-06-28', size: '12.1 MB' },
  { id: 5, name: 'Regulamin Biura.pdf', type: 'PDF', lastModified: '2024-05-15', size: '0.8 MB' },
];

const FileIcon: React.FC<{ type: Document['type'] }> = ({ type }) => {
    const colors = {
        PDF: 'text-red-500',
        Word: 'text-blue-500',
        Spreadsheet: 'text-green-500',
        Presentation: 'text-orange-500',
    };
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`h-6 w-6 ${colors[type]}`}>
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
        </svg>
    );
};

const DownloadButton = () => (
    <button className="text-primary hover:text-secondary font-medium transition-transform transform hover:scale-110 active:scale-95">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
    </button>
)

const DocumentsPage: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
            <p className="text-medium mt-1">Centralne repozytorium ważnych dokumentów firmowych.</p>
        </div>
      
      {/* Desktop Table View */}
      <div className="overflow-x-auto hidden md:block">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Nazwa Pliku</th>
              <th scope="col" className="px-6 py-3">Typ</th>
              <th scope="col" className="px-6 py-3">Ostatnia modyfikacja</th>
              <th scope="col" className="px-6 py-3">Rozmiar</th>
              <th scope="col" className="px-6 py-3 text-right">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {initialDocuments.map((doc, index) => (
              <tr key={doc.id} className="bg-white border-b hover:bg-gray-50 animate-fadeIn" style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex items-center">
                    <FileIcon type={doc.type} />
                    <span className="ml-3">{doc.name}</span>
                </td>
                <td className="px-6 py-4">{doc.type}</td>
                <td className="px-6 py-4">{doc.lastModified}</td>
                <td className="px-6 py-4">{doc.size}</td>
                <td className="px-6 py-4 text-right">
                  <DownloadButton />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden p-4 space-y-4">
        {initialDocuments.map((doc, index) => (
            <Card key={doc.id} className="w-full animate-fadeIn" style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}>
                <div className="flex items-start justify-between">
                    <div className="flex items-center">
                        <FileIcon type={doc.type} />
                        <span className="ml-3 font-medium text-dark">{doc.name}</span>
                    </div>
                    <DownloadButton />
                </div>
                <div className="mt-4 text-xs text-medium space-y-1">
                    <p><strong>Typ:</strong> {doc.type}</p>
                    <p><strong>Rozmiar:</strong> {doc.size}</p>
                    <p><strong>Modyfikacja:</strong> {doc.lastModified}</p>
                </div>
            </Card>
        ))}
      </div>
    </div>
  );
};

export default DocumentsPage;