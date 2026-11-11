const express = require("express");
const cors = require("cors");
const repositoryRoutes = require("./routers/repositoryRoutes");
const documentationRoutes = require("./routers/documentationRoutes");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Repository routes
app.use("/api/repositories", repositoryRoutes);
app.use("/api/documentation", documentationRoutes);
// Test route
app.get("/", (req, res) => {
    res.send("RepoIQ Backend is running!");
});

module.exports = app;