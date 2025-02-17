import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import axiosClient from "../axiosClient";
import { useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const RecipePage = () => {
    const { id: recipeId, recipeName } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [error, setError] = useState(null);
    const { token } = useStateContext();
    const formattedName = recipeName.replace(/_/g, " ");
    const [user, setUser] = useState(null);
    const [isInToDo, setIsInToDo] = useState(false);
    const [isInFavorites, setIsInFavorites] = useState(false);

    useEffect(() => {
        axiosClient
            .get(`/recipe/${recipeId}`)
            .then(({ data }) => {
                data.ingredients = JSON.parse(data.ingredients);
                data.preparation = JSON.parse(data.preparation);
                setRecipe(data);
            })
            .catch((err) => {
                console.error(err);
                setError("Nie udało się załadować przepisu.");
            });

        axiosClient
            .get(`/comments/${recipeId}`)
            .then(({ data }) => {
                setComments(data);
            })
            .catch((err) => {
                console.error(err);
                setError("Nie udało się pobrać komentarzy.");
            });

        axiosClient
            .get(`/getCurrentUser`)
            .then(({ data }) => {
                setUser(data.user);
                console.log(data);
                if (data.user) {
                    
                    setIsInFavorites(data.user.favorites?.includes(parseInt(recipeId)));

                
                    setIsInToDo(data.user.toDo?.includes(parseInt(recipeId)));
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }, [recipeId]);

    const handleAddOrRemoveFromToDo = () => {
        if (!user || !user.id) {
            setError("Musisz być zalogowany, aby modyfikować listę zadań.");
            return;
        }

        const action = isInToDo ? "removeTodo" : "addTodo";
        axiosClient
            .post(`/${action}`, { recipeId: parseInt(recipeId), userId: user.id })
            .then(() => {
                setIsInToDo(!isInToDo);
                alert(isInToDo ? "Przepis usunięty z listy zadań!" : "Przepis dodany do listy zadań!");
            })
            .catch((err) => {
                console.error(err);
                setError("Nie udało się zmodyfikować listy zadań.");
            });
    };

    const handleAddOrRemoveFromFavorites = () => {
        if (!user || !user.id) {
            setError("Musisz być zalogowany, aby modyfikować ulubione.");
            return;
        }

        const action = isInFavorites ? "removeFavorites" : "addFavorites";
        axiosClient
            .post(`/${action}`, { recipeId: parseInt(recipeId), userId: user.id })
            .then(() => {
                setIsInFavorites(!isInFavorites);
                alert(isInFavorites ? "Przepis usunięty z ulubionych!" : "Przepis dodany do ulubionych!");
            })
            .catch((err) => {
                console.error(err);
                setError("Nie udało się zmodyfikować ulubionych.");
            });
    };

    const handleAddComment = () => {
        if (!newComment.trim()) {
            setError("Treść komentarza nie może być pusta.");
            return;
        }

        if (!user || !user.id) {
            setError("Musisz być zalogowany, aby dodać komentarz.");
            return;
        }

        const payload = {
            recipeId: parseInt(recipeId),
            userId: user.id,
            contents: newComment.trim(),
        };

        axiosClient
            .post(`/comment`, payload)
            .then(({ data }) => {
                setComments([...comments, data]);
                setNewComment("");
            })
            .catch((err) => {
                console.error(err);
                setError("Nie udało się dodać komentarza.");
            });
    };

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (!recipe) {
        return <p className="text-gray-600">Ładowanie przepisu...</p>;
    }

    return (
        <div className="flex flex-col h-screen bg-green-100">
            <Header />

            <main className="flex flex-col items-center flex-1 pt-10 p-6">
                <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold">{formattedName}</h1>
                        {user ? (
                            <div className="flex space-x-4">
                                <button
                                    className={`px-4 py-2 ${
                                        isInToDo ? "bg-red-500" : "bg-blue-500"
                                    } text-white rounded-lg`}
                                    onClick={handleAddOrRemoveFromToDo}
                                >
                                    {isInToDo ? "Usuń z listy zadań" : "Dodaj do zrobienia"}
                                </button>
                                <button
                                    className={`px-4 py-2 ${
                                        isInFavorites ? "bg-red-500" : "bg-yellow-500"
                                    } text-white rounded-lg`}
                                    onClick={handleAddOrRemoveFromFavorites}
                                >
                                    {isInFavorites ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
                                </button>
                            </div>
                        ) : (
                            <p className="text-gray-600">Zaloguj się, aby korzystać z dodatkowych funkcji.</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="border p-4">
                            {recipe.photo ? (
                                <img
                                    src={recipe.photo}
                                    alt={recipe.name}
                                    className="w-full h-auto rounded-lg"
                                />
                            ) : (
                                <p className="text-gray-600">Brak zdjęcia</p>
                            )}
                        </div>

                        <div className="border p-4">
                            <h2 className="text-lg font-bold mb-4">Składniki</h2>
                            {recipe.ingredients && recipe.ingredients.length > 0 ? (
                                recipe.ingredients.map((section, index) => (
                                    <div key={index} className="mb-4">
                                        <h3 className="font-semibold">{section.title}</h3>
                                        <ul className="list-disc ml-5">
                                            {section.items.map((item, i) => (
                                                <li key={i}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600">Brak składników</p>
                            )}
                        </div>
                    </div>

                    <div className="mb-8 text-center">
                        <p>{recipe.calories} kcal</p>
                    </div>

                    <div className="border p-4 mb-8">
                        <h2 className="text-lg font-bold mb-4">Etapy przygotowania</h2>
                        {recipe.preparation && recipe.preparation.length > 0 ? (
                            recipe.preparation.map((section, index) => (
                                <div key={index} className="mb-4">
                                    <h3 className="font-semibold">{section.title}</h3>
                                    <ol className="list-decimal ml-5">
                                        {section.items.map((step, i) => (
                                            <li key={i}>{step}</li>
                                        ))}
                                    </ol>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">Brak kroków przygotowania</p>
                        )}
                    </div>
                </div>

                <div className="border p-4">
                    <h2 className="text-lg font-bold mb-4">Komentarze</h2>
                    {comments.length > 0 ? (
                        <ul className="list-disc ml-5">
                            {comments.map((comment, index) => (
                                <li key={index}>
                                    <p>
                                        <strong>{comment.user?.name}:</strong> {comment.contents}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">Brak komentarzy.</p>
                    )}

                    {token ? (
                        <div className="mt-4">
                            <textarea
                                className="w-full p-2 border rounded-lg"
                                rows="3"
                                placeholder="Dodaj komentarz..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            ></textarea>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg mt-2"
                                onClick={handleAddComment}
                            >
                                Dodaj komentarz
                            </button>
                        </div>
                    ) : (
                        <p className="text-gray-600 mt-4">
                            Musisz być zalogowany, aby dodać komentarz.
                        </p>
                    )}
                </div>
            </main>

            <footer className="h-12 bg-gray-800 text-center text-white flex items-center justify-center">
                © 2024 PrzepiSearch
            </footer>
        </div>
    );
};

export default RecipePage;
