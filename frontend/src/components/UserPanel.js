import React, { useState } from 'react';
import RecipeUserPanel from './UserPanel/RecipeUserPanel';
import ToDoUserPanel from './UserPanel/ToDoUserPanel';
import ShopListUserPanel from './UserPanel/ShopListUserPanel';
import HistoryUserPanel from './UserPanel/HistoryUserPanel';
import FavoriteUserPanel from './UserPanel/FavoriteUserPanel';

const UserProfile = () => {
  const [activeContent, setActiveContent] = useState('doZrobienia');

  const renderContent = () => {
    switch (activeContent) {
      case 'doZrobienia':
        return <ToDoUserPanel />;
      case 'listyZakupow':
        return <ShopListUserPanel />;
      case 'ulubione':
        return <FavoriteUserPanel />;
      case 'historia':
        return <HistoryUserPanel />;
      case 'dodajPrzepis':
        return <RecipeUserPanel />;
      default:
        return <div>Wybierz opcję z menu</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100"> {/* Zmiana tła i min-h-screen */}
      {/* Sidebar */}
      <aside className="bg-gray-800 w-64 p-4 flex flex-col"> {/* Ciemniejszy sidebar */}
        <div className="mb-8"> {/* Dodany margines na górze */}
          <h2 className="text-white text-2xl font-bold mb-4 text-center">Menu</h2> {/* Nagłówek menu */}
          <button
            className={`w-full text-left py-2 px-4 mb-2 rounded-lg transition duration-300 ${
              activeContent === 'doZrobienia'? 'bg-green-500 text-white font-bold': 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
            onClick={() => setActiveContent('doZrobienia')}
          >
            Do zrobienia
          </button>
          <button
            className={`w-full text-left py-2 px-4 mb-2 rounded-lg transition duration-300 ${
              activeContent === 'listyZakupow'? 'bg-green-500 text-white font-bold': 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
            onClick={() => setActiveContent('listyZakupow')}
          >
            Listy zakupów
          </button>
          <button
            className={`w-full text-left py-2 px-4 mb-2 rounded-lg transition duration-300 ${
              activeContent === 'ulubione'? 'bg-green-500 text-white font-bold': 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
            onClick={() => setActiveContent('ulubione')}
          >
            Ulubione
          </button>
          <button
            className={`w-full text-left py-2 px-4 mb-2 rounded-lg transition duration-300 ${
              activeContent === 'historia'? 'bg-green-500 text-white font-bold': 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
            onClick={() => setActiveContent('historia')}
          >
            Historia
          </button>
          <button
            className={`w-full text-left py-2 px-4 mb-2 rounded-lg transition duration-300 ${
              activeContent === 'dodajPrzepis'? 'bg-green-500 text-white font-bold': 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
            onClick={() => setActiveContent('dodajPrzepis')}
          >
            Dodaj przepis
          </button>
        </div>
        <div className="mt-auto"> {/* Przeniesiono ustawienia na dół */}
          <button className="bg-yellow-500 w-full text-center py-2 rounded-lg text-white font-bold hover:bg-yellow-600 transition duration-300">
            Ustawienia
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-50"> {/* Jaśniejsze tło, tag <main> */}
        <div className="container mx-auto bg-white rounded-lg shadow-md p-8"> {/* Dodany kontener */}
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default UserProfile;