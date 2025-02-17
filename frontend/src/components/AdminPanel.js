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
        return <RecipeAdminPanel/>;
      case 'pendingRecipes':
        return <div>Treść: Przepisy do zaakceptowania</div>;
      default:
        return <div>Wybierz opcję z menu</div>;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row h-full bg-yellow-100">
      {/* Sidebar */}
      <div className="bg-brown-200 w-full sm:w-64 p-4 flex flex-col items-center">
        <button
          className="bg-yellow-300 w-full text-center py-2 mb-2 rounded-lg"
          onClick={() => setActiveContent('users')}
        >
          Użytkownicy
        </button>
        <button
          className="bg-yellow-300 w-full text-center py-2 mb-2 rounded-lg"
          onClick={() => setActiveContent('acceptedRecipes')}
        >
          Przepisy zaakceptowane
        </button>
        <button
          className="bg-yellow-300 w-full text-center py-2 mb-2 rounded-lg"
          onClick={() => setActiveContent('pendingRecipes')}
        >
          Przepisy do zaakceptowania
        </button>
        <div className="mt-auto">
          <button className="bg-yellow-300 w-full text-center py-2 mb-2 rounded-full">
            Ustawienia
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 bg-light-green-100 flex flex-col items-center">
        <div className="w-full max-w-3xl">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
