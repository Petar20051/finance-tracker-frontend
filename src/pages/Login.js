import React, { useState, useContext } from "react";
import { login as loginApi } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import "../styles/Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext); // Use AuthContext's login function

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Call your API login function
      const { token, userId } = await loginApi(email, password);
      if (!token) {
        setError("Login failed: No token received.");
        return;
      }
      // Use the context's login function to update state and navigate
      login(token);
      // Optionally store the userId as well
      localStorage.setItem("userId", userId);
      console.log("Token saved to localStorage:", token);
      console.log("UserId saved to localStorage:", userId);
    } catch (err) {
      console.error("Login error:", err.message);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
