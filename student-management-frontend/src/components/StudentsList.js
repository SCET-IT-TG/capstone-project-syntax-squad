import React, { useEffect, useState, useCallback } from "react";
import "./StudentModal.css";

function StudentsList() {
  const [students, setStudents] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [selectedDPT, setSelectedDPT] = useState("");
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [studentToUpdate, setStudentToUpdate] = useState(null);




  const fetchDepartments = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/students/departments`, {
        credentials: "include",
      });

      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }

      const data = await res.json();
      setDepartments(data);
    } catch (error) {
      console.error("Failed to fetch departments:", error);
    }
  };



  // const fetchStudents = async () => {
  //   try {
  //     let url = `${process.env.REACT_APP_BACKEND_URL}/students?page=${page}`;

  //     if (name) {
  //       url = `${process.env.REACT_APP_BACKEND_URL}/students/?name=${name}&page=${page}`;
  //     } else if (selectedDPT) {
  //       url = `${process.env.REACT_APP_BACKEND_URL}/students/filter/department?dpt=${selectedDPT}`;
  //     } else if (sortOrder) {
  //       url = `${process.env.REACT_APP_BACKEND_URL}/students/sort/${sortOrder}?page=${page}`;
  //     }

  //     const res = await fetch(url, {
  //       credentials: "include",
  //     });

  //     if (res.status === 401) {
  //       window.location.href = "/login";
  //       return;
  //     }

  //     const result = await res.json();

  //     setStudents(result.data || []);
  //     setPage(result.currentPage || 1);
  //     setTotalPages(result.totalPages || 1);
  //   } catch (error) {
  //     console.error("Failed to fetch students:", error);
  //   }
  // };


  const fetchStudents = useCallback(async () => {
    try {
      let url = `${process.env.REACT_APP_BACKEND_URL}/students?page=${page}`;

      if (name) {
        url = `${process.env.REACT_APP_BACKEND_URL}/students/?name=${name}&page=${page}`;
      } else if (selectedDPT) {
        url = `${process.env.REACT_APP_BACKEND_URL}/students/filter/department?dpt=${selectedDPT}`;
      } else if (sortOrder) {
        url = `${process.env.REACT_APP_BACKEND_URL}/students/sort/${sortOrder}?page=${page}`;
      }

      const res = await fetch(url, {
        credentials: "include",
      });

      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }

      const result = await res.json();

      setStudents(result.data || []);
      setPage(result.currentPage || 1);
      setTotalPages(result.totalPages || 1);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  }, [page, sortOrder, selectedDPT, name]);



  const handleDPTFilter = (dpt) => {
    setSelectedDPT(dpt);
    setSortOrder("");
    setName("");
    setPage(1);
  };


  const handlePageChange = (newPage) => {
    setPage(newPage);
  };


  const handleDelete = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/students/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      fetchStudents();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };


  const handleUpdate = (student) => {
    setStudentToUpdate(student);
    setShowUpdateForm(true);
  };


  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const { _id, name, Percentage, DPT } = studentToUpdate;

      await fetch(`${process.env.REACT_APP_BACKEND_URL}/students/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, Percentage, DPT }),
      });

      setShowUpdateForm(false);
      setStudentToUpdate(null);

      fetchStudents();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };


  useEffect(() => {
    fetchDepartments();
  }, []);


  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);



  return (
    <div style={listWrapper}>
      <div style={{ textAlign: "center", marginBottom: "25px" }}>
        <div>


          <div style={sortContainer}>
            <span style={sortLabel}>Sort by % :</span>

            <button
              onClick={() => {
                setSortOrder("asc");
                setSelectedDPT("");
                setName("");
                setPage(1);
              }}
              style={{
                ...sortBtn,
                ...(sortOrder === "asc" ? activeSortBtn : {}),
              }}
            >
              ⬆ Low → High
            </button>

            <button
              onClick={() => {
                setSortOrder("desc");
                setSelectedDPT("");
                setName("");
                setPage(1);
              }}
              style={{
                ...sortBtn,
                ...(sortOrder === "desc" ? activeSortBtn : {}),
              }}
            >
              ⬇ High → Low
            </button>

            <button
              onClick={() => setSortOrder("")}
              style={{
                ...sortBtn,
                ...(sortOrder === "" ? activeSortBtn : {}),
              }}
            >
              Clear
            </button>
          </div>


          <div style={dptContainer}>
            <span style={dptLabel}>Department :</span>

            <button
              onClick={() => handleDPTFilter("")}
              style={{
                ...dptChip,
                ...(selectedDPT === "" ? activeDptChip : {}),
              }}
            >
              All
            </button>

            {departments.map((dpt) => (
              <button
                key={dpt}
                onClick={() => handleDPTFilter(dpt)}
                style={{
                  ...dptChip,
                  ...(selectedDPT === dpt ? activeDptChip : {}),
                }}
              >
                {dpt}
              </button>
            ))}
          </div>


        </div>

        <input
          placeholder="🔍 Search Student"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ ...inputStyle, margin: "20px 0", width: "50%" }}
        />
      </div>

      <table style={tableStyle}>
        <thead>
          <tr style={tableHeadRow}>
            <th style={tableHeaderStyle}>#</th>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Percentage</th>
            <th style={tableHeaderStyle}>Department</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.length > 0 ? (
            students.map((student, index) => (
              <tr key={student._id} style={{ textAlign: "center" }}>
                <td style={tableCellStyle}>{(page - 1) * 10 + index + 1}</td>
                <td style={tableCellStyle}>{student.name}</td>
                <td style={tableCellStyle}>{student.Percentage}</td>
                <td style={tableCellStyle}>{student.DPT}</td>

                <td style={tableCellStyle}>
                  <div style={btndivstyle}>
                    <button
                      onClick={() => handleUpdate(student)}
                      style={{
                        ...buttonStyle,
                        background:
                          "linear-gradient(135deg, #22c55e, #16a34a)",
                      }}
                    >
                      Update
                    </button>

                    <button
                      onClick={() => handleDelete(student._id)}
                      style={{
                        ...buttonStyle,
                        background:
                          "linear-gradient(135deg, #ef4444, #dc2626)",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={emptyState}>
                No students found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ textAlign: "center", margin: "25px 0" }}>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          style={paginationBtnStyle(page === 1)}
        >
          Prev
        </button>

        <span style={{ margin: "0 10px", fontWeight: "bold", color: "#fff" }}>
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
          style={paginationBtnStyle(page >= totalPages)}
        >
          Next
        </button>
      </div>

      {showUpdateForm && (
        <div className="modal-backdrop">
          <form className="modal-form" onSubmit={handleUpdateSubmit}>
            <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#fff" }}>
              Update Student
            </h2>

            <input
              type="text"
              value={studentToUpdate.name}
              onChange={(e) =>
                setStudentToUpdate({
                  ...studentToUpdate,
                  name: e.target.value,
                })
              }
              placeholder="Name"
              required
              style={inputStyle}
            />

            <input
              type="number"
              value={studentToUpdate.Percentage}
              onChange={(e) =>
                setStudentToUpdate({
                  ...studentToUpdate,
                  Percentage: e.target.value,
                })
              }
              placeholder="Percentage"
              required
              style={inputStyle}
            />

            <input
              type="text"
              value={studentToUpdate.DPT}
              onChange={(e) =>
                setStudentToUpdate({
                  ...studentToUpdate,
                  DPT: e.target.value,
                })
              }
              placeholder="Department"
              required
              style={inputStyle}
            />

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="submit"
                style={{
                  ...buttonStyle,
                  background:
                    "linear-gradient(135deg, #22c55e, #16a34a)",
                  flex: 1,
                }}
              >
                Save
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowUpdateForm(false);
                  setStudentToUpdate(null);
                }}
                style={{
                  ...buttonStyle,
                  background:
                    "linear-gradient(135deg, #ef4444, #dc2626)",
                  flex: 1,
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default StudentsList;











// Styles
const listWrapper = {
  position: "relative",
  zIndex: 2,
  padding: "24px",
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(18px)",
  border: "1px solid rgba(255,255,255,0.18)",
  borderRadius: "22px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  animation: "fadeSlideIn 0.9s ease",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  background: "rgba(255,255,255,0.06)",
  borderRadius: "18px",
  overflow: "hidden",
};

const tableHeadRow = {
  background: "rgba(255,255,255,0.15)",
};

const tableHeaderStyle = {
  padding: "14px",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "#fff",
};

const tableCellStyle = {
  padding: "12px",
  border: "1px solid rgba(255,255,255,0.08)",
  color: "#fff",
};

const buttonStyle = {
  margin: "6px",
  padding: "10px 16px",
  background: "rgba(255,255,255,0.1)",
  color: "#fff",
  border: "1px solid rgba(255,255,255,0.18)",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "600",
};

const inputStyle = {
  width: "97%",
  padding: "14px 16px",
  border: "1px solid rgba(255,255,255,0.18)",
  borderRadius: "12px",
  fontSize: "16px",
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
  outline: "none",
};

const emptyState = {
  textAlign: "center",
  padding: "30px",
  color: "#cbd5e1",
};

const btndivstyle = {
  display: "flex",
  justifyContent: "center",
  gap: "16px",
};

const paginationBtnStyle = (disabled) => ({
  marginRight: "10px",
  padding: "10px 16px",
  background: disabled
    ? "rgba(255,255,255,0.08)"
    : "linear-gradient(135deg, #3b82f6, #2563eb)",
  color: "#fff",
  cursor: disabled ? "not-allowed" : "pointer",
  border: "none",
  borderRadius: "10px",
  opacity: disabled ? 0.6 : 1,
});



const sortContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "12px",
  marginBottom: "15px",
  flexWrap: "wrap",
};

const sortLabel = {
  color: "#fff",
  fontWeight: "600",
  marginRight: "8px",
};

const sortBtn = {
  padding: "10px 18px",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "600",
  transition: "all 0.3s ease",
};

const activeSortBtn = {
  background: "linear-gradient(135deg, #3b82f6, #2563eb)",
  transform: "scale(1.05)",
};





const dptContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "10px",
  marginTop: "10px",
};

const dptLabel = {
  color: "#fff",
  fontWeight: "600",
  marginRight: "8px",
};

const dptChip = {
  padding: "8px 16px",
  borderRadius: "20px",
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(255,255,255,0.08)",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "500",
  transition: "all 0.25s ease",
};

const activeDptChip = {
  background: "linear-gradient(135deg, #a855f7, #7c3aed)",
  boxShadow: "0 0 10px rgba(168,85,247,0.6)",
  transform: "scale(1.05)",
};