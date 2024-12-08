import React, { useState, useEffect } from 'react';
import axiosClient from '../../axiosClient';

const UserAdminPanel = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(10);
  
  useEffect(() => {
    axiosClient
      .get('/recipes') 
      .then((response) => {
        setRecipes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Nie udało się pobrać przepisów');
        setLoading(false);
      });
  }, []);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEditClick = (recipeId) => {
    // Logika edycji przepisu, np. otwarcie formularza edycji
    alert(`Edycja przepisu o ID: ${recipeId}`);
  };

  if (loading) {
    return <div>Ładowanie przepisów...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const totalPages = Math.ceil(recipes.length / recipesPerPage);

  return (
    <div className="flex-1 p-6 bg-light-green-100">
      <h2 className="text-lg font-bold">Przepisy</h2>

      {/* Wyświetlanie przepisów */}
      <div className="space-y-4">
        {currentRecipes.map((recipe) => (
          <div key={recipe.id} className="border p-4 rounded-md bg-white flex items-center">
            {/* Obraz */}
            {recipe.photo && (
              <img 
                src={recipe.photo} 
                alt={recipe.name} 
                className="w-32 h-32 object-cover rounded-md mr-4" // Stały rozmiar obrazu z odstępem
              />
            )}

            {/* Nazwa przepisu */}
            <h3 className="text-xl font-semibold flex-1">{recipe.name}</h3>

            {/* Przycisk do edycji */}
            <button
              onClick={() => handleEditClick(recipe.id)}
              className="px-4 py-2 bg-yellow-300 rounded-lg"
            >
              Edytuj
            </button>
          </div>
        ))}
      </div>

      {/* Paginacja */}
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
