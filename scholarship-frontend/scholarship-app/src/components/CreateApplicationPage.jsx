import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import client from "../api/client";
import Header from "./Header";
import Footer from "./Footer";

function CreateApplicationPage() {
  const [statement, setStatement] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!statement.trim()) {
      alert("Please enter your statement.");
      return;
    }

    try {
      setSubmitting(true);

      const token = localStorage.getItem("token");

      await client.post(
        "/applications",
        {
          scholarship_id: Number(id),
          statement: statement.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Application Submitted Successfully");

      setStatement("");

      navigate("/applications");
    } catch (error) {
      console.error(error);

      const message = error.response?.data?.detail || "Application Failed";

      alert(message);
    } finally {
      setSubmitting(false);
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
          maxWidth: "700px",
          margin: "0 auto",
          padding: "50px 20px",
        }}
      >
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "35px",
            borderRadius: "16px",
            border: "1px solid #eae5db",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              color: "#14342b",
              marginBottom: "10px",
            }}
          >
            Apply for Scholarship
          </h1>

          <p
            style={{
              textAlign: "center",
              color: "#5f5754",
              marginBottom: "30px",
            }}
          >
            Scholarship ID: <strong>{id}</strong>
          </p>

          <div
            style={{
              backgroundColor: "#f6e8c3",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "25px",
            }}
          >
            <p
              style={{
                margin: "0",
                color: "#14342b",
                lineHeight: "1.6",
              }}
            >
              Explain your financial need, academic achievements, and future
              goals. Make your statement clear and convincing.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <label
              style={{
                display: "block",
                marginBottom: "10px",
                color: "#14342b",
                fontWeight: "600",
              }}
            >
              Why do you need this scholarship?
            </label>

            <textarea
              rows="8"
              placeholder="Explain your financial need, academic achievements, and goals..."
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #eae5db",
                resize: "vertical",
                fontSize: "15px",
                lineHeight: "1.6",
                outline: "none",
                boxSizing: "border-box",
              }}
            />

            <button
              type="submit"
              disabled={submitting}
              style={{
                width: "100%",
                padding: "13px",
                marginTop: "20px",
                border: "none",
                borderRadius: "8px",
                backgroundColor: submitting ? "#9d8f89" : "#c2593f",
                color: "white",
                cursor: submitting ? "not-allowed" : "pointer",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </button>

            <Link
              to={`/scholarship/${id}`}
              style={{
                display: "block",
                textAlign: "center",
                marginTop: "15px",
                color: "#14342b",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              ← Back to Scholarship
            </Link>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default CreateApplicationPage;
