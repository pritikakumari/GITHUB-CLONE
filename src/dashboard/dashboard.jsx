import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Navbar from "../components/Navbar.jsx";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [username, setUsername] = useState("Username");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all suggested repositories
        const suggestedResponse = await fetch(
          "http://localhost:3002/repo/all"
        );

        if (!suggestedResponse.ok) {
          throw new Error(
            `Suggested repositories error: ${suggestedResponse.status}`
          );
        }

        const suggestedData = await suggestedResponse.json();

        setSuggestedRepositories(
          Array.isArray(suggestedData)
            ? suggestedData
            : suggestedData.repositories || []
        );

        // Get the logged-in user's ID
        const userId = localStorage.getItem("userId");

        if (userId) {
          // Fetch the user's repositories
          const response = await fetch(
            `http://localhost:3002/repo/user/${userId}`
          );

          if (!response.ok) {
            throw new Error(
              `User repositories error: ${response.status}`
            );
          }

          const data = await response.json();

          setRepositories(
            Array.isArray(data)
              ? data
              : data.repositories || []
          );

          // Display username if returned by the API
          if (data.username) {
            setUsername(data.username);
          }
        }
      } catch (error) {
        console.error("Dashboard error:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  // Filter repositories by name
  const filteredRepositories = repositories.filter((repo) =>
    (repo.name || "")
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase())
  );

  return (
    <div className="dashboard">
      <Navbar />

      <div className="dashboard-content">
        {/* Left column */}
        <main className="repositories">
          <section className="repository-section">
            <h2>Suggested Repositories</h2>

            <div className="repository-list">
              {suggestedRepositories.length > 0 ? (
                suggestedRepositories.map((repo) => (
                  <div
                    className="repository-card"
                    key={repo._id || repo.id || repo.name}
                  >
                    <h3>{repo.name || "Unnamed Repository"}</h3>
                    <p>{repo.description || "No description available"}</p>
                  </div>
                ))
              ) : (
                <p>No suggested repositories found.</p>
              )}
            </div>
          </section>

          <section className="repository-section">
            <h2>Your Repositories</h2>

            <input
              className="repository-search"
              type="text"
              placeholder="Search repositories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="repository-list">
              {filteredRepositories.length > 0 ? (
                filteredRepositories.map((repo) => (
                  <div
                    className="repository-card"
                    key={repo._id || repo.id || repo.name}
                  >
                    <h3>{repo.name || "Unnamed Repository"}</h3>
                    <p>{repo.description || "No description available"}</p>
                  </div>
                ))
              ) : (
                <p>No repositories found.</p>
              )}
            </div>
          </section>
        </main>

        {/* Right column */}
        <aside className="profile-panel">
          <div className="profile-avatar"></div>

          <h3>{username}</h3>

          <button className="follow-button" type="button">
            Follow
          </button>

          <div className="profile-stats">
            <span>10 Followers</span>{" "}
            <span>3 Following</span>
          </div>

          <section className="events">
            <h3>Upcoming Events</h3>
            <p>Tech Conference - Dec 15</p>
            <p>Developer Meetup - Dec 25</p>
            <p>React Summit - Jan 5</p>
          </section>
        </aside>
      </div>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Dashboard;