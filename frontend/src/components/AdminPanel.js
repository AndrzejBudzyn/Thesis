import React, { useState } from 'react';
import UserAdminPanel from './AdminPanel/UsersAdminPanel';
import RecipeAdminPanel from './AdminPanel/RecipeAdminPanel';

const AdminPanel = () => {
  const [activeContent, setActiveContent] = useState('users');

  const renderContent = () => {
    switch (activeContent) {
      case 'users':
        return <UserAdminPanel />;
      case 'acceptedRecipes':
        return <RecipeAdminPanel />;
      case 'pendingRecipes':
        return <div>Treść: Przepisy do zaakceptowania</div>;
      default:
        return <div>Wybierz opcję z menu</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100"> {/* Tło i min-h-screen */}
      {/* Sidebar */}
      <aside className="bg-gray-800 w-full sm:w-64 p-4 flex flex-col"> {/* Ciemny sidebar */}
        <div className="mb-8"> {/* Margines na górze */}
          <h2 className="text-white text-2xl font-bold mb-4 text-center">Panel Admina</h2> {/* Nagłówek */}
          <button
            className={`w-full text-left py-2 px-4 mb-2 rounded-lg transition duration-300 ${
              activeContent === 'users' ? 'bg-green-500 text-white font-bold' : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
            onClick={() => setActiveContent('users')}
          >
            Użytkownicy
          </button>
          <button
            className={`w-full text-left py-2 px-4 mb-2 rounded-lg transition duration-300 ${
              activeContent === 'acceptedRecipes' ? 'bg-green-500 text-white font-bold' : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
            onClick={() => setActiveContent('acceptedRecipes')}
          >
            Przepisy zaakceptowane
          </button>
          <button
            className={`w-full text-left py-2 px-4 mb-2 rounded-lg transition duration-300 ${
              activeContent === 'pendingRecipes' ? 'bg-green-500 text-white font-bold' : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
            onClick={() => setActiveContent('pendingRecipes')}
          >
            Przepisy do zaakceptowania
          </button>
        </div>
        <div className="mt-auto"> {/* Ustawienia na dole */}
          <button className="bg-yellow-500 w-full text-center py-2 rounded-lg text-white font-bold hover:bg-yellow-600 transition duration-300">
            Ustawienia
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-50"> {/* Jaśniejsze tło */}
        <div className="container mx-auto bg-white rounded-lg shadow-md p-8"> {/* Kontener */}
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;