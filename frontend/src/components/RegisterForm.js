import React, { useState, useRef } from "react";
import axiosClient from '../axiosClient';
import { useStateContext } from "../contexts/ContextProvider";
import { Label, TextInput, Button } from "flowbite-react";

const Register = ({ setAuthMode }) => {
    const [error, setError] = useState(""); 
    const [success, setSuccess] = useState(""); 
    const { setUser, setToken } = useStateContext();

    const loginRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const nameRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            login: loginRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
            name: nameRef.current.value,
        };

        axiosClient.post('/register', payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                setSuccess("Registration successful!"); 
                setError(""); 

                
                loginRef.current.value = "";
                emailRef.current.value = "";
                passwordRef.current.value = "";
                passwordConfirmationRef.current.value = "";
                nameRef.current.value = "";

            })
            .catch((err) => {
                console.error(err);
                setError("Registration failed. Please check your input."); 
                setSuccess(""); 
            });
    };

    return (
        <div className="max-w-md mx-auto mt-16 p-16 bg-yellow-50 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-center text-brown-800 mb-6">
                Zarejestruj się
            </h2>

            {error && <p className="text-red-500 mb-4">{error}</p>} 
            {success && <p className="text-green-500 mb-4">{success}</p>} 

            <form onSubmit={handleSubmit} className="space-y-6 mt-12">
                <div>
                    <Label htmlFor="login" className="mb-2 block text-brown-800">
                        Login
                    </Label>
                    <TextInput
                        id="login"
                        name="login"
                        type="text"
                        ref={loginRef}
                        placeholder="Podaj login"
                        required
                        className="text-brown-800 shadow-md"
                    />
                </div>
                <div>
                    <Label htmlFor="email" className="mb-2 block text-brown-800">
                        Email
                    </Label>
                    <TextInput
                        id="email"
                        name="email"
                        type="email"
                        ref={emailRef}
                        placeholder="Podaj email"
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
                <div>
                    <Label htmlFor="password_confirmation" className="mb-2 block text-brown-800">
                        Potwierdź hasło
                    </Label>
                    <TextInput
                        id="password_confirmation"
                        name="password_confirmation"
                        type="password"
                        ref={passwordConfirmationRef}
                        placeholder="Potwierdź hasło"
                        required
                        className="text-brown-800 shadow-md"
                    />
                </div>
                <div>
                    <Label htmlFor="name" className="mb-2 block text-brown-800">
                        Imię
                    </Label>
                    <TextInput
                        id="name"
                        name="name"
                        type="text"
                        ref={nameRef}
                        placeholder="Podaj imię"
                        required
                        className="text-brown-800 shadow-md"
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                >
                    Zarejestruj się
                </Button>
            </form>

            <div className="mt-4 text-center">
                <button
                    onClick={() => setAuthMode("login")}
                    className="text-orange-500 hover:underline"
                >
                    Masz już konto? Zaloguj się
                </button>
            </div>
        </div>
    );
};

export default Register;