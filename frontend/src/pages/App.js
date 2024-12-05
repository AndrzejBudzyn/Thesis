import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import axiosClient from "../axiosClient";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [ingredientSearchQuery, setIngredientSearchQuery] = useState("");
  const [kitchenSearchQuery, setKitchenSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    type: "",
    kitchen: "",
    ingredients: [],
    foodPreferences: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    axiosClient
      .get("/recipes")
      .then(({ data }) => {
        setRecipes(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch recipes. Please try again later.");
      });
  }, []);

      const formatLink = (name, id) => {
        const formattedName = name.replace(/\s+/g, "_");
        return `/recipe/${id}/${formattedName}`;
      };

  const uniqueTypes = [...new Set(recipes.map((r) => r.type))];
  const uniqueKitchens = [
    ...new Set(recipes.map((r) => r.kitchen)),
  ].filter((kitchen) =>
    kitchen.toLowerCase().includes(kitchenSearchQuery.toLowerCase())
  );
  const uniqueIngredients = [
    ...new Set(
      recipes.flatMap((r) =>
        JSON.parse(r.ingredients).map((ing) => ing.ingredient)
      )
    ),
  ].filter((ingredient) =>
    ingredient.toLowerCase().includes(ingredientSearchQuery.toLowerCase())
  );
  const uniqueFoodPreferences = [
    ...new Set(recipes.map((r) => r.foodPreferences)),
  ];

 
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesType = filters.type ? recipe.type === filters.type : true;
    const matchesKitchen = filters.kitchen
      ? recipe.kitchen === filters.kitchen
      : true;
    const matchesIngredients =
      filters.ingredients.length > 0
        ? filters.ingredients.every((ing) =>
            JSON.parse(recipe.ingredients).some(
              (rIng) => rIng.ingredient === ing
            )
          )
        : true;
    const matchesFoodPreferences = filters.foodPreferences
      ? recipe.foodPreferences === filters.foodPreferences
      : true;

    const matchesSearchQuery = recipe.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return (
      matchesType &&
      matchesKitchen &&
      matchesIngredients &&
      matchesFoodPreferences &&
      matchesSearchQuery
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

  return (
    <div className="flex flex-col h-screen bg-green-100">
      <Header />
      <main className="flex flex-row flex-1 p-10 pt-20">
       
        <aside className="w-1/4 border border-black p-4">
          <h2 className="text-lg font-semibold mb-4">Filtry</h2>
          <div>
          
            <details className="mb-4">
              <summary className="cursor-pointer font-semibold">
                Typ dania
              </summary>
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

       
            <details className="mb-4">
              <summary className="cursor-pointer font-semibold">
                Kuchnia
              </summary>
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

           
            <details>
              <summary className="cursor-pointer font-semibold">
                Składniki
              </summary>
              <div className="mt-2">
                <input
                  type="text"
                  value={ingredientSearchQuery}
                  onChange={(e) => setIngredientSearchQuery(e.target.value)}
                  placeholder="Wyszukaj składnik..."
                  className="p-2 mb-2 border border-black w-full rounded"
                />
                <ul className="h-40 overflow-y-scroll border border-gray-200 rounded">
                  {uniqueIngredients.map((ingredient) => (
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

           
            <details>
              <summary className="cursor-pointer font-semibold">
                Preferencje żywieniowe
              </summary>
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
          </div>
        </aside>

    
        <section className="flex flex-col flex-1 px-4">
        
          <div className="flex items-center mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Wyszukaj przepis..."
              className="flex-grow p-2 border border-black rounded-l"
            />
          </div>

         
          <div className="flex-1 border border-black overflow-y-scroll">
            {error ? (
              <p className="text-center text-red-500 p-4">{error}</p>
            ) : filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe) => (
                <div
              key={recipe.id}
              className="p-4 border-b border-gray-300 flex items-center cursor-pointer"
              onClick={() => navigate(formatLink(recipe.name, recipe.id))}
            >

                <img
                  src={recipe.photo}
                  alt={recipe.name}
                  className="w-16 h-16 mr-4 object-cover rounded"
                />
                <div>
                  <h3 className="font-bold text-lg">{recipe.name}</h3>
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
              ))
            ) : (
              <p className="text-center p-4">Brak wyników</p>
            )}
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
