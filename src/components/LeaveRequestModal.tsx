import React, { useState } from 'react';
import type { LeaveRequest } from '../types';
import { LeaveType } from '../types';

interface LeaveRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<LeaveRequest, 'id' | 'userId' | 'userName' | 'status'>) => void;
}

const LeaveRequestModal: React.FC<LeaveRequestModalProps> = ({ isOpen, onClose, onSave }) => {
  const [leaveType, setLeaveType] = useState<LeaveType>(LeaveType.Wypoczynkowy);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ leaveType, startDate, endDate, comment });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg animate-scaleIn">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-bold text-dark">Nowy wniosek urlopowy</h2>
            <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="leaveType" className="block text-sm font-medium text-gray-700">Rodzaj urlopu</label>
              <select
                id="leaveType"
                value={leaveType}
                onChange={e => setLeaveType(e.target.value as LeaveType)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              >
                {Object.values(LeaveType).map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Data początkowa</label>
                <input type="date" id="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
              </div>
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Data końcowa</label>
                <input type="date" id="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} min={startDate} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
              </div>
            </div>
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Komentarz (opcjonalnie)</label>
              <textarea id="comment" value={comment} onChange={e => setComment(e.target.value)} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"></textarea>
            </div>
          </div>
          <div className="flex justify-end items-center p-4 border-t bg-gray-50">
            <button type="button" onClick={onClose} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200 transform active:scale-95">Anuluj</button>
            <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-red-700 transition-all duration-200 transform hover:scale-105 active:scale-95">Wyślij wniosek</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveRequestModal;
