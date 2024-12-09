
require("dotenv").config();
const express = require("express");
const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");



const app = express();
app.use(express.json()); // Parse JSON bodies

const cors = require('cors');
app.use(cors()); 

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
})

// Use Auth routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/assignment",assignmentRoutes);

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(process.env.PORT || 5000, () => console.log(`Server started at http://localhost:5000`));
}
 );  
