import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "./Header";
import Footer from "./Footer";

import "../home.css";

import heroLeft from "../assets/hero-left.png";
import heroRight from "../assets/hero-right.png";

import scholarshipIcon from "../assets/scholarship-icon.png";
import applyIcon from "../assets/apply-icon.png";
import statusIcon from "../assets/status-icon.png";

import avatar1 from "../assets/avatar1.png";
import avatar2 from "../assets/avatar2.png";

import client from "../api/client";

function HomePage() {
  const [search, setSearch] = useState("");

  const [stats, setStats] = useState({
    users: 0,
    scholarships: 0,
    applications: 0,
  });

  const [latestScholarships, setLatestScholarships] = useState([]);
  const [loadingScholarships, setLoadingScholarships] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
    fetchScholarships();
  }, []);

  // ================= STATISTICS =================
  const fetchStats = async () => {
    try {
      const response = await client.get("/dashboard/stats");

      if (response.data && typeof response.data === "object") {
        setStats({
          users: Number(response.data.users) || 0,
          scholarships: Number(response.data.scholarships) || 0,
          applications: Number(response.data.applications) || 0,
        });
      }
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  // ================= SCHOLARSHIPS =================
  const fetchScholarships = async () => {
    try {
      setLoadingScholarships(true);

      const response = await client.get("/scholarship");

      console.log("Scholarship API response:", response.data);

      // Make sure the response is actually an array
      if (Array.isArray(response.data)) {
        setLatestScholarships(response.data.slice(0, 3));
      } else {
        console.error(
          "Scholarship API did not return an array:",
          response.data,
        );

        setLatestScholarships([]);
      }
    } catch (error) {
      console.error(
        "Error fetching scholarships:",
        error.response?.data || error.message,
      );

      setLatestScholarships([]);
    } finally {
      setLoadingScholarships(false);
    }
  };

  // ================= SEARCH =================
  const handleSearch = () => {
    const searchValue = search.trim();

    if (searchValue) {
      navigate(`/scholarships?search=${encodeURIComponent(searchValue)}`);
    } else {
      navigate("/scholarships");
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="homepage">
      <Header />

      {/* ================= HERO SECTION ================= */}
      <section className="hero-section">
        <img src={heroLeft} alt="Students" className="hero-image" />

        <div className="hero-center">
          <h1>Find Scholarships & Apply Online</h1>

          <p>
            Explore available scholarships, submit applications, and track your
            application status in one place.
          </p>

          <div className="search-container">
            <input
              type="text"
              placeholder="Search scholarships"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />

            <button
              type="button"
              onClick={handleSearch}
              aria-label="Search scholarships"
            >
              🔍
            </button>
          </div>

          <Link to="/scholarships">
            <button type="button" className="view-btn">
              View Scholarships
            </button>
          </Link>
        </div>

        <img src={heroRight} alt="Students" className="hero-image" />
      </section>

      {/* ================= FEATURES ================= */}
      <section className="feature-row">
        <div className="feature-card">
          <img src={scholarshipIcon} alt="Scholarship" />

          <div>
            <h3>Scholarships</h3>
            <p>Browse available scholarships.</p>
          </div>
        </div>

        <div className="feature-card">
          <img src={applyIcon} alt="Apply" />

          <div>
            <h3>Apply Online</h3>
            <p>Submit applications easily.</p>
          </div>
        </div>

        <div className="feature-card">
          <img src={statusIcon} alt="Status" />

          <div>
            <h3>Track Status</h3>
            <p>Check approval and rejection updates.</p>
          </div>
        </div>
      </section>

      {/* ================= STATISTICS ================= */}
      <section className="stats-section">
        <div className="stat-box">
          <h2>{stats.users}</h2>
          <p>Total Users</p>
        </div>

        <div className="stat-box">
          <h2>{stats.scholarships}</h2>
          <p>Total Scholarships</p>
        </div>

        <div className="stat-box">
          <h2>{stats.applications}</h2>
          <p>Total Applications</p>
        </div>
      </section>

      {/* ================= LATEST SCHOLARSHIPS ================= */}
      <section className="latest-scholarships">
        <h2>Latest Scholarships</h2>

        {loadingScholarships ? (
          <p>Loading scholarships...</p>
        ) : !Array.isArray(latestScholarships) ||
          latestScholarships.length === 0 ? (
          <p>No scholarships available at the moment.</p>
        ) : (
          <div className="latest-container">
            {latestScholarships.map((scholarship) => (
              <div key={scholarship.id} className="latest-card">
                <h3>{scholarship.name}</h3>

                <p>{scholarship.description}</p>

                <p>
                  <strong>Amount:</strong> ₹
                  {Number(scholarship.amount).toLocaleString("en-IN")}
                </p>

                <p>
                  <strong>Deadline:</strong> {scholarship.deadline}
                </p>

                <Link to={`/scholarships/${scholarship.id}`}>
                  <button type="button">View Scholarship</button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="testimonial-wrapper">
        <h2 className="section-title">Student Inspiration</h2>

        <div className="testimonial-container">
          <div className="testimonial">
            <img src={avatar1} alt="Student" />

            <div>
              <p>"Hard work, knowledge, and opportunity lead to success."</p>

              <span>Lifelong Learner</span>
            </div>
          </div>

          <div className="testimonial">
            <img src={avatar2} alt="Student" />

            <div>
              <p>"Education is the most powerful investment in your future."</p>

              <span>Dedicated Student</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;
