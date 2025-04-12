import React, { useState } from 'react';

const HistoryUserPanel = () => {
  const items = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    name: `Historia ${i + 1}`,
    image: `https://via.placeholder.com/150?text=Historia+${i + 1}`
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <div className="p-6"> {/* Dodany padding dookoła */}
      <h2 className="text-2xl font-semibold mb-4 text-center">Historia</h2> {/* Wyśrodkowany tytuł */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {paginatedItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:scale-105" // Dodano style
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover" // Ustalamy wysokość obrazka
            />
            <div className="p-4 flex flex-col"> {/* Dodany padding i flex column */}
              <div className="font-medium text-gray-800 line-clamp-2 mb-2">{item.name}</div> {/* Ograniczenie tekstu i margines */}
              <button className="bg-blue-500 text-white rounded-lg py-2 px-4 text-sm hover:bg-blue-600 transition self-start"> {/* Dodano style i wyrównanie */}
                View
              </button>
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
    </div>
  );
};

export default HistoryUserPanel;