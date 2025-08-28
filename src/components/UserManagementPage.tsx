import React, { useState } from 'react';
import Card from './ui/Card';
import AddUserModal from './AddUserModal';
import ResetPasswordModal from './ResetPasswordModal';
import type { User, Role } from '../types';

interface UserManagementPageProps {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const KeyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
    </svg>
);


const UserManagementPage: React.FC<UserManagementPageProps> = ({ users, setUsers }) => {
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isResetModalOpen, setResetModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const handleRoleChange = (userId: number, newRole: Role) => {
        setUsers(currentUsers => currentUsers.map(user =>
            user.id === userId ? { ...user, role: newRole } : user
        ));
    };
    
    const handleAddUser = (newUser: Omit<User, 'id' | 'avatar' >) => {
        const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
        const newAvatar = `https://ui-avatars.com/api/?name=${newUser.name.replace(/ /g, '+')}&background=d52b1e&color=fff&bold=true`;
        setUsers(currentUsers => [...currentUsers, { ...newUser, id: newId, avatar: newAvatar }]);
        setAddModalOpen(false);
    };

    const handleOpenResetModal = (user: User) => {
        setSelectedUser(user);
        setResetModalOpen(true);
    };

    const handleResetPassword = (userId: number, newPassword: string) => {
        setUsers(currentUsers => currentUsers.map(user =>
            user.id === userId ? { ...user, password: newPassword } : user
        ));
        setResetModalOpen(false);
        setSelectedUser(null);
    };

    return (
        <>
            <Card>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-dark">Zarządzanie Użytkownikami</h2>
                        <p className="text-medium mt-1">Dodawaj, edytuj role i resetuj hasła użytkowników.</p>
                    </div>
                     <button onClick={() => setAddModalOpen(true)} className="bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center">
                        Dodaj użytkownika
                    </button>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Użytkownik</th>
                                <th scope="col" className="px-6 py-3">Rola</th>
                                <th scope="col" className="px-6 py-3">Akcje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.id} className="bg-white border-b hover:bg-gray-50 animate-fadeIn" style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <img className="w-10 h-10 rounded-full" src={user.avatar} alt={user.name} />
                                            <div className="pl-3">
                                                <div className="text-base font-semibold text-dark">{user.name}</div>
                                                <div className="font-normal text-gray-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user.id, e.target.value as Role)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
                                            aria-label={`Rola dla ${user.name}`}
                                        >
                                            <option value="Admin">Admin</option>
                                            <option value="Manager">Manager</option>
                                            <option value="Pracownik">Pracownik</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button 
                                            onClick={() => handleOpenResetModal(user)}
                                            className="flex items-center text-primary hover:text-secondary font-medium"
                                            aria-label={`Resetuj hasło dla ${user.name}`}
                                            >
                                            <KeyIcon className="w-4 h-4 mr-2" />
                                            Resetuj hasło
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {isAddModalOpen && (
                <AddUserModal
                    isOpen={isAddModalOpen}
                    onClose={() => setAddModalOpen(false)}
                    onSave={handleAddUser}
                />
            )}
            
            {isResetModalOpen && selectedUser && (
                <ResetPasswordModal
                    isOpen={isResetModalOpen}
                    onClose={() => setResetModalOpen(false)}
                    onSave={handleResetPassword}
                    user={selectedUser}
                />
            )}
        </>
    );
};

export default UserManagementPage;
