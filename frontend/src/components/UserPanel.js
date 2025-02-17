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
        return <ToDoUserPanel/>;
      case 'listyZakupow':
        return <ShopListUserPanel/>;
      case 'ulubione':
        return <FavoriteUserPanel/>;
      case 'historia':
        return <HistoryUserPanel/>;
      case 'dodajPrzepis':
        return < RecipeUserPanel/>;
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
