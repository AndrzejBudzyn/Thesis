import React, { useState } from 'react';

const FavoriteUserPanel = () => {
  const items = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Ulubione ${i + 1}`,
    image: `https://via.placeholder.com/150?text=Ulubione+${i + 1}`
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Ulubione</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {paginatedItems.map((item) => (
          <div key={item.id} className="flex items-center bg-gray-100 rounded-lg p-4 shadow-md">
            <div className="w-16 h-16 mr-4 rounded-lg overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="text-lg font-medium text-gray-800">{item.name}</div>
            <button className="ml-auto px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition">
              View
            </button>
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
    </div>
  );
};

export default FavoriteUserPanel;
