
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../authContext.jsx";
import { Button } from "@primer/react";
import "./auth.css";
import logo from "../assets/github-mark-white.svg";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!email.trim() || !username.trim() || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      // Send signup details to the backend
      const res = await axios.post(
        "http://localhost:3002/signup",
        {
          email: email.trim(),
          username: username.trim(),
          password,
        }
      );

      // Get token and userId from backend
      const { token, userId } = res.data;

      if (!token || !userId) {
        console.error("Signup response:", res.data);
        throw new Error(
          "Backend response is missing token or userId."
        );
      }

      // Save authentication details
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      // Update authentication context
      setCurrentUser(userId);

      alert("Signup successful!");

      // Navigate to the home page
      navigate("/");
    } catch (err) {
      console.error(
        "Signup error:",
        err.response?.data || err.message
      );

      alert(
        err.response?.data?.message ||
        err.message ||
        "Signup failed. Please check your backend server."
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
          <div style={{ padding: "8px" }}>
            <h1 className="signup-heading">Sign Up</h1>
          </div>
        </div>

        <form className="login-box" onSubmit={handleSignup}>
          <div>
            <label className="label" htmlFor="Username">
              Username
            </label>
            <input
              autoComplete="username"
              name="username"
              id="Username"
              className="input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="label" htmlFor="Email">
              Email address
            </label>
            <input
              autoComplete="email"
              name="email"
              id="Email"
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="div">
            <label className="label" htmlFor="Password">
              Password
            </label>
            <input
              autoComplete="new-password"
              name="password"
              id="Password"
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Loading..." : "Signup"}
          </Button>
        </form>

        <div className="pass-box">
          <p>
            Already have an account?{" "}
            <Link to="/auth">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;