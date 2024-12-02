
import React, { useState, useRef  } from "react";
import axiosClient from '../axiosClient';
import { useStateContext } from "../contexts/ContextProvider";

const Register = ({ setAuthMode }) => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const {setUser,setToken}=useStateContext();

    const loginRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const nameRef = useRef();
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const payload = {
        login:loginRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
        password_confirmation: passwordConfirmationRef.current.value,
        name: nameRef.current.value,
      };
  
      axiosClient.post('/register', payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        console.error(err);
      });
    };
  
    return (
      <div>
        <h2>Register</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="login">Login</label>
            <input
              type="text"
              id="login"
              name="login"
              ref={loginRef}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              ref={emailRef}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              ref={passwordRef}
              required
            />
          </div>
          <div>
            <label htmlFor="password_confirmation">Confirm Password</label>
            <input
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              ref={passwordConfirmationRef}
              required
            />
          </div>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              ref={nameRef}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
        <div>
          <button onClick={() => setAuthMode("login")}>
            Already have an account? Login
          </button>
        </div>
      </div>
    );
  };

export default Register;
