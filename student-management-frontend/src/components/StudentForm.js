import React, { useState } from "react";

const StudentForm = ({ onUserCreated }) => {
  const [studentData, setStudentData] = useState({
    name: "",
    Percentage: "",
    DPT: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/students/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(studentData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to create student");
        return;
      }

      setStudentData({
        name: "",
        Percentage: "",
        DPT: "",
      });

      if (onUserCreated) {
        onUserCreated();
      }
    } catch (err) {
      console.error("Failed to create student:", err);
      alert("Error adding student");
    }
  };

  return (
    <>
      <h1 style={h1style}>📋 Student Management Dashboard</h1>

      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={formHeading}>Add New Student</h2>

        <div style={centerFields}>
          <div style={{ marginBottom: "18px", width: "60%" }}>
            <input
              type="text"
              placeholder="Enter Student Name"
              value={studentData.name}
              onChange={(e) =>
                setStudentData({ ...studentData, name: e.target.value })
              }
              style={inputStyle}
              required
            />
          </div>

          <div style={{ marginBottom: "18px", width: "60%" }}>
            <input
              type="number"
              placeholder="Enter Percentage"
              value={studentData.Percentage}
              onChange={(e) =>
                setStudentData({ ...studentData, Percentage: e.target.value })
              }
              style={inputStyle}
              required
            />
          </div>

          <div style={{ marginBottom: "18px", width: "60%" }}>
            <input
              type="text"
              placeholder="Enter Department"
              value={studentData.DPT}
              onChange={(e) =>
                setStudentData({ ...studentData, DPT: e.target.value })
              }
              style={inputStyle}
              required
            />
          </div>

          <button type="submit" style={submitStyle}>
            ➕ Add Student
          </button>
        </div>
      </form>
    </>
  );
};

export default StudentForm;

// ---------------- Styles ----------------

const h1style = {
  fontSize: "40px",
  fontWeight: "700",
  textAlign: "center",
  color: "#fff",
  marginBottom: "30px",
  animation: "fadeSlideIn 0.6s ease",
};

const formHeading = {
  fontSize: "24px",
  marginBottom: "22px",
  color: "#fff",
  textAlign: "center",
};

const formStyle = {
  position: "relative",
  zIndex: 2,
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  border: "1px solid rgba(255,255,255,0.18)",
  padding: "28px",
  marginBottom: "35px",
  borderRadius: "22px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
  animation: "fadeSlideIn 0.8s ease",
};

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  border: "1px solid rgba(255,255,255,0.18)",
  borderRadius: "12px",
  fontSize: "16px",
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
  outline: "none",
  transition: "all 0.3s ease",
};

const submitStyle = {
  width: "30%",
  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
  color: "#fff",
  padding: "14px 20px",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "17px",
  transition: "all 0.3s ease",
  boxShadow: "0 6px 20px rgba(99,102,241,0.25)",
};

const centerFields = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};