
const { randomUUID } = require("crypto");

// Temporary storage until MongoDB integration
const repositories = [];

// Validate and extract owner and repository name
const validateRepositoryUrl = (repoUrl) => {
    if (typeof repoUrl !== "string") {
        const error = new Error("Repository URL is required");
        error.statusCode = 400;
        throw error;
    }

    let parsedUrl;

    try {
        parsedUrl = new URL(repoUrl);
    } catch {
        const error = new Error("Invalid repository URL");
        error.statusCode = 400;
        throw error;
    }

    if (
        parsedUrl.protocol !== "https:" ||
        parsedUrl.hostname !== "github.com"
    ) {
        const error = new Error("Only HTTPS GitHub URLs are allowed");
        error.statusCode = 400;
        throw error;
    }

    const parts = parsedUrl.pathname
        .split("/")
        .filter(Boolean);

    if (parts.length !== 2) {
        const error = new Error("Invalid GitHub repository URL");
        error.statusCode = 400;
        throw error;
    }

    const owner = parts[0];
    const repo = parts[1].replace(/\.git$/, "");

    return { owner, repo };
};

// Fetch actual repository information from GitHub
const fetchRepositoryDetails = async (repoUrl) => {
    const { owner, repo } = validateRepositoryUrl(repoUrl);

    const response = await fetch(
        `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`,
        {
            headers: {
                Accept: "application/vnd.github+json",
                "User-Agent": "RepoIQ"
            }
        }
    );

    if (response.status === 404) {
        const error = new Error("GitHub repository not found or inaccessible");
        error.statusCode = 404;
        throw error;
    }

    if (response.status === 403 || response.status === 429) {
        const error = new Error("GitHub API rate limit exceeded or access denied");
        error.statusCode = 429;
        throw error;
    }

    if (!response.ok) {
        const error = new Error("Failed to fetch GitHub repository");
        error.statusCode = 502;
        throw error;
    }

    return await response.json();
};

// Add repository
const addRepository = async (repoUrl) => {
    const { owner, repo } = validateRepositoryUrl(repoUrl);

    const alreadyExists = repositories.some(
        (item) =>
            item.owner.toLowerCase() === owner.toLowerCase() &&
            item.name.toLowerCase() === repo.toLowerCase()
    );

    if (alreadyExists) {
        const error = new Error("Repository already exists");
        error.statusCode = 409;
        throw error;
    }

    const githubData = await fetchRepositoryDetails(repoUrl);

    const newRepository = {
        id: randomUUID(),
        name: githubData.name,
        owner: githubData.owner.login,
        fullName: githubData.full_name,
        description: githubData.description,
        htmlUrl: githubData.html_url,
        isPrivate: githubData.private,
        defaultBranch: githubData.default_branch,
        language: githubData.language,
        stars: githubData.stargazers_count,
        forks: githubData.forks_count,
        createdAt: new Date().toISOString()
    };

    repositories.push(newRepository);

    return newRepository;
};

// Get all repositories
const getRepositories = () => {
    return repositories;
};

// Get one repository
const getRepositoryById = (id) => {
    const repository = repositories.find(
        (item) => item.id === id
    );

    if (!repository) {
        const error = new Error("Repository not found");
        error.statusCode = 404;
        throw error;
    }

    return repository;
};

// Delete repository
const deleteRepository = (id) => {
    const index = repositories.findIndex(
        (item) => item.id === id
    );

    if (index === -1) {
        const error = new Error("Repository not found");
        error.statusCode = 404;
        throw error;
    }

    const deletedRepository = repositories.splice(index, 1)[0];

    return deletedRepository;
};

module.exports = {
    validateRepositoryUrl,
    fetchRepositoryDetails,
    addRepository,
    getRepositories,
    getRepositoryById,
    deleteRepository
};
