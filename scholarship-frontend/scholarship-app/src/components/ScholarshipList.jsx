import { useEffect, useState } from "react";
import client from "../api/client";
import { useNavigate, Link, useLocation } from "react-router-dom";

import Header from "./Header";

function ScholarshipList() {
  const [scholarships, setScholarships] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const role = localStorage.getItem("role");

  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search");

  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    try {
      const response = await client.get("/scholarship");

      setScholarships(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredScholarships = search
    ? scholarships.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase()),
      )
    : scholarships;

  return (
    <div>
      <Header />

      {/* ACTION BUTTONS */}

      <div
        style={{
          display: "flex",
          gap: "10px",
          margin: "20px",
          flexWrap: "wrap",
        }}
      >
        {role === "admin" && (
          <Link to="/admin">
            <button
              style={{
                padding: "10px 18px",
                border: "none",
                borderRadius: "8px",
                backgroundColor: "#14342b",
                color: "#f6e8c3",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Admin Dashboard
            </button>
          </Link>
        )}

        {role && (
          <Link to="/applications">
            <button
              style={{
                padding: "10px 18px",
                border: "none",
                borderRadius: "8px",
                backgroundColor: "#c2593f",
                color: "white",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              My Applications
            </button>
          </Link>
        )}
      </div>

      {/* PAGE TITLE */}

      <h1
        style={{
          textAlign: "center",
          color: "#2b2625",
        }}
      >
        Scholarships
      </h1>

      {/* SEARCH RESULT */}

      {search && (
        <p
          style={{
            textAlign: "center",
            color: "#5f5754",
            marginBottom: "20px",
          }}
        >
          Search Result For: <b>{search}</b>
        </p>
      )}

      {/* SCHOLARSHIP CARDS */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "20px",
          padding: "20px",
        }}
      >
        {filteredScholarships.length === 0 ? (
          <h3
            style={{
              textAlign: "center",
              gridColumn: "1 / -1",
              color: "#5f5754",
            }}
          >
            No scholarships found
          </h3>
        ) : (
          filteredScholarships.map((scholarship) => (
            <div
              key={scholarship.id}
              style={{
                border: "1px solid #eae5db",
                borderRadius: "14px",
                padding: "20px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                background: "#fff",
              }}
            >
              <h2
                style={{
                  color: "#14342b",
                  marginBottom: "10px",
                }}
              >
                {scholarship.name}
              </h2>

              <p
                style={{
                  color: "#5f5754",
                  lineHeight: "1.6",
                  marginBottom: "15px",
                }}
              >
                {scholarship.description}
              </p>

              <p>
                <strong>Amount:</strong> ₹{scholarship.amount}
              </p>

              <p>
                <strong>Deadline:</strong> {scholarship.deadline}
              </p>

              <button
                style={{
                  width: "100%",
                  padding: "12px",
                  marginTop: "10px",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: "#c2593f",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "600",
                  transition: "0.3s",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#a94934";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "#c2593f";
                }}
                onClick={() => navigate(`/scholarship/${scholarship.id}`)}
              >
                View Details
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ScholarshipList;
