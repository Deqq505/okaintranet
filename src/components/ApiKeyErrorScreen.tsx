import React from 'react';

const ApiKeyErrorScreen: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 font-sans">
      <div className="w-full max-w-2xl p-8 text-center bg-white rounded-xl shadow-lg animate-scaleIn">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h1 className="mt-4 text-3xl font-bold text-dark">Błąd Konfiguracji Aplikacji</h1>
        <p className="mt-4 text-lg text-medium">
          Klucz API do usług Google Gemini nie został poprawnie skonfigurowany na serwerze.
        </p>
        <div className="mt-6 text-left bg-gray-50 p-4 rounded-lg border">
          <h2 className="font-semibold text-dark">Co robić?</h2>
          <p className="mt-2 text-sm text-gray-600">
            Administrator aplikacji musi zalogować się do panelu Vercel i dodać zmienną środowiskową o nazwie <code className="bg-gray-200 text-red-600 font-mono p-1 rounded">API_KEY</code> z prawidłową wartością klucza Google Gemini API.
          </p>
        </div>
        <p className="mt-6 text-sm text-gray-400">
          Aplikacja nie będzie działać, dopóki ten problem nie zostanie rozwiązany.
        </p>
      </div>
    </div>
  );
};

export default ApiKeyErrorScreen;
