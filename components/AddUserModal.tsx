import React, { useState } from 'react';
import type { User, Role } from '../types';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: Omit<User, 'id' | 'avatar'>) => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('Pracownik');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !title || !email || !password) return;
    onSave({ name, title, email, role, password });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4" aria-modal="true" role="dialog">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg animate-scaleIn">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-bold text-dark">Dodaj nowego użytkownika</h2>
            <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 leading-none">&times;</button>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Imię i nazwisko</label>
              <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
            </div>
             <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Stanowisko</label>
              <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
            </div>
             <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Adres email</label>
              <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
            </div>
             <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Hasło początkowe</label>
              <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2" />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">Rola</label>
              <select id="role" value={role} onChange={e => setRole(e.target.value as Role)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2">
                <option value="Pracownik">Pracownik</option>
                <option value="Manager">Manager</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end items-center p-4 border-t bg-gray-50">
            <button type="button" onClick={onClose} className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200 transform active:scale-95">Anuluj</button>
            <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-red-700 transition-all duration-200 transform hover:scale-105 active:scale-95">Zapisz użytkownika</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;