
const BASE_URL = "https://api.github.com";

// Common GitHub API request handler
const githubRequest = async (endpoint) => {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            Accept: "application/vnd.github+json",
            "User-Agent": "RepoIQ",
            "X-GitHub-Api-Version": "2022-11-28"
        }
    });

    if (!response.ok) {
        const error = new Error("GitHub API request failed");

        if (response.status === 404) {
            error.message = "GitHub resource not found";
            error.statusCode = 404;
        } else if (
            response.status === 403 ||
            response.status === 429
        ) {
            error.message = "GitHub API rate limit exceeded or access denied";
            error.statusCode = 429;
        } else {
            error.statusCode = 502;
        }

        throw error;
    }

    return await response.json();
};

// 1. Fetch repository branches
const getBranches = async (owner, repo) => {
    return await githubRequest(
        `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/branches?per_page=100`
    );
};

// 2. Fetch recent commits
const getCommits = async (owner, repo) => {
    return await githubRequest(
        `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/commits?per_page=20`
    );
};

// 3. Fetch repository file tree
const getFileTree = async (owner, repo, branch) => {
    const tree = await githubRequest(
        `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/git/trees/${encodeURIComponent(branch)}?recursive=1`
    );

    return {
        truncated: tree.truncated,
        files: tree.tree.map((item) => ({
            path: item.path,
            type: item.type,
            size: item.size || 0,
            sha: item.sha
        }))
    };
};

// 4. Fetch individual file contents
const getFileContent = async (owner, repo, path, branch) => {
    const encodedPath = path
        .split("/")
        .map(encodeURIComponent)
        .join("/");

    const result = await githubRequest(
        `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/${encodedPath}?ref=${encodeURIComponent(branch)}`
    );

    if (Array.isArray(result) || result.type !== "file") {
        const error = new Error("The requested path is not a file");
        error.statusCode = 400;
        throw error;
    }

    if (result.encoding !== "base64" || !result.content) {
        const error = new Error("File content is unavailable through this API");
        error.statusCode = 422;
        throw error;
    }

    return {
        name: result.name,
        path: result.path,
        size: result.size,
        content: Buffer.from(result.content, "base64").toString("utf8"),
        htmlUrl: result.html_url
    };
};

module.exports = {
    getBranches,
    getCommits,
    getFileTree,
    getFileContent
};
