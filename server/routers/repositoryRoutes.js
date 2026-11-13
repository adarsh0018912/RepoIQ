
const express = require("express");
const router = express.Router();

const {
    getRepositories,
    addRepository,
    getRepositoryById,
    deleteRepository,
    getRepositoryBranches,
    getRepositoryCommits,
    getRepositoryFiles,
    getRepositoryFileContent,
      analyzeRepository
} = require("../controllers/repositoryControllers");


//MODULE 1: REPOSITORY MANAGEMENT


// GET all repositories
router.get("/", getRepositories);

// ADD repository
router.post("/", addRepository);

// GET repository by ID
router.get("/:id", getRepositoryById);

// DELETE repository
router.delete("/:id", deleteRepository);



//  GITHUB INTEGRATION


// GET repository branches
router.get("/:id/branches", getRepositoryBranches);

// GET recent commits
router.get("/:id/commits", getRepositoryCommits);

// GET repository file tree
router.get("/:id/files", getRepositoryFiles);

// GET individual file content
router.get("/:id/file", getRepositoryFileContent);
// Module 3 - Code Analysis
router.get("/:id/analysis", analyzeRepository);
module.exports = router;
