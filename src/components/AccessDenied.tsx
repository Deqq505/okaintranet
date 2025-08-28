import React from 'react';
import Card from './ui/Card';

const AccessDenied: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-full">
            <Card className="text-center max-w-lg">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16 text-primary mx-auto mb-4">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                 </svg>
                <h2 className="text-2xl font-bold text-dark">Brak dostępu</h2>
                <p className="mt-2 text-medium">
                    Nie masz uprawnień do przeglądania tej strony. Skontaktuj się z administratorem, jeśli uważasz, że to pomyłka.
                </p>
            </Card>
        </div>
    );
};

export default AccessDenied;
