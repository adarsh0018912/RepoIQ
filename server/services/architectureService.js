
const parser = require("@babel/parser");
const path = require("path");

const repositoryService = require("./repositoryService");
const githubService = require("./githubService");
const codeAnalysisService = require("./codeAnalysisService");

// Extract imports using Babel Parser
const extractImports = (content, filePath) => {
    try {
        const extension = path.extname(filePath);

        const plugins = ["jsx"];

        if ([".ts", ".tsx"].includes(extension)) {
            plugins.push("typescript");
        }

        const ast = parser.parse(content, {
            sourceType: "unambiguous",
            plugins
        });

        const imports = new Set();

        const traverse = (node) => {
            if (!node || typeof node !== "object") {
                return;
            }

            if (Array.isArray(node)) {
                node.forEach(traverse);
                return;
            }

            if (
                node.type === "ImportDeclaration" ||
                node.type === "ExportNamedDeclaration" ||
                node.type === "ExportAllDeclaration"
            ) {
                if (node.source) {
                    imports.add(node.source.value);
                }
            }

            if (
                node.type === "CallExpression" &&
                node.callee.type === "Identifier" &&
                node.callee.name === "require" &&
                node.arguments.length === 1 &&
                node.arguments[0].type === "StringLiteral"
            ) {
                imports.add(node.arguments[0].value);
            }

            for (const key of Object.keys(node)) {
                if (
                    key !== "loc" &&
                    key !== "start" &&
                    key !== "end" &&
                    key !== "comments"
                ) {
                    traverse(node[key]);
                }
            }
        };

        traverse(ast);

        return [...imports];
    } catch {
        return [];
    }
};

// Resolve relative imports to actual repository files
const resolveImport = (sourcePath, importPath, filePaths) => {
    if (!importPath.startsWith(".")) {
        return null;
    }

    const basePath = path.posix.normalize(
        path.posix.join(
            path.posix.dirname(sourcePath),
            importPath
        )
    );

    const extensions = [
        "",
        ".js",
        ".jsx",
        ".ts",
        ".tsx",
        ".mjs",
        ".cjs",
        "/index.js",
        "/index.jsx",
        "/index.ts",
        "/index.tsx"
    ];

    for (const extension of extensions) {
        const candidate = basePath + extension;

        if (filePaths.has(candidate)) {
            return candidate;
        }
    }

    return null;
};

// Generate repository architecture
const generateArchitecture = async (repositoryId) => {
   const repository = await repositoryService.getRepositoryById(repositoryId);

    const analysis = await codeAnalysisService.analyzeRepository(
        repository.owner,
        repository.name,
        repository.defaultBranch
    );

    const sourceFiles = analysis.files;

    const filePaths = new Set(
        sourceFiles.map((file) => file.path)
    );

    const nodes = [];
    const edges = [];
    const externalDependencies = new Set();

    for (const file of sourceFiles) {
        nodes.push({
            id: file.path,
            label: path.posix.basename(file.path),
            path: file.path,
            language: file.language,
            functions: file.functions,
            classes: file.classes
        });

        try {
            const fileData = await githubService.getFileContent(
                repository.owner,
                repository.name,
                file.path,
                repository.defaultBranch
            );

            const imports = extractImports(
                fileData.content,
                file.path
            );

            for (const importPath of imports) {
                const targetPath = resolveImport(
                    file.path,
                    importPath,
                    filePaths
                );

                if (targetPath) {
                    edges.push({
                        id: `${file.path}->${targetPath}`,
                        source: file.path,
                        target: targetPath,
                        label: "imports"
                    });
                } else if (!importPath.startsWith(".")) {
                    externalDependencies.add(importPath);
                }
            }
        } catch {
            // Skip files whose content cannot be fetched
        }
    }

    return {
        repository: repository.fullName,
        summary: {
            totalFiles: nodes.length,
            totalConnections: edges.length,
            externalDependencyCount: externalDependencies.size
        },
        nodes,
        edges,
        externalDependencies: [...externalDependencies]
    };
};

module.exports = {
    generateArchitecture
};
