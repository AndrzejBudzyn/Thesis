import React, { useState } from "react";
import Header from "../components/Header";
import Login from "../components/LoginForm";
import Register from "../components/RegisterForm";

const AuthForm = () => {

  const [authMode, setAuthMode] = useState("login");


  return (
    <div className="flex flex-col h-flex bg-green-100">
      
      <Header />

      <main className="flex flex-col items-center flex-1 pt-20 p-6 ">
      <div>
      {authMode === "login" ? (
        <Login setAuthMode={setAuthMode} />
      ) : (
        <Register setAuthMode={setAuthMode} />
      )}
    </div>
      </main>

      <footer className="h-12 bg-gray-800 text-center text-white flex items-center justify-center">
        © 2024 PrzepiSearch
      </footer>
    </div>
  );
};

export default AuthForm;
