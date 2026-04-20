const express = require("express");
const router = express.Router();
const User = require("../models/user");
const authMiddleware = require("../middleware/authMiddleware");

// Protect all student routes
router.use(authMiddleware);

// Get students with search + pagination (only logged-in user's data)
const getFilteredStudents = async (req, res) => {
  try {
    const { page = 1, limit = 5, name = "" } = req.query;

    let searchQuery = {
      userId: req.user.id,
    };

    if (name) {
      const regex = new RegExp(name, "i");
      searchQuery.name = { $regex: regex };
    }

    const students = await User.find(searchQuery)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await User.countDocuments(searchQuery);

    res.json({
      data: students,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ error: "Failed to fetch students" });
  }
};

// Get all students
router.get("/", async (req, res) => {
  getFilteredStudents(req, res);
});

// Sort by percentage
router.get("/sort/:order", async (req, res) => {
  try {
    const { order } = req.params;
    const sortOption = order === "desc" ? -1 : 1;
    const { page = 1, limit = 5 } = req.query;

    const students = await User.find({ userId: req.user.id })
      .sort({ Percentage: sortOption })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await User.countDocuments({ userId: req.user.id });

    res.json({
      data: students,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ error: "Sorting failed" });
  }
});

// Filter by department
router.get("/filter/department", async (req, res) => {
  try {
    const { dpt } = req.query;

    const students = await User.find({
      userId: req.user.id,
      DPT: dpt,
    });

    res.json({ data: students });
  } catch (err) {
    console.error("Error filtering students:", err);
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

// Add student
router.post("/submit", async (req, res) => {
  const { name, Percentage, DPT } = req.body;

  if (!name || !Percentage || !DPT) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = new User({
      name,
      Percentage,
      DPT,
      userId: req.user.id,
    });

    await user.save();

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update student
router.put("/:id", async (req, res) => {
  const { name, Percentage, DPT } = req.body;

  try {
    const updated = await User.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      {
        name,
        Percentage,
        DPT,
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete student
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await User.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get distinct departments (only user's students)
router.get("/departments", async (req, res) => {
  try {
    const departments = await User.distinct("DPT", {
      userId: req.user.id,
    });

    res.json(departments);
  } catch (err) {
    res.status(500).json({ error: "Failed to get departments" });
  }
});



module.exports = { userrouter: router };
