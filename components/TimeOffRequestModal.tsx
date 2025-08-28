import React, { useState } from 'react';
import type { TimeOffRequest } from '../types';
import { TimeOffType } from '../types';

interface TimeOffRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<TimeOffRequest, 'id' | 'userId' | 'userName' | 'status'>) => void;
}

const TimeOffRequestModal: React.FC<TimeOffRequestModalProps> = ({ isOpen, onClose, onSave }) => {
  const [requestType, setRequestType] = useState<TimeOffType>(TimeOffType.WczesniejszeWyjscie);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ requestType, date, time, reason });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg animate-scaleIn">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-bold text-dark">Nowy wniosek o wyjście/przyjście</h2>
            <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">&times;</button>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="requestType" className="block text-sm font-medium text-gray-700">Rodzaj wniosku</label>
              <select
                id="requestType"
                value={requestType}
                onChange={e => setRequestType(e.target.value as TimeOffType)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
              >
                {Object.values(TimeOffType).map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Data</label>
                <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700">Godzina</label>
                <input type="time" id="time" value={time} onChange={e => setTime(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
              </div>
            </div>
            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Powód</label>
              <textarea id="reason" value={reason} onChange={e => setReason(e.target.value)} rows={3} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"></textarea>
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

export default TimeOffRequestModal;