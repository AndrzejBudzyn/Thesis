import React, { useState } from 'react';
import axiosClient from '../../axiosClient';

const RecipeUserPanel = () => {
  const [formData, setFormData] = useState({
    name: '',
    photo: null,
    type: '',
    calories: '',
    kitchen: '',
    foodPreferences: '',
  });

  const [ingredientSegments, setIngredientSegments] = useState([
    { title: '', items: [{ name: '', quantity: '', unit: '' }] },
  ]);
  const [stepSegments, setStepSegments] = useState([{ title: '', items: [''] }]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const types = ['Śniadanie', 'Obiad', 'Kolacja', 'Deser'];
  const kitchens = ['Polska', 'Włoska', 'Francuska', 'Chińska', 'Amerykańska'];
  const foodPreferences = ['Classic','Vegetarian','Vegan','Semi-Vegetarian'];
  const units = ['g', 'kg', 'ml', 'l', 'szt.'];

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleAddIngredientSegment = () => {
    setIngredientSegments([
      ...ingredientSegments,
      { title: '', items: [{ name: '', quantity: '', unit: '' }] },
    ]);
  };

  const handleIngredientSegmentChange = (index, value) => {
    const updatedSegments = [...ingredientSegments];
    updatedSegments[index].title = value;
    setIngredientSegments(updatedSegments);
  };

  const handleIngredientChange = (segmentIndex, itemIndex, field, value) => {
    const updatedSegments = [...ingredientSegments];
    updatedSegments[segmentIndex].items[itemIndex][field] = value;
    setIngredientSegments(updatedSegments);
  };

  const handleAddIngredientField = (segmentIndex) => {
    const updatedSegments = [...ingredientSegments];
    updatedSegments[segmentIndex].items.push({ name: '', quantity: '', unit: '' });
    setIngredientSegments(updatedSegments);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const data = new FormData();
    data.append('name', formData.name);
    if (formData.photo) {
      data.append('photo', formData.photo);
    }
    data.append('type', formData.type);
    data.append('calories', parseInt(formData.calories, 10));
    data.append('kitchen', formData.kitchen || '');
    data.append('foodPreferences', formData.foodPreferences || '');

    const formattedIngredients = ingredientSegments.map((segment) => ({
      title: segment.title || null,
      items: segment.items.map((item) => item.name || null),
    }));
    data.append('ingredients', JSON.stringify(formattedIngredients));

    const formattedPreparation = stepSegments.map((segment) => ({
      title: segment.title || null,
      items: segment.items.map((step) => step || null),
    }));
    data.append('preparation', JSON.stringify(formattedPreparation));

    try {
      const response = await axiosClient.post('/addrecipe', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('Przepis został zapisany pomyślnie!');
      setFormData({
        name: '',
        photo: null,
        type: '',
        calories: '',
        kitchen: '',
        foodPreferences: '',
      });
      setIngredientSegments([{ title: '', items: [{ name: '', quantity: '', unit: '' }] }]);
      setStepSegments([{ title: '', items: [''] }]);
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message || 'Wystąpił błąd podczas zapisywania przepisu.');
      } else {
        setMessage('Wystąpił nieznany błąd. Spróbuj ponownie.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
    onSubmit={handleSubmit}
    className="space-y-4 p-6 bg-white rounded-md shadow-md max-w-3xl mx-auto"
  >
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
  
    <div className="grid grid-cols-3 gap-4">
      <select
        value={formData.type}
        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        className="p-2 border rounded-md"
      >
        <option value="">Wybierz typ</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Kalorie"
        value={formData.calories}
        onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
        className="p-2 border rounded-md"
      />
    </div>
  
    <div className="grid grid-cols-2 gap-4">
      <select
        value={formData.kitchen}
        onChange={(e) => setFormData({ ...formData, kitchen: e.target.value })}
        className="p-2 border rounded-md"
      >
        <option value="">Wybierz kuchnię</option>
        {kitchens.map((kitchen) => (
          <option key={kitchen} value={kitchen}>
            {kitchen}
          </option>
        ))}
      </select>
      <select
        value={formData.foodPreferences}
        onChange={(e) => setFormData({ ...formData, foodPreferences: e.target.value })}
        className="p-2 border rounded-md"
      >
        <option value="">Wybierz preferencje</option>
        {foodPreferences.map((preference) => (
          <option key={preference} value={preference}>
            {preference}
          </option>
        ))}
      </select>
    </div>
  
    {/* Składniki */}
    <div>
      <h3 className="font-bold mb-2">Składniki</h3>
      {ingredientSegments.map((segment, segmentIndex) => (
        <div key={segmentIndex} className="mb-4 border p-4 rounded-md">
          <input
            type="text"
            placeholder={`Tytuł grupy składników ${segmentIndex + 1}`}
            value={segment.title}
            onChange={(e) => handleIngredientSegmentChange(segmentIndex, e.target.value)}
            className="block mb-2 p-2 border rounded-md w-full"
          />
          {segment.items.map((item, itemIndex) => (
            <div key={itemIndex} className="grid grid-cols-4 gap-2 mt-2">
              <input
                type="text"
                placeholder="Nazwa składnika"
                value={item.name}
                onChange={(e) =>
                  handleIngredientChange(segmentIndex, itemIndex, 'name', e.target.value)
                }
                className="p-2 border rounded-md"
              />
              <input
                type="number"
                placeholder="Ilość"
                value={item.quantity}
                onChange={(e) =>
                  handleIngredientChange(segmentIndex, itemIndex, 'quantity', e.target.value)
                }
                className="p-2 border rounded-md"
              />
              <select
                value={item.unit}
                onChange={(e) =>
                  handleIngredientChange(segmentIndex, itemIndex, 'unit', e.target.value)
                }
                className="p-2 border rounded-md"
              >
                <option value="">Jednostka</option>
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => {
                  const updatedSegments = [...ingredientSegments];
                  updatedSegments[segmentIndex].items.splice(itemIndex, 1);
                  setIngredientSegments(updatedSegments);
                }}
                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition"
              >
                Usuń
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddIngredientField(segmentIndex)}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Dodaj składnik
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddIngredientSegment}
        className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
      >
        Dodaj nową grupę składników
      </button>
    </div>
  
    {/* Przebieg przepisu */}
    <div>
      <h3 className="font-bold mb-2">Przebieg przepisu</h3>
      {stepSegments.map((segment, segmentIndex) => (
        <div key={segmentIndex} className="mb-4 border p-4 rounded-md">
          <input
            type="text"
            placeholder={`Tytuł kroku ${segmentIndex + 1}`}
            value={segment.title}
            onChange={(e) => handleStepSegmentChange(segmentIndex, e.target.value)}
            className="block mb-2 p-2 border rounded-md w-full"
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
              <button
                type="button"
                onClick={() => {
                  const updatedSegments = [...stepSegments];
                  updatedSegments[segmentIndex].items.splice(itemIndex, 1);
                  setStepSegments(updatedSegments);
                }}
                className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition"
              >
                Usuń
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddStepField(segmentIndex)}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Dodaj krok
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddStepSegment}
        className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
      >
        Dodaj nową grupę kroków
      </button>
    </div>
  
    {/* Zapisz przepis */}
    <button
      type="submit"
      className="bg-green-500 text-white px-4 py-2 rounded-md disabled:bg-gray-400 hover:bg-green-600 transition"
      disabled={loading}
    >
      {loading ? 'Zapisywanie...' : 'Zapisz przepis'}
    </button>
  
    {message && <p className="mt-4 text-center text-lg font-semibold">{message}</p>}
  </form>
  );
};

export default RecipeUserPanel;
