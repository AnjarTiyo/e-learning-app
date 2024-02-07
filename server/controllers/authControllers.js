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

// Login function
exports.login = (req, res) => {
  const { username, password } = req.body;

  // Read users from users.json file
  const users = getUsersFromFile();

  // Find user by username
  const user = users.find((user) => user.username === username);
  if (!user)
    return res.status(401).json({ message: "Invalid username or password" });

  // Compare passwords
  if (user.password !== password)
    return res.status(401).json({ message: "Invalid username or password" });

  // Generate JWT token
  const token = jwt.sign(
    { id: user.id, username: user.username, name: user.name },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );

  // Calculate expiration time
  const currentTime = Date.now();
  const oneHourLater = currentTime + 1 * 60 * 60 * 1000;
  const oneHourLaterDate = new Date(oneHourLater);

  // Send token and expiration time in response
  res.json({ token, role: user.role, expiresIn: oneHourLaterDate  });
};
