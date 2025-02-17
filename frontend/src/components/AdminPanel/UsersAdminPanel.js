import React, { useState, useEffect } from 'react';
import axiosClient from '../../axiosClient';

const UserAdminPanel = () => {
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10); 

  useEffect(() => {
    axiosClient
      .get('/users') 
      .then((response) => {
        setUsers(response.data); 
        setLoading(false); 
      })
      .catch((error) => {
        setError('Nie udało się pobrać użytkowników');
        setLoading(false); 
      });
  }, []);


  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handleChangeStatus = (userId) => {
    console.log(`Zmieniono status dla użytkownika ${userId}`);
  };

 
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Ładowanie użytkowników...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="flex-1 p-6 bg-light-green-100">
      <h2>Użytkownicy</h2>
      
      <div className="space-y-4">
        {currentUsers.map((user) => (
          <div key={user.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
            <div>
              <p>ID: {user.id}</p> 
              <p>Imię: {user.name}</p> 
            </div>
            <button
              onClick={() => handleChangeStatus(user.id)} 
              className="bg-yellow-300 py-2 px-4 rounded-lg"
            >
              Zmień status
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-yellow-300 rounded-lg disabled:opacity-50"
        >
          Poprzednia
        </button>
        <span className="px-4 py-2">{`Strona ${currentPage} z ${totalPages}`}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-yellow-300 rounded-lg disabled:opacity-50"
        >
          Następna
        </button>
      </div>
    </div>
  );
};

export default UserAdminPanel;
