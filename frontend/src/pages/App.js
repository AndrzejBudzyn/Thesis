import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import axiosClient from "../axiosClient";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [ingredientSearchQuery, setIngredientSearchQuery] = useState("");
  const [excludedIngredientSearchQuery, setExcludedIngredientSearchQuery] = useState("");
  const [kitchenSearchQuery, setKitchenSearchQuery] = useState("");
  const [excludedIngredients, setExcludedIngredients] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    kitchen: "",
    ingredients: [],
    foodPreferences: "",
    minCalories: "",
    maxCalories: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6;

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get("/recipes")
      .then(({ data }) => {
        setRecipes(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch recipes. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  const formatLink = (name, id) => {
    const formattedName = name.replace(/\s+/g, "_");
    return `/recipe/${id}/${formattedName}`;
  };

  const uniqueTypes = [...new Set(recipes.map((r) => r.type))];
  const uniqueKitchens = [...new Set(recipes.map((r) => r.kitchen))].filter((kitchen) =>
    kitchen.toLowerCase().includes(kitchenSearchQuery.toLowerCase())
  );
  const uniqueIngredients = [...new Set(
    recipes.flatMap((r) =>
      JSON.parse(r.ingredients).map((ing) => ing.ingredient).filter(Boolean)
    )
  )].sort();

  const uniqueFoodPreferences = [...new Set(recipes.map((r) => r.foodPreferences))];

  const filteredRecipes = recipes.filter((recipe) => {
    const recipeIngredients = JSON.parse(recipe.ingredients).map((i) => i.ingredient);

    const matchesType = filters.type ? recipe.type === filters.type : true;
    const matchesKitchen = filters.kitchen ? recipe.kitchen === filters.kitchen : true;
    const matchesIngredients = filters.ingredients.length > 0
      ? filters.ingredients.every((ing) => recipeIngredients.includes(ing))
      : true;
    const matchesExcludedIngredients = excludedIngredients.length > 0
      ? !excludedIngredients.some((ing) => recipeIngredients.includes(ing))
      : true;
    const matchesFoodPreferences = filters.foodPreferences
      ? recipe.foodPreferences === filters.foodPreferences
      : true;
    const matchesCalories =
      (filters.minCalories === "" || recipe.calories >= filters.minCalories) &&
      (filters.maxCalories === "" || recipe.calories <= filters.maxCalories);

    const matchesSearchQuery = recipe.name.toLowerCase().includes(searchQuery.toLowerCase());

    return (
      matchesType &&
      matchesKitchen &&
      matchesIngredients &&
      matchesExcludedIngredients &&
      matchesFoodPreferences &&
      matchesSearchQuery &&
      matchesCalories
    );
  });

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: prev[filterName] === value ? "" : value,
    }));
  };

  const toggleIngredientFilter = (ingredient) => {
    setFilters((prev) => ({
      ...prev,
      ingredients: prev.ingredients.includes(ingredient)
        ? prev.ingredients.filter((ing) => ing !== ingredient)
        : [...prev.ingredients, ingredient],
    }));
  };

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex flex-row flex-1 p-6 lg:p-10 pt-20 bg-gray-100">
        <aside className="w-full lg:w-1/4 border border-gray-300 rounded-lg p-4 bg-white shadow-md">
          <h2 className="text-lg font-semibold mb-4">Filtry</h2>
          <div>
            {/* Typ dania */}
            <details className="mb-4">
              <summary className="cursor-pointer font-semibold">Typ dania</summary>
              <ul className="mt-2">
                {uniqueTypes.map((type) => (
                  <li key={type}>
                    <button
                      onClick={() => handleFilterChange("type", type)}
                      className={`block px-4 py-2 w-full text-left ${
                        filters.type === type ? "bg-gray-300" : ""
                      }`}
                    >
                      {type}
                    </button>
                  </li>
                ))}
              </ul>
            </details>

            {/* Kuchnia */}
            <details className="mb-4">
              <summary className="cursor-pointer font-semibold">Kuchnia</summary>
              <div className="mt-2">
                <input
                  type="text"
                  value={kitchenSearchQuery}
                  onChange={(e) => setKitchenSearchQuery(e.target.value)}
                  placeholder="Wyszukaj kuchnię..."
                  className="p-2 mb-2 border border-black w-full rounded"
                />
                <ul className="h-40 overflow-y-scroll border border-gray-200 rounded">
                  {uniqueKitchens.map((kitchen) => (
                    <li key={kitchen}>
                      <button
                        onClick={() => handleFilterChange("kitchen", kitchen)}
                        className={`block px-4 py-2 w-full text-left ${
                          filters.kitchen === kitchen ? "bg-gray-300" : ""
                        }`}
                      >
                        {kitchen}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </details>

            {/* Składniki */}
            <details>
              <summary className="cursor-pointer font-semibold">Składniki</summary>
              <div className="mt-2">
                <input
                  type="text"
                  value={ingredientSearchQuery}
                  onChange={(e) => setIngredientSearchQuery(e.target.value)}
                  placeholder="Wyszukaj składnik..."
                  className="p-2 mb-2 border border-black w-full rounded"
                />
                <ul className="h-40 overflow-y-scroll border border-gray-200 rounded">
                  {uniqueIngredients
                    .filter((ingredient) =>
                      ingredient.toLowerCase().includes(ingredientSearchQuery.toLowerCase())
                    )
                    .map((ingredient) => (
                      <li key={ingredient}>
                        <label className="block px-4 py-2">
                          <input
                            type="checkbox"
                            checked={filters.ingredients.includes(ingredient)}
                            onChange={() => toggleIngredientFilter(ingredient)}
                          />
                          <span className="ml-2">{ingredient}</span>
                        </label>
                      </li>
                    ))}
                </ul>
              </div>
            </details>

            {/* Unikaj składników */}
            <details className="mt-4">
              <summary className="cursor-pointer font-semibold">Unikaj składników</summary>
              <div className="mt-2">
                <input
                  type="text"
                  value={excludedIngredientSearchQuery}
                  onChange={(e) => setExcludedIngredientSearchQuery(e.target.value)}
                  placeholder="Wyszukaj składnik do unikania..."
                  className="p-2 mb-2 border border-black w-full rounded"
                />
                <ul className="h-40 overflow-y-scroll border border-gray-200 rounded">
                  {uniqueIngredients
                    .filter((ingredient) =>
                      ingredient.toLowerCase().includes(excludedIngredientSearchQuery.toLowerCase())
                    )
                    .map((ingredient) => (
                      <li key={ingredient}>
                        <label className="block px-4 py-2">
                          <input
                            type="checkbox"
                            checked={excludedIngredients.includes(ingredient)}
                            onChange={() =>
                              setExcludedIngredients((prev) =>
                                prev.includes(ingredient)
                                  ? prev.filter((ing) => ing !== ingredient)
                                  : [...prev, ingredient]
                              )
                            }
                          />
                          <span className="ml-2">{ingredient}</span>
                        </label>
                      </li>
                    ))}
                </ul>
              </div>
            </details>

            {/* Preferencje żywieniowe */}
            <details>
              <summary className="cursor-pointer font-semibold">Preferencje żywieniowe</summary>
              <ul className="mt-2">
                {uniqueFoodPreferences.map((preference) => (
                  <li key={preference}>
                    <button
                      onClick={() => handleFilterChange("foodPreferences", preference)}
                      className={`block px-4 py-2 w-full text-left ${
                        filters.foodPreferences === preference ? "bg-gray-300" : ""
                      }`}
                    >
                      {preference}
                    </button>
                  </li>
                ))}
              </ul>
            </details>

            {/* Kalorie */}
            <details className="mb-4">
              <summary className="cursor-pointer font-semibold">Kalorie</summary>
              <div className="mt-2">
                <input
                  type="number"
                  value={filters.minCalories}
                  onChange={(e) => handleFilterChange("minCalories", e.target.value)}
                  placeholder="Min kalorie"
                  className="p-2 mb-2 border border-black w-full rounded"
                />
                <input
                  type="number"
                  value={filters.maxCalories}
                  onChange={(e) => handleFilterChange("maxCalories", e.target.value)}
                  placeholder="Max kalorie"
                  className="p-2 mb-2 border border-black w-full rounded"
                />
              </div>
            </details>
          </div>
        </aside>

        {/* Lista przepisów */}
        <section className="flex flex-col flex-1 px-4 lg:px-6">
          <div className="flex items-center mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Wyszukaj przepis..."
              className="flex-grow p-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex-1 border border-gray-300 rounded-lg overflow-y-auto bg-white shadow-md">
            {loading ? (
              <div className="text-center p-4">Ładowanie...</div>
            ) : error ? (
              <p className="text-center text-red-500 p-4">{error}</p>
            ) : currentRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {currentRecipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="border border-gray-200 rounded-lg shadow-sm bg-white cursor-pointer hover:shadow-md transition duration-200"
                    onClick={() => navigate(formatLink(recipe.name, recipe.id))}
                  >
                    <img
                      src={recipe.photo}
                      alt={recipe.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2">{recipe.name}</h3>
                      <p className="text-sm text-gray-600">
                        {recipe.kitchen} | {recipe.type}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        <strong>Preferencje:</strong> {recipe.foodPreferences}
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>Kalorie:</strong> {recipe.calories} kcal
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center p-4">Brak wyników</p>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2 disabled:bg-gray-300"
            >
              Prev
            </button>
            <span className="px-4 py-2">{currentPage} / {totalPages}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2 disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </section>
      </main>

      <footer className="h-12 bg-gray-800 text-center text-white flex items-center justify-center">
        © 2024 PrzepiSearch
      </footer>
    </div>
  );
};

export default App;
