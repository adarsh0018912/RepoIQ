const express = require("express");
const cors = require("cors");
const repositoryRoutes = require("./routes/repositoryRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Repository routes
app.use("/api/repositories", repositoryRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("RepoIQ Backend is running!");
});

module.exports = app;