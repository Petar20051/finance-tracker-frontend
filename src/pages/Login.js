import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../api/auth";
import { AuthContext } from "../context/AuthContext";
import "../styles/Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

 
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token, userId } = await loginApi(email, password);
      if (!token) {
        setError("Login failed: No token received.");
        return;
      }
      login(token);
      localStorage.setItem("userId", userId);
      console.log("Token saved to localStorage:", token);
      console.log("UserId saved to localStorage:", userId);
    } catch (err) {
      console.error("Login error:", err.message);
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Welcome Back!</h2>
      <p className="auth-description">
        Please enter your email and password below to access your account.
      </p>
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
      <p className="auth-extra">
        Don't have an account? <a href="/register">Register here</a>.
      </p>
    </div>
  );
};

export default Login;
