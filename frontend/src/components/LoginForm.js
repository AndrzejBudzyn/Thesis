import React, { useRef } from "react";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/ContextProvider";
import { Label, TextInput, Button } from "flowbite-react";

const Login = ({ setAuthMode }) => {
  const { setUser, setToken } = useStateContext();

  const loginOrEmailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      login_or_email: loginOrEmailRef.current.value,
      password: passwordRef.current.value,
    };

    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-16 bg-yellow-50 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center text-brown-800 mb-6">
        Zaloguj się
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6 mt-12">
        <div>
          <Label htmlFor="login_or_email" className="mb-2 block text-brown-800">
            Login lub Email
          </Label>
          <TextInput
            id="login_or_email"
            name="login_or_email"
            ref={loginOrEmailRef}
            placeholder="Podaj login lub email"
            required
            className="text-brown-800 shadow-md"
          />
        </div>

        <div>
          <Label htmlFor="password" className="mb-2 block text-brown-800">
            Hasło
          </Label>
          <TextInput
            id="password"
            name="password"
            type="password"
            ref={passwordRef}
            placeholder="Podaj hasło"
            required
            className="text-brown-800 shadow-md"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
        >
          Zaloguj się
        </Button>
      </form>

      <div className="mt-4 text-center">
        <button
          onClick={() => setAuthMode("register")}
          className="text-orange-500 hover:underline"
        >
          Nie masz konta? Zarejestruj się 
        </button>  {/* ty właściwe to ja mam po polsku czy po ang pisać ? friz się wkurzy jak będziesz miał po ang */}
      </div>
    </div>
  );
};

export default Login;
