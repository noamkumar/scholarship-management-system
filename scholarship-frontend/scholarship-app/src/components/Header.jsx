import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Header() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    localStorage.clear();

    setShowMenu(false);

    navigate("/");
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <header
      className="header"
      style={{
        position: "relative",
      }}
    >
      {/* LOGO / TITLE */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            fontSize: "24px",
          }}
        >
          🏠
        </Link>

        <h2>Scholarship Management System</h2>
      </div>

      {/* NAVIGATION */}

      <div>
        <Link to="/">
          <button className="nav-btn">Home</button>
        </Link>

        {/* LOGIN / REGISTER */}

        {!role && (
          <>
            <Link to="/login">
              <button className="nav-btn">Login</button>
            </Link>

            <Link to="/register">
              <button className="nav-btn">Register</button>
            </Link>
          </>
        )}

        {/* THREE DOT MENU */}

        <button
          className="nav-btn"
          onClick={() => setShowMenu(!showMenu)}
          aria-label="Open menu"
        >
          ⋮
        </button>

        {showMenu && (
          <>
            {/* BACKGROUND OVERLAY */}

            <div
              onClick={closeMenu}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.3)",
                zIndex: 999,
              }}
            />

            {/* MENU */}

            <div
              style={{
                position: "fixed",
                top: "70px",
                right: "15px",
                width: "220px",
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
                padding: "15px",
                zIndex: 1000,
              }}
            >
              {/* PROFILE */}

              {role && (
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  style={{
                    display: "block",
                    padding: "12px",
                    textDecoration: "none",
                    color: "#333",
                  }}
                >
                  👤 Profile
                </Link>
              )}

              {/* SCHOLARSHIPS */}

              <Link
                to="/scholarships"
                onClick={closeMenu}
                style={{
                  display: "block",
                  padding: "12px",
                  textDecoration: "none",
                  color: "#333",
                }}
              >
                🎓 Scholarships
              </Link>

              {/* APPLICATIONS */}

              {role && (
                <Link
                  to="/applications"
                  onClick={closeMenu}
                  style={{
                    display: "block",
                    padding: "12px",
                    textDecoration: "none",
                    color: "#333",
                  }}
                >
                  📄 My Applications
                </Link>
              )}

              {/* ADMIN */}

              {role === "admin" && (
                <Link
                  to="/admin"
                  onClick={closeMenu}
                  style={{
                    display: "block",
                    padding: "12px",
                    textDecoration: "none",
                    color: "#333",
                  }}
                >
                  ⚙️ Admin Dashboard
                </Link>
              )}

              {/* LOGOUT */}

              {role && (
                <>
                  <hr />

                  <button
                    onClick={handleLogout}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    🚪 Logout
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
