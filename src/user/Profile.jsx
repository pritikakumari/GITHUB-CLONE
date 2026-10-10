import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import HeatMapProfile from "./HeatMap.jsx";
import { useAuth } from "../authContext";
import "./profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useAuth();

  const [userDetails, setUserDetails] = useState({
    username: "testuser1700",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) return;

      try {
        const response = await axios.get(
          `http://localhost:3002/userProfile/${userId}`
        );

        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setCurrentUser(null);
    navigate("/auth");
  };

  return (
    <div className="github-profile">
      <Navbar />

      <nav className="profile-tabs">
        <button
          className="tab active"
          onClick={() => navigate("/profile")}
        >
          <span>▤</span> Overview
        </button>

        <button
          className="tab"
          onClick={() => navigate("/repo")}
        >
          <span>♧</span> Starred Repositories
        </button>
      </nav>

      <main className="profile-layout">
        <aside className="profile-sidebar">
          <div className="profile-avatar">
            {userDetails.avatarUrl ? (
              <img src={userDetails.avatarUrl} alt="Profile avatar" />
            ) : (
              <span>
                {(userDetails.username || "U")
                  .charAt(0)
                  .toUpperCase()}
              </span>
            )}
          </div>

          <h2 className="profile-username">
            {userDetails.username || "username"}
          </h2>

          <button className="follow-btn">Follow</button>

          <div className="follower">
            <span>♟ 10 Followers</span>
            <span>3 Following</span>
          </div>
        </aside>

        <section className="contributions">
          <HeatMapProfile />
        </section>
      </main>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
