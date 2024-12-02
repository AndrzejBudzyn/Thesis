import React from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from '../axiosClient';

export default function Header() {
  const { token, setToken } = useStateContext();

  const handleLogout = async () => {
     
      axiosClient.post("logout")
      .then(({ data }) => {
        setToken(null); 
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });

  
  };

  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between bg-black bg-opacity-50 px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 py-2 z-10">
      <div className="flex items-center">
      
        <img
          src="/path/to/logo.png" 
          alt="Logo"
          className="h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16"
        />
      </div>

   
      <nav className="flex-grow font-body md:block">
        <ul className="flex justify-end">
          <li className="text-white font-semibold mx-2">
            <Link
              to="/"
              className="hover:text-gray-300 text-green-500"
              aria-label="Home"
            >
              Home
            </Link>
          </li>
          <li className="text-white font-semibold mx-2">
            <Link
              to="/search"
              className="hover:text-gray-300 text-green-500"
              aria-label="Home"
            >
              Serach
            </Link>
          </li>
          {token ? (
            <>
              <li className="text-white font-semibold mx-2">
                <Link
                  to="/profile"
                  className="hover:text-gray-300 text-blue-500"
                  aria-label="Profile"
                >
                  Profile
                </Link>
              </li>
              <li className="text-white font-semibold mx-2">
                <button
                  onClick={handleLogout}
                  className="hover:text-gray-300 text-red-500"
                  aria-label="Logout"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="text-white font-semibold mx-2">
              <Link
                to="/auth"
                className="hover:text-gray-300 text-green-500"
                aria-label="Login"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
