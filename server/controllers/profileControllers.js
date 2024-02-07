const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
require('dotenv').config()

const getUsersFromFile = () => {
  const filePath = path.join(__dirname, "..", "data", "users.json");
  try {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading users file:", error);
    return [];
  }
};

const getProfile = (req, res) => {
  const token = req.headers.authorization.split(" ")[1]; // Assuming token is in the format: Bearer <token>

  const users = getUsersFromFile();

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Retrieve the user profile based on the decoded information
    const user = users.find((user) => user.id === decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user profile data
    res.json({ id: user.id, name: user.name, role: user.role });
  } catch (error) {
    console.error("Error decoding token:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { getProfile };
