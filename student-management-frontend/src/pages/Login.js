import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
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
      alert("Login failed");
    }
  };

  return (
    <div style={pageWrapper}>
      <div style={backgroundGlow}></div>

      <form onSubmit={handleSubmit} style={formCard}>
        <h1 style={heading}>Welcome Back 👋</h1>
        <p style={subText}>Login to continue managing your students</p>

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
          placeholder="Enter your password"
          required
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>Login</button>

        <p style={footerText}>
          Don&apos;t have an account?{" "}
          <Link to="/signup" style={linkStyle}>Signup</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;

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
    "radial-gradient(circle, rgba(99,102,241,0.4) 0%, rgba(99,102,241,0) 70%)",
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
  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
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
  color: "#a5b4fc",
  textDecoration: "none",
  fontWeight: "600",
};
