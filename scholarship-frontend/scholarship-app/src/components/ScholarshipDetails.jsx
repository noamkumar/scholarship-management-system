import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import client from "../api/client";
import Header from "./Header";

function ScholarshipDetails() {
  const [scholarship, setScholarship] = useState(null);
  const [error, setError] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchScholarship();
  }, [id]);

  const fetchScholarship = async () => {
    try {
      const response = await client.get(`/scholarship/${id}`);

      setScholarship(response.data);
    } catch (error) {
      console.error(error);
      setError("Scholarship not found.");
    }
  };

  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#fdfbf7",
        }}
      >
        <Header />

        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
          }}
        >
          <h2
            style={{
              color: "#14342b",
              marginBottom: "20px",
            }}
          >
            {error}
          </h2>

          <button
            onClick={() => navigate("/scholarships")}
            style={{
              padding: "12px 24px",
              border: "none",
              borderRadius: "8px",
              backgroundColor: "#c2593f",
              color: "white",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Back to Scholarships
          </button>
        </div>
      </div>
    );
  }

  if (!scholarship) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#fdfbf7",
        }}
      >
        <Header />

        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
          }}
        >
          <h2
            style={{
              color: "#14342b",
            }}
          >
            Loading...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#fdfbf7",
      }}
    >
      <Header />

      <div
        style={{
          padding: "50px 20px",
          maxWidth: "850px",
          margin: "auto",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "35px",
            borderRadius: "16px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            border: "1px solid #eae5db",
          }}
        >
          <h1
            style={{
              color: "#14342b",
              marginBottom: "20px",
              fontSize: "32px",
            }}
          >
            {scholarship.name}
          </h1>

          <div
            style={{
              marginBottom: "25px",
              lineHeight: "1.7",
              color: "#5f5754",
            }}
          >
            <p>{scholarship.description}</p>
          </div>

          <div
            style={{
              backgroundColor: "#f6e8c3",
              padding: "20px",
              borderRadius: "10px",
              marginBottom: "25px",
            }}
          >
            <p
              style={{
                margin: "8px 0",
                color: "#14342b",
              }}
            >
              <strong>Amount:</strong> ₹{scholarship.amount}
            </p>

            <p
              style={{
                margin: "8px 0",
                color: "#14342b",
              }}
            >
              <strong>Deadline:</strong> {scholarship.deadline}
            </p>
          </div>

          <div
            style={{
              marginBottom: "30px",
            }}
          >
            <h3
              style={{
                color: "#14342b",
                marginBottom: "10px",
              }}
            >
              Eligibility
            </h3>

            <p
              style={{
                color: "#5f5754",
                lineHeight: "1.7",
              }}
            >
              {scholarship.eligibility}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => navigate(`/apply/${scholarship.id}`)}
              style={{
                padding: "12px 28px",
                border: "none",
                borderRadius: "8px",
                backgroundColor: "#c2593f",
                color: "white",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "16px",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#a94934";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#c2593f";
              }}
            >
              Apply Now
            </button>

            <button
              onClick={() => navigate("/scholarships")}
              style={{
                padding: "12px 28px",
                border: "1px solid #14342b",
                borderRadius: "8px",
                backgroundColor: "transparent",
                color: "#14342b",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "16px",
              }}
            >
              Back to Scholarships
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScholarshipDetails;
