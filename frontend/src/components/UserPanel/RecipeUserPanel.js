import React, { useState } from 'react';

const RecipeUserPanel = () => {
  const [formData, setFormData] = useState({
    name: '',
    photo: null,
    type: '',
    category: '',
    calories: '',
    ingredients: [],
    steps: [],
  });

  const [ingredientSegments, setIngredientSegments] = useState([
    { title: '', items: [''] },
  ]);
  const [stepSegments, setStepSegments] = useState([{ title: '', items: [''] }]);

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  // Dynamic handling for ingredient segments
  const handleAddIngredientSegment = () => {
    setIngredientSegments([...ingredientSegments, { title: '', items: [''] }]);
  };

  const handleIngredientSegmentChange = (index, value) => {
    const updatedSegments = [...ingredientSegments];
    updatedSegments[index].title = value;
    setIngredientSegments(updatedSegments);
  };

  const handleIngredientChange = (segmentIndex, itemIndex, value) => {
    const updatedSegments = [...ingredientSegments];
    updatedSegments[segmentIndex].items[itemIndex] = value;
    setIngredientSegments(updatedSegments);
  };

  const handleAddIngredientField = (segmentIndex) => {
    const updatedSegments = [...ingredientSegments];
    updatedSegments[segmentIndex].items.push('');
    setIngredientSegments(updatedSegments);
  };

  // Dynamic handling for step segments
  const handleAddStepSegment = () => {
    setStepSegments([...stepSegments, { title: '', items: [''] }]);
  };

  const handleStepSegmentChange = (index, value) => {
    const updatedSegments = [...stepSegments];
    updatedSegments[index].title = value;
    setStepSegments(updatedSegments);
  };

  const handleStepChange = (segmentIndex, itemIndex, value) => {
    const updatedSegments = [...stepSegments];
    updatedSegments[segmentIndex].items[itemIndex] = value;
    setStepSegments(updatedSegments);
  };

  const handleAddStepField = (segmentIndex) => {
    const updatedSegments = [...stepSegments];
    updatedSegments[segmentIndex].items.push('');
    setStepSegments(updatedSegments);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      ingredients: ingredientSegments,
      steps: stepSegments,
    });
    console.log('Submitting recipe:', {
      ...formData,
      ingredients: ingredientSegments,
      steps: stepSegments,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-md shadow-md max-w-4xl mx-auto">
      {/* Dodaj zdjęcie */}
      <div className="flex items-center">
        <div>
          <label className="block">Dodaj zdjęcie</label>
          <input type="file" onChange={handleFileChange} className="block mt-2" />
        </div>
        <input
          type="text"
          placeholder="Nazwa przepisu"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="ml-4 p-2 border rounded-md w-full"
        />
      </div>

      {/* Typ, kategoria, kalorie */}
      <div className="grid grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Typ"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="p-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="Kategoria"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="p-2 border rounded-md"
        />
        <input
          type="number"
          placeholder="Kalorie"
          value={formData.calories}
          onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
          className="p-2 border rounded-md"
        />
      </div>

      {/* Składniki */}
      <div>
        <h3 className="font-bold">Składniki</h3>
        {ingredientSegments.map((segment, segmentIndex) => (
          <div key={segmentIndex} className="mb-4">
            <input
              type="text"
              placeholder={`Tytuł grupy składników ${segmentIndex + 1}`}
              value={segment.title}
              onChange={(e) => handleIngredientSegmentChange(segmentIndex, e.target.value)}
              className="block mt-2 p-2 border rounded-md w-full"
            />
            {segment.items.map((item, itemIndex) => (
              <div key={itemIndex} className="flex space-x-2 mt-2">
                <input
                  type="text"
                  placeholder={`Składnik ${itemIndex + 1}`}
                  value={item}
                  onChange={(e) => handleIngredientChange(segmentIndex, itemIndex, e.target.value)}
                  className="p-2 border rounded-md w-full"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddIngredientField(segmentIndex)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Dodaj składnik
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddIngredientSegment}
          className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Dodaj nową grupę składników
        </button>
      </div>

      {/* Przebieg przepisu */}
      <div>
        <h3 className="font-bold">Przebieg przepisu</h3>
        {stepSegments.map((segment, segmentIndex) => (
          <div key={segmentIndex} className="mb-4">
            <input
              type="text"
              placeholder={`Tytuł kroku ${segmentIndex + 1}`}
              value={segment.title}
              onChange={(e) => handleStepSegmentChange(segmentIndex, e.target.value)}
              className="block mt-2 p-2 border rounded-md w-full"
            />
            {segment.items.map((item, itemIndex) => (
              <div key={itemIndex} className="flex space-x-2 mt-2">
                <input
                  type="text"
                  placeholder={`Krok ${itemIndex + 1}`}
                  value={item}
                  onChange={(e) => handleStepChange(segmentIndex, itemIndex, e.target.value)}
                  className="p-2 border rounded-md w-full"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddStepField(segmentIndex)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Dodaj krok
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddStepSegment}
          className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Dodaj nową grupę kroków
        </button>
      </div>

      {/* Zapisz przepis */}
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
        Zapisz przepis
      </button>
    </form>
  );
};

export default RecipeUserPanel;
