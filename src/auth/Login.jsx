import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../authContext.jsx";
import { Button } from "@primer/react";
import { Link, useNavigate } from "react-router-dom";

import "./auth.css";
import logo from "../assets/github-mark-white.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      alert("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:3002/login",
        {
          email: email.trim(),
          password,
        }
      );

      const { token, userId } = res.data;

      if (!token || !userId) {
        console.error("Unexpected login response:", res.data);
        alert("Login response is missing token or userId.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      setCurrentUser(userId);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);

      alert(
        err.response?.data?.message ||
          "Login failed. Check your credentials and backend server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-logo-container">
        <img
          className="logo-login"
          src={logo}
          alt="GitHub Logo"
        />
      </div>

      <div className="login-box-wrapper">
        <div className="login-heading">
          <h1>Sign In</h1>
        </div>

        <form className="login-box" onSubmit={handleLogin}>
          <div>
            <label className="label" htmlFor="email">
              Email address
            </label>

            <input
              autoComplete="email"
              name="email"
              id="email"
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="password-field">
            <label className="label" htmlFor="password">
              Password
            </label>

            <input
              autoComplete="current-password"
              name="password"
              id="password"
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>

        <div className="pass-box">
          <p>
            New to GitHub?{" "}
            <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
