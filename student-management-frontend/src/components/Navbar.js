import React, { useEffect, useState } from "react";

function Navbar() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/me`, {
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok) {
          setUserName(data.user.name || "User");
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav style={navStyle}>
      {/* Logo / Title */}
      <div style={logoWrapper}>
        <span style={logoIcon}>🎓</span>
        <span style={logoText}>Student Management</span>
      </div>

      {/* Right Side */}
      <div style={rightSection}>
        <div style={welcomeBox}>
          <span style={welcomeText}>
            Welcome, <strong>{userName || "User"}</strong>
          </span>
        </div>

        <button onClick={handleLogout} style={logoutBtn}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;

// ---------------- Styles ----------------

const navStyle = {
  position: "relative",
  zIndex: 2,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "rgba(255, 255, 255, 0.08)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  color: "white",
  padding: "18px 26px",
  borderRadius: "20px",
  marginBottom: "30px",
  boxShadow: "0 8px 25px rgba(0,0,0,0.25)",
  animation: "fadeSlideIn 0.7s ease",
};

const logoWrapper = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const logoIcon = {
  fontSize: "28px",
};

const logoText = {
  fontSize: "24px",
  fontWeight: "700",
  letterSpacing: "0.5px",
};

const rightSection = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
};

const welcomeBox = {
  padding: "10px 16px",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.12)",
};

const welcomeText = {
  fontSize: "17px",
  color: "#e2e8f0",
};

const logoutBtn = {
  background: "linear-gradient(135deg, #ef4444, #dc2626)",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "15px",
  boxShadow: "0 4px 14px rgba(239,68,68,0.25)",
  transition: "all 0.3s ease",
};