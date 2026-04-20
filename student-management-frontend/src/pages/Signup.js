import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Signup failed");
    }
  };

  return (
    <div style={pageWrapper}>
      <div style={backgroundGlow}></div>

      <form onSubmit={handleSubmit} style={formCard}>
        <h1 style={heading}>Create Account ✨</h1>
        <p style={subText}>Signup to manage your students securely</p>

        <input
          type="text"
          placeholder="Enter your name"
          required
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Enter your email"
          required
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Create password"
          required
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>Signup</button>

        <p style={footerText}>
          Already have an account?{" "}
          <Link to="/login" style={linkStyle}>Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;

// styles
const pageWrapper = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #0f172a, #1e293b, #334155)",
  position: "relative",
  overflow: "hidden",
};

const backgroundGlow = {
  position: "absolute",
  width: "500px",
  height: "500px",
  background:
    "radial-gradient(circle, rgba(16,185,129,0.35) 0%, rgba(16,185,129,0) 70%)",
  filter: "blur(80px)",
};

const formCard = {
  position: "relative",
  zIndex: 2,
  width: "420px",
  padding: "40px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(16px)",
  border: "1px solid rgba(255,255,255,0.2)",
  boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
};

const heading = {
  fontSize: "32px",
  fontWeight: "700",
  color: "#fff",
  marginBottom: "10px",
  textAlign: "center",
};

const subText = {
  textAlign: "center",
  color: "#cbd5e1",
  marginBottom: "30px",
};

const inputStyle = {
  width: "94%",
  padding: "14px 16px",
  marginBottom: "18px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
  fontSize: "16px",
  outline: "none",
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  background: "linear-gradient(135deg, #10b981, #059669)",
  color: "#fff",
  fontSize: "17px",
  fontWeight: "600",
  cursor: "pointer",
};

const footerText = {
  marginTop: "20px",
  textAlign: "center",
  color: "#cbd5e1",
};

const linkStyle = {
  color: "#86efac",
  textDecoration: "none",
  fontWeight: "600",
};
