
const repositoryService = require("../services/repositoryService");
const githubService = require("../services/githubservice");
const codeAnalysisService = require("../services/codeanalysisService");
//  REPOSITORY MANAGEMENT

// GET all repositories
const getRepositories = (req, res) => {
    try {
        const repositories = repositoryService.getRepositories();

        res.status(200).json({
            success: true,
            count: repositories.length,
            data: repositories
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        });
    }
};

// ADD repository
const addRepository = async (req, res) => {
    try {
        const { repoUrl } = req.body;

        const repository = await repositoryService.addRepository(repoUrl);

        res.status(201).json({
            success: true,
            message: "Repository added successfully",
            data: repository
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        });
    }
};

// GET repository by ID
const getRepositoryById = (req, res) => {
    try {
        const repository = repositoryService.getRepositoryById(
            req.params.id
        );

        res.status(200).json({
            success: true,
            data: repository
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        });
    }
};

// DELETE repository
const deleteRepository = (req, res) => {
    try {
        const repository = repositoryService.deleteRepository(
            req.params.id
        );

        res.status(200).json({
            success: true,
            message: "Repository deleted successfully",
            data: repository
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        });
    }
};


// GITHUB INTEGRATION


// GET repository branches
const getRepositoryBranches = async (req, res) => {
    try {
        const repository = repositoryService.getRepositoryById(
            req.params.id
        );

        const branches = await githubService.getBranches(
            repository.owner,
            repository.name
        );

        res.status(200).json({
            success: true,
            count: branches.length,
            data: branches
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        });
    }
};

// GET recent commits
const getRepositoryCommits = async (req, res) => {
    try {
        const repository = repositoryService.getRepositoryById(
            req.params.id
        );

        const commits = await githubService.getCommits(
            repository.owner,
            repository.name
        );

        res.status(200).json({
            success: true,
            count: commits.length,
            data: commits
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        });
    }
};

// GET repository file tree
const getRepositoryFiles = async (req, res) => {
    try {
        const repository = repositoryService.getRepositoryById(
            req.params.id
        );

        const files = await githubService.getFileTree(
            repository.owner,
            repository.name,
            repository.defaultBranch
        );

        res.status(200).json({
            success: true,
            data: files
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        });
    }
};

// GET individual file content
const getRepositoryFileContent = async (req, res) => {
    try {
        const { path } = req.query;

        if (!path || typeof path !== "string") {
            return res.status(400).json({
                success: false,
                message: "File path is required"
            });
        }

        const repository = repositoryService.getRepositoryById(
            req.params.id
        );

        const file = await githubService.getFileContent(
            repository.owner,
            repository.name,
            path,
            repository.defaultBranch
        );

        res.status(200).json({
            success: true,
            data: file
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        });
    }
};
// Analyze repository code
const analyzeRepository = async (req, res) => {
    try {
        const repository = repositoryService.getRepositoryById(req.params.id);

        const analysis = await codeAnalysisService.analyzeRepository(
            repository.owner,
            repository.name,
            repository.defaultBranch
        );

        res.status(200).json({
            success: true,
            data: analysis
        });

    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        });
    }
};
// ==========================================
// EXPORT ALL CONTROLLERS
// ==========================================

module.exports = {
    // Module 1
    getRepositories,
    addRepository,
    getRepositoryById,
    deleteRepository,

    // Module 2
    getRepositoryBranches,
    getRepositoryCommits,
    getRepositoryFiles,
    getRepositoryFileContent,
    analyzeRepository
};
