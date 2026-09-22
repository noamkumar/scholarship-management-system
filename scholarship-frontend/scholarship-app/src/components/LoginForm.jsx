import { useState } from "react";
import client from "../api/client";
import { useNavigate, Link } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("username", username);
      formData.append("password", password);

      const response = await client.post("/auth/login", formData);

      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("role", response.data.role);

      alert("Login Successful");

      navigate("/scholarships");
    } catch (error) {
      console.error(error);

      const message = error.response?.data?.detail || "Login Failed";

      alert(message);
    }
  };

  const handleForgotPassword = () => {
    alert("Please contact the administrator to reset your password.");
  };

  const isFormValid = username.trim() !== "" && password.trim() !== "";

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
            boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
            backgroundColor: "#fff",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            Login
          </h1>

          <form onSubmit={handleSubmit}>
            <div>
              <label>Username</label>

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  marginBottom: "15px",
                  borderRadius: "6px",
                  border: "1px solid #eae5db",
                }}
              />
            </div>

            <div>
              <label>Password</label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  marginBottom: "15px",
                  borderRadius: "6px",
                  border: "1px solid #eae5db",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={!isFormValid}
              style={{
                width: "100%",
                padding: "12px",
                border: "none",
                borderRadius: "6px",
                cursor: isFormValid ? "pointer" : "not-allowed",
                backgroundColor: isFormValid ? "#c2593f" : "#bdbdbd",
                color: "white",
                fontWeight: "bold",
                transition: "0.3s",
              }}
              onMouseOver={(e) => {
                if (isFormValid) {
                  e.target.style.backgroundColor = "#a94934";
                }
              }}
              onMouseOut={(e) => {
                if (isFormValid) {
                  e.target.style.backgroundColor = "#c2593f";
                }
              }}
            >
              Login
            </button>

            <div
              style={{
                textAlign: "center",
                marginTop: "15px",
              }}
            >
              <button
                type="button"
                onClick={handleForgotPassword}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  color: "#14342b",
                }}
              >
                Forgot Password?
              </button>
            </div>

            <div
              style={{
                textAlign: "center",
                marginTop: "15px",
              }}
            >
              <p>Don't have an account?</p>

              <Link
                to="/register"
                style={{
                  color: "#c2593f",
                  fontWeight: "600",
                }}
              >
                Register Here
              </Link>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default LoginForm;
