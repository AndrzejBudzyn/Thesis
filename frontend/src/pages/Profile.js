import React, { useState, useEffect } from "react";
import axiosClient from "../axiosClient";
import Header from "../components/Header";
import UserPanel from "../components/UserPanel";
import AdminPanel from "../components/AdminPanel";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosClient
      .get(`/getCurrentUser`)
      .then(({ data }) => {
        setUser(data.user);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Nie udało się pobrać danych użytkownika.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
        <p className="mt-4 text-lg text-gray-700">Ładowanie...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  const isAdmin = user?.isAdmin === 1;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <main className="flex-1 pt-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto bg-white rounded-lg shadow-md p-8"> {/* Dodany kontener */}
          <h2 className="text-2xl font-semibold mb-4 text-center">Profil Użytkownika</h2> {/* Dodany nagłówek */}
          {isAdmin ? (
            <AdminPanel user={user} /> // Przekazujemy usera do AdminPanelu
          ) : (
            <UserPanel user={user} /> // Przekazujemy usera do UserPanelu
          )}
        </div>
      </main>

      <footer className="bg-gray-800 text-center text-white py-4"> {/* Poprawiony padding */}
        <div className="container mx-auto"> {/* Dodany kontener dla stopki */}
          © 2024 PrzepiSearch
        </div>
      </footer>
    </div>
  );
};

export default Profile;