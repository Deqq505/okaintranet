import React, { useState } from 'react';
import type { User } from '../types';
import { OKA_LOGO_BASE64 } from '../constants';

interface LoginPageProps {
  users: User[];
  onLogin: (userId: number, password: string) => boolean;
}

const FingerprintIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 12a3 3 0 0 0-3 3"/><path d="M18.5 12a6.5 6.5 0 0 0-13 0"/><path d="M5 18.5a8.5 8.5 0 0 0 14 0"/><path d="M2 12h.01"/><path d="M22 12h-.01"/><path d="M12 2v.01"/><path d="M12 22v-.01"/><path d="M7 4.5a5.56 5.56 0 0 1 10 0"/>
    </svg>
);


const LoginPage: React.FC<LoginPageProps> = ({ users, onLogin }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    setError('');
    const success = onLogin(selectedUser.id, password);
    if (!success) {
      setError('Nieprawidłowe hasło.');
    }
  };

  const handleBiometricLogin = async () => {
    if (!selectedUser) return;
    setError('');
    
    // Check if WebAuthn is supported
    if (!navigator.credentials || !navigator.credentials.get) {
        setError("Twoja przeglądarka nie wspiera logowania biometrycznego.");
        return;
    }

    try {
        // This is a simplified, insecure simulation. A real implementation
        // requires a server-generated, unique challenge for each login.
        const challenge = new Uint8Array(32);
        window.crypto.getRandomValues(challenge);

        const credential = await navigator.credentials.get({
            publicKey: {
                challenge,
                allowCredentials: [], // In a real app, you'd provide stored credential IDs for the user.
                timeout: 60000,
                userVerification: 'preferred',
            }
        });

        if (credential) {
            // In a real app, you'd send the credential object to the server for verification.
            // Here, we simulate a successful verification by logging the user in with their known password.
            const success = onLogin(selectedUser.id, selectedUser.password);
            if (!success) {
                 setError('Wystąpił nieoczekiwany błąd logowania.');
            }
        } else {
            setError('Nie udało się uzyskać poświadczeń biometrycznych.');
        }
    } catch (err) {
        console.error('Biometric login error:', err);
        const errMessage = (err as Error).name === 'NotAllowedError' 
            ? 'Logowanie biometryczne anulowane.'
            : 'Logowanie biometryczne nie powiodło się.';
        setError(errMessage);
    }
  };

  if (!selectedUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-2xl p-8 text-center bg-white rounded-xl shadow-lg animate-scaleIn">
          <img src={OKA_LOGO_BASE64} alt="OKA S.C. Logo" className="w-20 h-auto mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-dark">Wybierz swoje konto</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8">
            {users.map(user => (
              <div key={user.id} onClick={() => setSelectedUser(user)} className="cursor-pointer group flex flex-col items-center p-4 rounded-lg hover:bg-gray-100 transition-colors">
                <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full object-cover transition-transform group-hover:scale-105" />
                <p className="mt-3 font-semibold text-dark text-center">{user.name}</p>
                <p className="text-xs text-medium text-center">{user.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="relative w-full max-w-sm p-8 space-y-4 bg-white rounded-xl shadow-lg animate-scaleIn">
        <button onClick={() => { setSelectedUser(null); setError(''); setPassword(''); }} className="absolute top-3 left-3 text-gray-500 hover:text-primary transition-colors p-2 rounded-full">
            &#x2190; Wróć
        </button>
        <div className="text-center pt-8">
            <img src={selectedUser.avatar} alt={selectedUser.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
            <h2 className="text-xl font-bold text-dark">{selectedUser.name}</h2>
            <p className="text-medium">{selectedUser.title}</p>
        </div>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label htmlFor="password"className="sr-only">Hasło</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Hasło"
              autoFocus
            />
          </div>
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          <div className="flex flex-col space-y-3">
             <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              Zaloguj się
            </button>
             <button
              type="button"
              onClick={handleBiometricLogin}
              className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-dark bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 transform active:scale-95"
            >
              <FingerprintIcon className="h-5 w-5 mr-2 text-medium" />
              Użyj biometrii
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;