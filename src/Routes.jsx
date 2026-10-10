
import React, { useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";

import Dashboard from "./dashboard/dashboard.jsx";
import Profile from "./user/Profile.jsx";
import Login from "./auth/Login.jsx";
import Signup from "./auth/Signup.jsx";

import { useAuth } from "./authContext.jsx";

const ProjectRoutes = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const path = window.location.pathname;

    if (userId && !currentUser) {
      setCurrentUser(userId);
    }

    if (!userId && path !== "/auth" && path !== "/signup") {
      navigate("/auth", { replace: true });
    }

    if (userId && path === "/auth") {
      navigate("/", { replace: true });
    }
  }, [currentUser, setCurrentUser, navigate]);

  return useRoutes([
    { path: "/", element: <Dashboard /> },
    { path: "/auth", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/profile", element: <Profile /> },
  ]);
};

export default ProjectRoutes;