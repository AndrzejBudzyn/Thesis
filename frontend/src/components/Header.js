import React from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axiosClient";

export default function Header() {
  const { token, setToken } = useStateContext();

  const handleLogout = async () => {
    axiosClient
      .post("logout")
      .then(({ data }) => {
        setToken(null);
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <header className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-b border-gray-300 p-4 lg:p-7 transition duration-300">
      <div className="container mx-auto flex w-full items-center justify-between">
        {/* Logo i nazwa */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src="/Logo.png"
              className="mr-3 h-8 sm:h-12 lg:h-16 transition duration-300 hover:scale-105"
              alt="Przepisy Logo"
            />
            <span className="self-center whitespace-nowrap text-xl lg:text-2xl font-semibold text-amber-600 transition duration-300">
              Przepisy
            </span>
          </Link>
        </div>

        {/* Nawigacja */}
        <div className="flex flex-grow justify-center space-x-4 lg:space-x-10">
          <Link
            to="/"
            className="text-brown-800 hover:text-orange-500 font-medium transition duration-200"
          >
            Strona główna
          </Link>
          <Link
            to="/search"
            className="text-brown-800 hover:text-orange-500 font-medium transition duration-200"
          >
            Wyszukaj
          </Link>
          {token && (
            <Link
              to="/profile"
              className="text-brown-800 hover:text-orange-500 font-medium transition duration-200"
            >
              Profil
            </Link>
          )}
        </div>

        {/* Przyciski */}
        <div className="flex items-center space-x-4">
          {token ? (
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-medium transition duration-200 px-4 py-2 rounded-lg shadow-md hover:shadow-lg" // Dodano cień
              onClick={handleLogout}
            >
              Wyloguj się
            </button>
          ) : (
            <Link to="/auth">
              <button className="bg-[#FF914D] hover:bg-orange-600 text-white font-medium transition duration-200 px-4 py-2 rounded-lg shadow-md hover:shadow-lg"> {/* Dodano cień */}
                Zacznij
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}