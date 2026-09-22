import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import client from "../api/client";
import Header from "./Header";
import Footer from "./Footer";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await client.post("/auth/register", {
        username,
        password,
      });

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      console.error(error);

      const message = error.response?.data?.detail || "Registration Failed";

      alert(message);
    }
  };

  return (
    <div>
      <Header />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <div
          style={{
            width: "400px",
            padding: "30px",
            borderRadius: "12px",
            backgroundColor: "#fff",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            Register
          </h1>

          <form onSubmit={handleSubmit}>
            <label>Username</label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                marginBottom: "15px",
                borderRadius: "6px",
                border: "1px solid #eae5db",
              }}
            />

            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                marginBottom: "15px",
                borderRadius: "6px",
                border: "1px solid #eae5db",
              }}
            />

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                border: "none",
                borderRadius: "6px",
                backgroundColor: "#c2593f",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "0.3s",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#a94934";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#c2593f";
              }}
            >
              Register
            </button>

            <div
              style={{
                textAlign: "center",
                marginTop: "15px",
              }}
            >
              <p>Already have an account?</p>

              <Link
                to="/login"
                style={{
                  color: "#c2593f",
                  fontWeight: "600",
                }}
              >
                Login Here
              </Link>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default RegisterForm;
