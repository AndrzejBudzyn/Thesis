import React, { useState } from 'react';

const ShopListUserPanel = () => {
  const items = Array.from({ length: 30 }, (_, i) => ({
    name: `Produkt ${i + 1}`,
    progress: Math.floor(Math.random() * 101), // Losowy procent ukończenia dla każdego produktu
  }));
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Listy zakupów</h2>
      <ul className="space-y-2">
        {paginatedItems.map((item, index) => (
          <li key={index} className="flex justify-between items-center p-3 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition">
            <div className="flex-1">
              <span>{item.name}</span>
              <div className="mt-1">
                <span className="text-sm text-gray-500">Progress: {item.progress}%</span>
              </div>
            </div>
            {/* Pasek postępu */}
            <div className="ml-3 w-24 h-2 bg-gray-300 rounded-full">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>
            {/* Przycisk na końcu */}
            <button className="ml-3 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition">
              Button
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex justify-center items-center space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-600 transition"
        >
          Prev
        </button>
        <span className="text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-600 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ShopListUserPanel;
