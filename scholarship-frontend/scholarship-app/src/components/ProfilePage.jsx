import { useEffect, useState } from "react";
import client from "../api/client";
import Header from "./Header";
import Footer from "./Footer";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await client.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
    } catch (error) {
      console.error(error);

      setErrorMessage(
        error.response?.data?.detail || "Unable to load profile.",
      );
    }
  };

  const uploadProfilePicture = async () => {
    if (!selectedFile) {
      alert("Please select an image first.");
      return;
    }

    try {
      setUploading(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("file", selectedFile);

      await client.post("/auth/upload-profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile Picture Uploaded Successfully");

      setSelectedFile(null);
      setShowEdit(false);

      fetchProfile();
    } catch (error) {
      console.error(error);

      const message =
        error.response?.data?.detail || "Profile Picture Upload Failed";

      alert(message);
    } finally {
      setUploading(false);
    }
  };

  if (errorMessage) {
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
              color: "#c2593f",
            }}
          >
            {errorMessage}
          </h2>
        </div>

        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#fdfbf7",
        }}
      >
        <Header />

        <h2
          style={{
            textAlign: "center",
            marginTop: "60px",
            color: "#14342b",
          }}
        >
          Loading Profile...
        </h2>

        <Footer />
      </div>
    );
  }

  const apiUrl = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

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
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "50px 20px",
        }}
      >
        <div
          style={{
            width: "450px",
            maxWidth: "100%",
            padding: "35px",
            borderRadius: "16px",
            border: "1px solid #eae5db",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            textAlign: "center",
            backgroundColor: "#ffffff",
          }}
        >
          {/* PROFILE IMAGE */}

          <div
            style={{
              marginBottom: "20px",
            }}
          >
            {user.profile_image ? (
              <img
                src={`${apiUrl}/uploads/${user.profile_image}`}
                alt="Profile"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "4px solid #f6e8c3",
                }}
              />
            ) : (
              <div
                style={{
                  width: "120px",
                  height: "120px",
                  margin: "0 auto",
                  borderRadius: "50%",
                  backgroundColor: "#f6e8c3",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "65px",
                }}
              >
                👤
              </div>
            )}
          </div>

          {/* PROFILE TITLE */}

          <h1
            style={{
              color: "#14342b",
              marginBottom: "10px",
            }}
          >
            My Profile
          </h1>

          <h2
            style={{
              color: "#5f5754",
              fontSize: "20px",
              marginBottom: "25px",
            }}
          >
            Welcome, {user.username}
          </h2>

          <hr
            style={{
              border: "none",
              borderTop: "1px solid #eae5db",
              marginBottom: "20px",
            }}
          />

          {/* USER DETAILS */}

          <div
            style={{
              textAlign: "left",
              lineHeight: "1.8",
            }}
          >
            <p>
              <strong>ID:</strong> {user.id}
            </p>

            <p>
              <strong>Username:</strong> {user.username}
            </p>

            <p>
              <strong>Role:</strong>{" "}
              <span
                style={{
                  display: "inline-block",
                  backgroundColor:
                    user.role === "admin" ? "#14342b" : "#c2593f",
                  color: "white",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontWeight: "600",
                  textTransform: "capitalize",
                }}
              >
                {user.role}
              </span>
            </p>
          </div>

          <hr
            style={{
              border: "none",
              borderTop: "1px solid #eae5db",
              margin: "25px 0",
            }}
          />

          {/* EDIT PROFILE */}

          <button
            onClick={() => setShowEdit(!showEdit)}
            style={{
              width: "100%",
              padding: "12px",
              border: "none",
              borderRadius: "8px",
              backgroundColor: "#14342b",
              color: "#f6e8c3",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "15px",
            }}
          >
            {showEdit ? "✖ Close Edit Profile" : "✏️ Edit Profile"}
          </button>

          {showEdit && (
            <div
              style={{
                marginTop: "25px",
                padding: "20px",
                backgroundColor: "#f6e8c3",
                borderRadius: "12px",
                textAlign: "left",
              }}
            >
              <h3
                style={{
                  textAlign: "center",
                  color: "#14342b",
                  marginTop: "0",
                }}
              >
                Change Profile Picture
              </h3>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                style={{
                  width: "100%",
                  marginBottom: "15px",
                }}
              />

              {selectedFile && (
                <p
                  style={{
                    fontSize: "14px",
                    color: "#5f5754",
                  }}
                >
                  Selected: {selectedFile.name}
                </p>
              )}

              <button
                onClick={uploadProfilePicture}
                disabled={uploading}
                style={{
                  width: "100%",
                  padding: "11px",
                  border: "none",
                  borderRadius: "8px",
                  backgroundColor: uploading ? "#9d8f89" : "#c2593f",
                  color: "white",
                  cursor: uploading ? "not-allowed" : "pointer",
                  fontWeight: "600",
                }}
              >
                {uploading ? "Uploading..." : "📤 Upload Picture"}
              </button>
            </div>
          )}

          {/* ACCOUNT STATUS */}

          <div
            style={{
              marginTop: "25px",
              padding: "18px",
              backgroundColor: "#f6e8c3",
              borderRadius: "10px",
            }}
          >
            <h3
              style={{
                color: "#14342b",
                marginTop: "0",
              }}
            >
              Account Status
            </h3>

            <p
              style={{
                color: "#14342b",
                fontWeight: "600",
                marginBottom: "0",
              }}
            >
              ✅ Active User
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ProfilePage;
