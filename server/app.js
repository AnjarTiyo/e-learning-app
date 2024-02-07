const express = require("express");
const cors = require("cors");
const compression = require("compression");
const app = express();
const PORT = process.env.SERVER_PORT || 5001;

// Middleware
app.use(cors());
app.use(compression());
app.use(express.json());

// Login
const authRoutes = require('./routes/authRoutes')
app.use('/', authRoutes)

// Profile
const profileRoutes = require('./routes/profileRoutes')
app.use('/', profileRoutes)


// Start App
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
