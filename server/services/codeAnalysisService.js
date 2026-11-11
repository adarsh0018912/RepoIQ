
const githubService = require("./githubservice");

const MAX_FILES = 30;
const MAX_FILE_SIZE = 100000;

// Supported programming languages
const languageMap = {
    ".js": "JavaScript",
    ".jsx": "JavaScript",
    ".mjs": "JavaScript",
    ".cjs": "JavaScript",
    ".ts": "TypeScript",
    ".tsx": "TypeScript",
    ".py": "Python",
    ".java": "Java",
    ".cpp": "C++",
    ".c": "C",
    ".h": "C",
    ".cs": "C#",
    ".go": "Go",
    ".rb": "Ruby",
    ".php": "PHP"
};

// Folders that should not be analyzed
const ignoredFolders = [
    "node_modules",
    "dist",
    "build",
    ".git",
    "coverage",
    "vendor"
];

// Detect language from file extension
const detectLanguage = (filePath) => {
    const extension = filePath.substring(
        filePath.lastIndexOf(".")
    ).toLowerCase();

    return languageMap[extension] || "Other";
};

// Check whether a file should be analyzed
const isSourceFile = (file) => {
    if (file.type !== "blob") {
        return false;
    }

    if (file.size > MAX_FILE_SIZE) {
        return false;
    }

    const parts = file.path.split("/");

    if (parts.some((part) => ignoredFolders.includes(part))) {
        return false;
    }

    return Object.keys(languageMap).some((extension) =>
        file.path.toLowerCase().endsWith(extension)
    );
};

// Extract functions, classes and imports
const extractCodeStructure = (content, language) => {
    let functions = [];
    let classes = [];
    let imports = [];

    if (language === "JavaScript" || language === "TypeScript") {

        const functionMatches = content.matchAll(
            /(?:function\s+([a-zA-Z_$][\w$]*)|(?:const|let|var)\s+([a-zA-Z_$][\w$]*)\s*=\s*(?:async\s*)?(?:function|\([^)]*\)\s*=>|[a-zA-Z_$][\w$]*\s*=>))/g
        );

        for (const match of functionMatches) {
            functions.push(match[1] || match[2]);
        }

        const classMatches = content.matchAll(
            /\bclass\s+([a-zA-Z_$][\w$]*)/g
        );

        for (const match of classMatches) {
            classes.push(match[1]);
        }

        const importMatches = content.matchAll(
            /(?:import\s+(?:[\s\S]*?\s+from\s+)?|require\s*\(\s*)["']([^"']+)["']/g
        );

        for (const match of importMatches) {
            imports.push(match[1]);
        }
    }

    if (language === "Python") {

        const functionMatches = content.matchAll(
            /^\s*(?:async\s+)?def\s+([a-zA-Z_]\w*)/gm
        );

        for (const match of functionMatches) {
            functions.push(match[1]);
        }

        const classMatches = content.matchAll(
            /^\s*class\s+([a-zA-Z_]\w*)/gm
        );

        for (const match of classMatches) {
            classes.push(match[1]);
        }

        const importMatches = content.matchAll(
            /^\s*(?:from\s+([\w.]+)\s+import|import\s+([\w.]+))/gm
        );

        for (const match of importMatches) {
            imports.push(match[1] || match[2]);
        }
    }

    if (language === "Java") {

        const functionMatches = content.matchAll(
            /^\s*(?:public|private|protected|static|final|\s)+[\w<>\[\]]+\s+([a-zA-Z_$]\w*)\s*\(/gm
        );

        for (const match of functionMatches) {
            functions.push(match[1]);
        }

        const classMatches = content.matchAll(
            /\bclass\s+([a-zA-Z_$]\w*)/g
        );

        for (const match of classMatches) {
            classes.push(match[1]);
        }

        const importMatches = content.matchAll(
            /^\s*import\s+(?:static\s+)?([\w.]+);/gm
        );

        for (const match of importMatches) {
            imports.push(match[1]);
        }
    }

    return {
        functions: [...new Set(functions)],
        classes: [...new Set(classes)],
        imports: [...new Set(imports)]
    };
};

// Analyze complete repository
const analyzeRepository = async (owner, repo, branch) => {

    const tree = await githubService.getFileTree(
        owner,
        repo,
        branch
    );

    const sourceFiles = tree.files.filter(isSourceFile);

    const selectedFiles = sourceFiles.slice(0, MAX_FILES);

    const languageStats = {};
    const fileAnalysis = [];

    for (const file of selectedFiles) {

        const language = detectLanguage(file.path);

        languageStats[language] =
            (languageStats[language] || 0) + 1;

        try {
            const fileData = await githubService.getFileContent(
                owner,
                repo,
                file.path,
                branch
            );

            const structure = extractCodeStructure(
                fileData.content,
                language
            );

            fileAnalysis.push({
                path: file.path,
                language,
                functions: structure.functions,
                classes: structure.classes,
                imports: structure.imports
            });

        } catch (error) {
            fileAnalysis.push({
                path: file.path,
                language,
                error: error.message
            });
        }
    }

    return {
        totalSourceFiles: sourceFiles.length,
        analyzedFiles: fileAnalysis.length,
        skippedFiles: sourceFiles.length - selectedFiles.length,
        treeTruncated: tree.truncated,
        languageStats,
        files: fileAnalysis
    };
};

module.exports = {
    detectLanguage,
    extractCodeStructure,
    analyzeRepository
};
