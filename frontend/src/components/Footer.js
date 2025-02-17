import React from "react";

const Footer = () => {
  return (
    <footer className="p-8 bg-yellow-100 text-brown-800 border-t-2 border-black mt-6">
      <div className="container mx-auto flex justify-between">
        <div>
          <h1 className="text-xl font-bold">Przepisi</h1>
          <p className="text-sm mt-1 text-gray-600">
            Twoja baza kulinarnych inspiracji.
          </p>
        </div>
        <nav className="flex gap-4">
          <a href="#" className="hover:text-orange-500">Kontakt</a>
          <a href="#" className="hover:text-orange-500">Regulamin</a>
          <a href="#" className="hover:text-orange-500">Polityka prywatności</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
