const express = require("express");
const { getProfile } = require("../controllers/profileControllers");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

// Route to get user profile
router.get("/profile", verifyToken, getProfile);

module.exports = router;
