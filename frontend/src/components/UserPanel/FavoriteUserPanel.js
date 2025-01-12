import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axiosClient from "../../axiosClient";

const FavoriteUserPanel = () => {
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook do nawigacji

  const itemsPerPage = 10;

  // Fetch favorites on component mount
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const { data } = await axiosClient.get("/getUserFavorites"); // API route to fetch favorites
        setFavorites(data);
      } catch (err) {
        console.error(err);
        setError("Nie udało się pobrać listy ulubionych.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = favorites.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(favorites.length / itemsPerPage);

  if (loading) {
    return <p className="text-gray-600">Ładowanie ulubionych...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  // Funkcja formatLink do tworzenia odpowiedniego linku
  const formatLink = (name, id) => {
    const formattedName = name.replace(/\s+/g, "_");
    return `/recipe/${id}/${formattedName}`;
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Ulubione</h2>
      {favorites.length === 0 ? (
        <p className="text-gray-600">Nie masz jeszcze ulubionych elementów.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {paginatedItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center bg-gray-100 rounded-lg p-4 shadow-md cursor-pointer"
                onClick={() => navigate(formatLink(item.name, item.id))} // Nawigacja po kliknięciu
              >
                <div className="w-16 h-16 mr-4 rounded-lg overflow-hidden">
                  <img
                    src={item.photo || "https://via.placeholder.com/150"}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-lg font-medium text-gray-800">{item.name}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
            >
              Prev
            </button>
            <span className="text-lg">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default FavoriteUserPanel;
