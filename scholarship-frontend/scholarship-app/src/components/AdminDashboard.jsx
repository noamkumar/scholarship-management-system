import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import client from "../api/client";
import Header from "./Header";
import Footer from "./Footer";

function AdminDashboard() {
  const [applications, setApplications] = useState([]);
  const [scholarships, setScholarships] = useState([]);
  const [users, setUsers] = useState([]);

  const [showScholarships, setShowScholarships] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showApplications, setShowApplications] = useState(false);

  const [notification, setNotification] = useState("");
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    users: 0,
    scholarships: 0,
    applications: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllData();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchAllData = async () => {
    setLoading(true);

    await Promise.all([
      fetchApplications(),
      fetchScholarships(),
      fetchStats(),
      fetchUsers(),
    ]);

    setLoading(false);
  };

  const fetchStats = async () => {
    try {
      const response = await client.get("/dashboard/stats");

      setStats({
        users: response.data.users || 0,
        scholarships: response.data.scholarships || 0,
        applications: response.data.applications || 0,
        approved: response.data.approved || 0,
        rejected: response.data.rejected || 0,
        pending: response.data.pending || 0,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await client.get("/applications", {
        headers: getAuthHeaders(),
      });

      setApplications(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchScholarships = async () => {
    try {
      const response = await client.get("/scholarship");

      setScholarships(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await client.get("/auth/users", {
        headers: getAuthHeaders(),
      });

      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const promoteUser = async (username) => {
    try {
      await client.put(
        "/auth/promote",
        {
          username,
        },
        {
          headers: getAuthHeaders(),
        },
      );

      alert(`${username} promoted to admin`);

      fetchUsers();
    } catch (error) {
      console.error(error);

      const message = error.response?.data?.detail || "Unable to promote user.";

      alert(message);
    }
  };

  const demoteUser = async (username) => {
    try {
      await client.put(
        "/auth/demote",
        {
          username,
        },
        {
          headers: getAuthHeaders(),
        },
      );

      alert(`${username} demoted to user`);

      fetchUsers();
    } catch (error) {
      console.error(error);

      const message = error.response?.data?.detail || "Unable to demote user.";

      alert(message);
    }
  };

  const updateStatus = async (applicationId, status) => {
    try {
      await client.put(
        `/applications/${applicationId}/status`,
        {
          status,
        },
        {
          headers: getAuthHeaders(),
        },
      );

      setNotification(`Application #${applicationId} ${status}`);

      alert(`Application ${status}`);

      fetchApplications();
      fetchStats();
    } catch (error) {
      console.error(error);

      const message =
        error.response?.data?.detail || "Unable to update application status.";

      alert(message);
    }
  };

  const deleteScholarship = async (scholarshipId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this scholarship?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await client.delete(`/scholarship/${scholarshipId}`, {
        headers: getAuthHeaders(),
      });

      alert("Scholarship Deleted Successfully");

      fetchScholarships();
      fetchStats();
    } catch (error) {
      console.error(error);

      const message = error.response?.data?.detail || "Delete Failed";

      alert(message);
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
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        {/* TITLE */}

        <h1
          style={{
            textAlign: "center",
            color: "#14342b",
            marginBottom: "30px",
          }}
        >
          Admin Dashboard
        </h1>

        {/* NOTIFICATION */}

        {notification && (
          <div
            style={{
              backgroundColor: "#f6e8c3",
              color: "#14342b",
              padding: "14px 18px",
              marginBottom: "25px",
              borderRadius: "10px",
              border: "1px solid #eae5db",
              fontWeight: "600",
            }}
          >
            🔔 {notification}
          </div>
        )}

        {/* LOADING */}

        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              color: "#14342b",
            }}
          >
            <h2>Loading Dashboard...</h2>
          </div>
        ) : (
          <>
            {/* STATISTICS */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
                gap: "18px",
                marginBottom: "35px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #eae5db",
                  borderRadius: "14px",
                  padding: "20px",
                  textAlign: "center",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
                }}
              >
                <h2
                  style={{
                    color: "#14342b",
                    fontSize: "30px",
                    margin: "0 0 8px",
                  }}
                >
                  {stats.users}
                </h2>

                <p
                  style={{
                    margin: "0",
                    color: "#5f5754",
                    fontWeight: "600",
                  }}
                >
                  Users
                </p>
              </div>

              <div
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #eae5db",
                  borderRadius: "14px",
                  padding: "20px",
                  textAlign: "center",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
                }}
              >
                <h2
                  style={{
                    color: "#14342b",
                    fontSize: "30px",
                    margin: "0 0 8px",
                  }}
                >
                  {stats.scholarships}
                </h2>

                <p
                  style={{
                    margin: "0",
                    color: "#5f5754",
                    fontWeight: "600",
                  }}
                >
                  Scholarships
                </p>
              </div>

              <div
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #eae5db",
                  borderRadius: "14px",
                  padding: "20px",
                  textAlign: "center",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
                }}
              >
                <h2
                  style={{
                    color: "#14342b",
                    fontSize: "30px",
                    margin: "0 0 8px",
                  }}
                >
                  {stats.applications}
                </h2>

                <p
                  style={{
                    margin: "0",
                    color: "#5f5754",
                    fontWeight: "600",
                  }}
                >
                  Applications
                </p>
              </div>

              <div
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #eae5db",
                  borderRadius: "14px",
                  padding: "20px",
                  textAlign: "center",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
                }}
              >
                <h2
                  style={{
                    color: "#14342b",
                    fontSize: "30px",
                    margin: "0 0 8px",
                  }}
                >
                  {stats.approved}
                </h2>

                <p
                  style={{
                    margin: "0",
                    color: "#5f5754",
                    fontWeight: "600",
                  }}
                >
                  Approved
                </p>
              </div>

              <div
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #eae5db",
                  borderRadius: "14px",
                  padding: "20px",
                  textAlign: "center",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
                }}
              >
                <h2
                  style={{
                    color: "#c2593f",
                    fontSize: "30px",
                    margin: "0 0 8px",
                  }}
                >
                  {stats.rejected}
                </h2>

                <p
                  style={{
                    margin: "0",
                    color: "#5f5754",
                    fontWeight: "600",
                  }}
                >
                  Rejected
                </p>
              </div>

              <div
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #eae5db",
                  borderRadius: "14px",
                  padding: "20px",
                  textAlign: "center",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
                }}
              >
                <h2
                  style={{
                    color: "#8a6d1d",
                    fontSize: "30px",
                    margin: "0 0 8px",
                  }}
                >
                  {stats.pending}
                </h2>

                <p
                  style={{
                    margin: "0",
                    color: "#5f5754",
                    fontWeight: "600",
                  }}
                >
                  Pending
                </p>
              </div>
            </div>

            {/* CREATE SCHOLARSHIP */}

            <div
              style={{
                marginBottom: "25px",
                textAlign: "center",
              }}
            >
              <Link to="/admin/create-scholarship">
                <button
                  style={{
                    padding: "13px 25px",
                    border: "none",
                    borderRadius: "8px",
                    backgroundColor: "#c2593f",
                    color: "white",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  ➕ Create Scholarship
                </button>
              </Link>
            </div>

            {/* SCHOLARSHIP MANAGEMENT */}

            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "14px",
                border: "1px solid #eae5db",
                marginBottom: "20px",
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => setShowScholarships(!showScholarships)}
                style={{
                  width: "100%",
                  padding: "18px",
                  border: "none",
                  backgroundColor: "#14342b",
                  color: "#f6e8c3",
                  fontSize: "18px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                🎓 Scholarship Management {showScholarships ? "▲" : "▼"}
              </button>

              {showScholarships && (
                <div style={{ padding: "20px" }}>
                  {scholarships.length === 0 ? (
                    <p
                      style={{
                        textAlign: "center",
                        color: "#5f5754",
                      }}
                    >
                      No scholarships found.
                    </p>
                  ) : (
                    scholarships.map((scholarship) => (
                      <div
                        key={scholarship.id}
                        style={{
                          border: "1px solid #eae5db",
                          padding: "18px",
                          marginBottom: "15px",
                          borderRadius: "10px",
                          backgroundColor: "#fdfbf7",
                        }}
                      >
                        <h3
                          style={{
                            color: "#14342b",
                            marginTop: "0",
                          }}
                        >
                          {scholarship.name}
                        </h3>

                        <p>
                          <strong>Amount:</strong> ₹{scholarship.amount}
                        </p>

                        <p>
                          <strong>Deadline:</strong> {scholarship.deadline}
                        </p>

                        <button
                          onClick={() =>
                            navigate(
                              `/admin/edit-scholarship/${scholarship.id}`,
                            )
                          }
                          style={{
                            padding: "9px 16px",
                            border: "none",
                            borderRadius: "7px",
                            backgroundColor: "#14342b",
                            color: "#f6e8c3",
                            cursor: "pointer",
                            fontWeight: "600",
                          }}
                        >
                          ✏️ Edit
                        </button>

                        <button
                          onClick={() => deleteScholarship(scholarship.id)}
                          style={{
                            marginLeft: "10px",
                            padding: "9px 16px",
                            border: "none",
                            borderRadius: "7px",
                            backgroundColor: "#c2593f",
                            color: "white",
                            cursor: "pointer",
                            fontWeight: "600",
                          }}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* USER MANAGEMENT */}

            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "14px",
                border: "1px solid #eae5db",
                marginBottom: "20px",
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => setShowUsers(!showUsers)}
                style={{
                  width: "100%",
                  padding: "18px",
                  border: "none",
                  backgroundColor: "#14342b",
                  color: "#f6e8c3",
                  fontSize: "18px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                👥 User Management {showUsers ? "▲" : "▼"}
              </button>

              {showUsers && (
                <div style={{ padding: "20px" }}>
                  {users.length === 0 ? (
                    <p
                      style={{
                        textAlign: "center",
                        color: "#5f5754",
                      }}
                    >
                      No users found.
                    </p>
                  ) : (
                    users.map((user) => (
                      <div
                        key={user.id}
                        style={{
                          border: "1px solid #eae5db",
                          padding: "18px",
                          marginBottom: "15px",
                          borderRadius: "10px",
                          backgroundColor: "#fdfbf7",
                        }}
                      >
                        <p>
                          <strong>Username:</strong> {user.username}
                        </p>

                        <p>
                          <strong>Role:</strong>{" "}
                          <span
                            style={{
                              fontWeight: "600",
                              color:
                                user.role === "admin" ? "#14342b" : "#c2593f",
                            }}
                          >
                            {user.role}
                          </span>
                        </p>

                        {user.role === "user" ? (
                          <button
                            onClick={() => promoteUser(user.username)}
                            style={{
                              padding: "9px 16px",
                              border: "none",
                              borderRadius: "7px",
                              backgroundColor: "#14342b",
                              color: "#f6e8c3",
                              cursor: "pointer",
                              fontWeight: "600",
                            }}
                          >
                            Promote To Admin
                          </button>
                        ) : (
                          user.username !== "noamkumar" && (
                            <button
                              onClick={() => demoteUser(user.username)}
                              style={{
                                padding: "9px 16px",
                                border: "none",
                                borderRadius: "7px",
                                backgroundColor: "#c2593f",
                                color: "white",
                                cursor: "pointer",
                                fontWeight: "600",
                              }}
                            >
                              Demote To User
                            </button>
                          )
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* APPLICATION MANAGEMENT */}

            <div
              style={{
                backgroundColor: "#ffffff",
                borderRadius: "14px",
                border: "1px solid #eae5db",
                marginBottom: "30px",
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => setShowApplications(!showApplications)}
                style={{
                  width: "100%",
                  padding: "18px",
                  border: "none",
                  backgroundColor: "#14342b",
                  color: "#f6e8c3",
                  fontSize: "18px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                📄 Application Management {showApplications ? "▲" : "▼"}
              </button>

              {showApplications && (
                <div style={{ padding: "20px" }}>
                  {applications.length === 0 ? (
                    <p
                      style={{
                        textAlign: "center",
                        color: "#5f5754",
                      }}
                    >
                      No Applications Found
                    </p>
                  ) : (
                    applications.map((app) => (
                      <div
                        key={app.id}
                        style={{
                          border: "1px solid #eae5db",
                          padding: "20px",
                          marginBottom: "15px",
                          borderRadius: "10px",
                          backgroundColor: "#fdfbf7",
                        }}
                      >
                        <h3
                          style={{
                            color: "#14342b",
                            marginTop: "0",
                          }}
                        >
                          Application #{app.id}
                        </h3>

                        <p>
                          <strong>User ID:</strong> {app.user_id}
                        </p>

                        <p>
                          <strong>Scholarship ID:</strong> {app.scholarship_id}
                        </p>

                        <p>
                          <strong>Status:</strong>{" "}
                          <span
                            style={{
                              fontWeight: "600",
                              color:
                                app.status === "Approved"
                                  ? "#14342b"
                                  : app.status === "Rejected"
                                    ? "#c2593f"
                                    : "#8a6d1d",
                            }}
                          >
                            {app.status}
                          </span>
                        </p>

                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            flexWrap: "wrap",
                            marginTop: "15px",
                          }}
                        >
                          <button
                            onClick={() => updateStatus(app.id, "Approved")}
                            disabled={app.status === "Approved"}
                            style={{
                              padding: "9px 18px",
                              border: "none",
                              borderRadius: "7px",
                              backgroundColor:
                                app.status === "Approved"
                                  ? "#9d8f89"
                                  : "#14342b",
                              color:
                                app.status === "Approved"
                                  ? "#ffffff"
                                  : "#f6e8c3",
                              cursor:
                                app.status === "Approved"
                                  ? "not-allowed"
                                  : "pointer",
                              fontWeight: "600",
                            }}
                          >
                            ✅ Approve
                          </button>

                          <button
                            onClick={() => updateStatus(app.id, "Rejected")}
                            disabled={app.status === "Rejected"}
                            style={{
                              padding: "9px 18px",
                              border: "none",
                              borderRadius: "7px",
                              backgroundColor:
                                app.status === "Rejected"
                                  ? "#9d8f89"
                                  : "#c2593f",
                              color: "white",
                              cursor:
                                app.status === "Rejected"
                                  ? "not-allowed"
                                  : "pointer",
                              fontWeight: "600",
                            }}
                          >
                            ❌ Reject
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default AdminDashboard;
