import React from "react";
import Header from "../components/Header";

const AuthForm = () => {
  return (
    <div className="flex flex-col h-screen bg-green-100">
      
      <Header />

      <main className="flex flex-col items-center flex-1 pt-20 p-6 ">
        Profil
      </main>

      <footer className="h-12 bg-gray-800 text-center text-white flex items-center justify-center">
        © 2024 PrzepiSearch
      </footer>
    </div>
  );
};

export default AuthForm;
