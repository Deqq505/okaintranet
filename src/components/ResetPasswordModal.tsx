import React, { useState } from 'react';
import type { User } from '../types';

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (userId: number, newPassword: string) => void;
  user: User;
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({ isOpen, onClose, onSave, user }) => {
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) return;
    onSave(user.id, newPassword);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4" aria-modal="true" role="dialog">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-scaleIn">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-bold text-dark">Resetuj hasło</h2>
            <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 leading-none">&times;</button>
          </div>
          <div className="p-6 space-y-4">
             <p>Resetujesz hasło dla użytkownika: <strong className="text-dark">{user.name}</strong>.</p>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">Nowe hasło</label>
              <input 
                type="password" 
                id="newPassword" 
                value={newPassword} 
                onChange={e => setNewPassword(e.target.value)} 
                required 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" 
                autoFocus
              />
            </div>
          </div>
          <div className="flex justify-end items-center p-4 border-t bg-gray-50">
            <button type="button" onClick={onClose} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200 transform active:scale-95">Anuluj</button>
            <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-red-700 transition-all duration-200 transform hover:scale-105 active:scale-95">Zapisz nowe hasło</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
