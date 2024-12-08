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
        console.log(data.user);
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
      <div className="flex flex-col items-center justify-center h-screen">
        <p>Ładowanie...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  const isAdmin = user?.isAdmin === 1; // Sprawdzenie, czy isAdmin ma wartość 1

  return (
    <div className="flex flex-col h-screen bg-green-100">
      <Header />

      <main className="flex flex-col items-center flex-1 pt-20 p-6">
        {isAdmin ? <AdminPanel /> : <UserPanel />}
      </main>

      <footer className="h-12 bg-gray-800 text-center text-white flex items-center justify-center">
        © 2024 PrzepiSearch
      </footer>
    </div>
  );
};

export default Profile;
