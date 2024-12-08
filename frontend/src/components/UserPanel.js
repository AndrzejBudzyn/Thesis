import React, { useState } from 'react';

const UserProfile = () => {
 
  const [activeContent, setActiveContent] = useState('doZrobienia');

 
  const renderContent = () => {
    switch (activeContent) {
      case 'doZrobienia':
        return <div>Treść: Do zrobienia</div>;
      case 'listyZakupow':
        return <div>Treść: Listy zakupów</div>;
      case 'ulubione':
        return <div>Treść: Ulubione</div>;
      case 'historia':
        return <div>Treść: Historia</div>;
      case 'dodajPrzepis':
        return <div>Treść: Dodaj przepis</div>;
      default:
        return <div>Wybierz opcję z menu</div>;
    }
  };

  return (
    <div className="flex h-screen bg-yellow-100">
      {/* Sidebar */}
      <div className="bg-brown-200 w-64 p-4 flex flex-col items-center">
        <button
          className="bg-yellow-300 w-full text-center py-2 mb-2 rounded-lg"
          onClick={() => setActiveContent('doZrobienia')}
        >
          Do zrobienia
        </button>
        <button
          className="bg-yellow-300 w-full text-center py-2 mb-2 rounded-lg"
          onClick={() => setActiveContent('listyZakupow')}
        >
          Listy zakupów
        </button>
        <button
          className="bg-yellow-300 w-full text-center py-2 mb-2 rounded-lg"
          onClick={() => setActiveContent('ulubione')}
        >
          Ulubione
        </button>
        <button
          className="bg-yellow-300 w-full text-center py-2 mb-2 rounded-lg"
          onClick={() => setActiveContent('historia')}
        >
          Historia
        </button>
        <button
          className="bg-yellow-300 w-full text-center py-2 mb-2 rounded-lg"
          onClick={() => setActiveContent('dodajPrzepis')}
        >
          Dodaj przepis
        </button>
        <div className="mt-auto">
          <button className="bg-yellow-300 w-full text-center py-2 mb-2 rounded-full">
            Ustawienia
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 bg-light-green-100">
        {renderContent()}
      </div>
    </div>
  );
};

export default UserProfile;
