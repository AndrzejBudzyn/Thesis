import React, { useRef, useState } from "react";
import axiosClient from '../axiosClient';
import { useStateContext } from "../contexts/ContextProvider";

const Login = ({ setAuthMode }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const {setUser,setToken}=useStateContext();

  const loginOrEmailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      login_or_email: loginOrEmailRef.current.value,
      password: passwordRef.current.value,
    };

    axiosClient.post('/login',payload)
    .then(({data})=>{
      setUser(data.user)
      setToken(data.token)
    })
    .catch(err=>{
      console.log(err);
    })
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login_or_email">Login or Email</label>
          <input
            type="text"
            id="login_or_email"
            name="login_or_email"
            ref={loginOrEmailRef}
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
        <button type="submit">Login</button>
      </form>
      <div>
        <button onClick={() => setAuthMode("register")}>
          Don't have an account? Register
        </button>
      </div>
    </div>
  );
};

export default Login;