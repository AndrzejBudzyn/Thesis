import React from "react";
import { Navbar, Button } from "flowbite-react";
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
    <Navbar fluid rounded className="bg-yellow-100 border-b border-gray-300 p-7">
      <div className="flex w-full items-center justify-between">
        <Navbar.Brand href="/">
          <img
            src="/Logo.png"
            className="mr-8 h-8 sm:h-16"
            alt="Przepisi Logo"
          />
          <span className="self-center whitespace-nowrap text-2xl font-semibold text-amber-500">
            Przepisi
          </span>
        </Navbar.Brand>

        <div className="flex flex-grow justify-center space-x-10">
          <Navbar.Link
            as={Link}
            to="/"
            className="text-brown-800 hover:text-orange-500"
          >
            Strona główna
          </Navbar.Link>
          <Navbar.Link
            as={Link}
            to="/search"
            className="text-brown-800 hover:text-orange-500"
          >
            Wyszukaj
          </Navbar.Link>
          {token && (
            <Navbar.Link
              as={Link}
              to="/profile"
              className="text-brown-800 hover:text-orange-500"
            >
              Profil
            </Navbar.Link>
          )}
        </div>

        <div className="flex items-center">
          {token ? (
            <Button
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={handleLogout}
            >
              Wyloguj się
            </Button>
          ) : (
            <Link to="/auth">
              <Button className="bg-[#FF914D] hover:bg-orange-600 text-white">
                Get started
              </Button>
            </Link>
          )}
        </div>
      </div>
    </Navbar>
  );
}
