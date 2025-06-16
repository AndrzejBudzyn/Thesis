import React, { useState } from 'react';

const ShopListUserPanel = () => {
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      name: 'Placki Ziemniaczne',
      ingredients: [
        { name: 'Ziemniaki 500 g', checked: false },
        { name: 'Cebula 1 szt.', checked: false },
        { name: 'Jajko 1 szt.', checked: false },
        { name: 'Mąka pszenna 2 łyżki', checked: false },
        { name: 'Sól 3 g', checked: false },
        { name: 'Pieprz 3 g', checked: false },
        { name: 'Olej do smażenia 100 ml', checked: false },
      ],
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1; // Display only 1 recipe per page for simplicity
  const [isRecipeVisible, setIsRecipeVisible] = useState(false);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = recipes.slice(startIndex, startIndex + itemsPerPage);

  const totalPages = Math.ceil(recipes.length / itemsPerPage);

  // Handle the checking/unchecking of ingredients
  const handleCheckboxChange = (recipeId, ingredientName) => {
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === recipeId
        ? {
            ...recipe,
            ingredients: recipe.ingredients.map((ingredient) =>
              ingredient.name === ingredientName
                ? { ...ingredient, checked: !ingredient.checked }
                : ingredient
            ),
          }
        : recipe
    );
    setRecipes(updatedRecipes); // Set the updated recipes state
  };

  const toggleRecipeVisibility = () => {
    setIsRecipeVisible(!isRecipeVisible);
  };

  // Sort ingredients, checked ones go to the bottom
  const sortedIngredients = paginatedItems[0]?.ingredients
    ? [...paginatedItems[0].ingredients].sort((a, b) => a.checked - b.checked)
    : [];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Listy zakupów</h2>

      {/* Render Recipe List */}
      <ul className="space-y-2">
        {paginatedItems.map((recipe) => (
          <li
            key={recipe.id}
            className="flex justify-between items-center p-3 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition"
          >
            <div className="flex-1">
              <h3 className="font-semibold">{recipe.name}</h3>
            </div>
            {/* Button to toggle ingredients visibility */}
            <button
              onClick={toggleRecipeVisibility}
              className="ml-3 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition"
            >
              {isRecipeVisible ? 'Ukryj listę' : 'Pokaż listę'}
            </button>
          </li>
        ))}
      </ul>

      {/* Ingredients List for Selected Recipe */}
      {isRecipeVisible && paginatedItems.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Składniki na {paginatedItems[0].name}</h3>
          <ul className="space-y-2">
            {sortedIngredients.map((ingredient) => (
              <li
                key={ingredient.name}
                className="flex items-center p-2 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition"
              >
                <input
                  type="checkbox"
                  checked={ingredient.checked}
                  onChange={() =>
                    handleCheckboxChange(paginatedItems[0].id, ingredient.name)
                  }
                  className="mr-2"
                />
                <span className={ingredient.checked ? 'line-through text-gray-500' : ''}>
                  {ingredient.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Pagination */}
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
