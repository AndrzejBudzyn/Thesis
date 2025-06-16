import React, { useState, useEffect } from 'react';
import axiosClient from "../../axiosClient";
import { useNavigate } from 'react-router-dom';

const ToDoUserPanel = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const { data } = await axiosClient.get("/getUserToDo");
        setItems(data);
      } catch (err) {
        console.error(err);
        setError("Nie udało się pobrać listy do zrobienia.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const formatLink = (name, id) => {
    const formattedName = name.replace(/\s+/g, "_");
    return `/recipe/${id}/${formattedName}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full"> {/* Centrowanie loadingu */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>; // Centrowanie erroru
  }

  return (
    <div className="p-6"> {/* Dodany padding dookoła */}
      <h2 className="text-2xl font-semibold mb-4 text-center">Do zrobienia</h2> {/* Wyśrodkowany tytuł */}
      {items.length === 0 ? (
        <p className="text-gray-600 text-center">Nie masz jeszcze żadnych rzeczy do zrobienia.</p> 
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {paginatedItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition duration-300 hover:scale-105" // Dodano style
                onClick={() => navigate(formatLink(item.name, item.id))}
              >
                <img
                  src={item.photo || "https://via.placeholder.com/150"}
                  alt={item.name}
                  className="w-full h-48 object-cover" // Ustalamy wysokość obrazka
                />
                <div className="p-4"> {/* Dodany padding do opisu */}
                  <div className="font-medium text-gray-800 line-clamp-2">{item.name}</div> {/* Ograniczenie tekstu */}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400 transition duration-300 hover:bg-blue-600" // Dodano style
            >
              Poprzednia
            </button>
            <span className="text-lg">
              Strona {currentPage} z {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400 transition duration-300 hover:bg-blue-600" // Dodano style
            >
              Następna
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ToDoUserPanel;