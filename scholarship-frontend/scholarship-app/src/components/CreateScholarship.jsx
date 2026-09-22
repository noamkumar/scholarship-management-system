import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import client from "../api/client";
import Header from "./Header";
import Footer from "./Footer";

function CreateScholarship() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [eligibility, setEligibility] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !description.trim() ||
      !amount ||
      !deadline ||
      !eligibility.trim()
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (Number(amount) <= 0) {
      alert("Amount must be greater than 0.");
      return;
    }

    try {
      setSubmitting(true);

      const token = localStorage.getItem("token");

      await client.post(
        "/scholarship",
        {
          name: name.trim(),
          description: description.trim(),
          amount: Number(amount),
          deadline,
          eligibility: eligibility.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Scholarship Created Successfully");

      navigate("/admin");
    } catch (error) {
      console.error(error);

      const message =
        error.response?.data?.detail || "Failed To Create Scholarship";

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
          maxWidth: "750px",
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
              marginBottom: "30px",
            }}
          >
            Create Scholarship
          </h1>

          <form onSubmit={handleSubmit}>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#14342b",
                fontWeight: "600",
              }}
            >
              Scholarship Name
            </label>

            <input
              type="text"
              placeholder="Enter scholarship name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "20px",
                borderRadius: "8px",
                border: "1px solid #eae5db",
                fontSize: "15px",
                boxSizing: "border-box",
              }}
            />

            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#14342b",
                fontWeight: "600",
              }}
            >
              Description
            </label>

            <textarea
              rows="5"
              placeholder="Enter scholarship description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "20px",
                borderRadius: "8px",
                border: "1px solid #eae5db",
                fontSize: "15px",
                resize: "vertical",
                boxSizing: "border-box",
              }}
            />

            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#14342b",
                fontWeight: "600",
              }}
            >
              Scholarship Amount
            </label>

            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              required
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "20px",
                borderRadius: "8px",
                border: "1px solid #eae5db",
                fontSize: "15px",
                boxSizing: "border-box",
              }}
            />

            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#14342b",
                fontWeight: "600",
              }}
            >
              Application Deadline
            </label>

            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "20px",
                borderRadius: "8px",
                border: "1px solid #eae5db",
                fontSize: "15px",
                boxSizing: "border-box",
              }}
            />

            <label
              style={{
                display: "block",
                marginBottom: "8px",
                color: "#14342b",
                fontWeight: "600",
              }}
            >
              Eligibility
            </label>

            <textarea
              rows="4"
              placeholder="Enter eligibility criteria"
              value={eligibility}
              onChange={(e) => setEligibility(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "25px",
                borderRadius: "8px",
                border: "1px solid #eae5db",
                fontSize: "15px",
                resize: "vertical",
                boxSizing: "border-box",
              }}
            />

            <button
              type="submit"
              disabled={submitting}
              style={{
                width: "100%",
                padding: "13px",
                border: "none",
                borderRadius: "8px",
                backgroundColor: submitting ? "#9d8f89" : "#c2593f",
                color: "white",
                cursor: submitting ? "not-allowed" : "pointer",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              {submitting ? "Creating Scholarship..." : "Create Scholarship"}
            </button>

            <Link
              to="/admin"
              style={{
                display: "block",
                textAlign: "center",
                marginTop: "15px",
                color: "#14342b",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              ← Back to Admin Dashboard
            </Link>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default CreateScholarship;
