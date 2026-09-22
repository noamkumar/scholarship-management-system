import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import client from "../api/client";
import Header from "./Header";
import Footer from "./Footer";

function ApplicationList() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await client.get("/applications/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setApplications(response.data);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error.response?.data?.detail || "Unable to load applications.",
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async (applicationId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await client.get(`/applications/pdf/${applicationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(
        new Blob([response.data], {
          type: "application/pdf",
        }),
      );

      const link = document.createElement("a");

      link.href = url;
      link.download = `application_${applicationId}.pdf`;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Unable to download PDF.");
    }
  };

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
          maxWidth: "1000px",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#14342b",
            marginBottom: "30px",
          }}
        >
          My Applications
        </h1>

        {loading && (
          <p
            style={{
              textAlign: "center",
              color: "#5f5754",
            }}
          >
            Loading applications...
          </p>
        )}

        {!loading && errorMessage && (
          <div
            style={{
              textAlign: "center",
              padding: "30px",
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              border: "1px solid #eae5db",
            }}
          >
            <p style={{ color: "#c2593f" }}>{errorMessage}</p>

            <Link to="/scholarships">
              <button
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
                Browse Scholarships
              </button>
            </Link>
          </div>
        )}

        {!loading && !errorMessage && applications.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              backgroundColor: "#ffffff",
              borderRadius: "14px",
              border: "1px solid #eae5db",
              boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                color: "#14342b",
              }}
            >
              No Applications Yet
            </h2>

            <p
              style={{
                color: "#5f5754",
                marginBottom: "20px",
              }}
            >
              You have not applied for any scholarships yet.
            </p>

            <Link to="/scholarships">
              <button
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
                Browse Scholarships
              </button>
            </Link>
          </div>
        )}

        {!loading && !errorMessage && applications.length > 0 && (
          <div
            style={{
              display: "grid",
              gap: "20px",
            }}
          >
            {applications.map((application) => (
              <div
                key={application.id}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #eae5db",
                  borderRadius: "14px",
                  padding: "25px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                }}
              >
                <h2
                  style={{
                    color: "#14342b",
                    marginBottom: "20px",
                  }}
                >
                  Application #{application.id}
                </h2>

                <p
                  style={{
                    color: "#5f5754",
                    marginBottom: "10px",
                  }}
                >
                  <strong>Scholarship ID:</strong> {application.scholarship_id}
                </p>

                <p
                  style={{
                    color: "#5f5754",
                    marginBottom: "10px",
                  }}
                >
                  <strong>Status:</strong>{" "}
                  <span
                    style={{
                      fontWeight: "600",
                      color:
                        application.status === "Approved"
                          ? "#14342b"
                          : application.status === "Rejected"
                            ? "#c2593f"
                            : "#8a6d1d",
                    }}
                  >
                    {application.status}
                  </span>
                </p>

                <div
                  style={{
                    marginTop: "20px",
                    padding: "15px",
                    backgroundColor: "#f6e8c3",
                    borderRadius: "10px",
                  }}
                >
                  <strong
                    style={{
                      color: "#14342b",
                    }}
                  >
                    Statement
                  </strong>

                  <p
                    style={{
                      color: "#5f5754",
                      lineHeight: "1.6",
                      marginBottom: "0",
                    }}
                  >
                    {application.statement}
                  </p>
                </div>

                <button
                  onClick={() => downloadPDF(application.id)}
                  style={{
                    marginTop: "20px",
                    padding: "12px 20px",
                    border: "none",
                    borderRadius: "8px",
                    backgroundColor: "#c2593f",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "600",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#a94934";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "#c2593f";
                  }}
                >
                  📄 Download PDF
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default ApplicationList;
