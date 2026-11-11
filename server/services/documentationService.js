
const { randomUUID } = require("crypto");

// Temporary documentation storage
const documentation = [];

// Create documentation
const createDocumentation = (repositoryId, data) => {
    const { title, type, content } = data;

    if (!title || !type || !content) {
        const error = new Error(
            "Title, type and content are required"
        );
        error.statusCode = 400;
        throw error;
    }

    const allowedTypes = [
        "README",
        "API Reference",
        "Setup Guide",
        "Module Documentation"
    ];

    if (!allowedTypes.includes(type)) {
        const error = new Error("Invalid documentation type");
        error.statusCode = 400;
        throw error;
    }

    const newDocument = {
        id: randomUUID(),
        repositoryId,
        title,
        type,
        content,
        sourceCommit: data.sourceCommit || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    documentation.push(newDocument);

    return newDocument;
};

// Get all documentation for a repository
const getDocumentation = (repositoryId) => {
    return documentation.filter(
        (doc) => doc.repositoryId === repositoryId
    );
};

// Get one document
const getDocumentationById = (repositoryId, docId) => {
    const document = documentation.find(
        (doc) =>
            doc.id === docId &&
            doc.repositoryId === repositoryId
    );

    if (!document) {
        const error = new Error("Documentation not found");
        error.statusCode = 404;
        throw error;
    }

    return document;
};

// Update documentation
const updateDocumentation = (repositoryId, docId, data) => {
    const document = getDocumentationById(repositoryId, docId);

    if (data.title !== undefined) {
        if (!data.title.trim()) {
            const error = new Error("Title cannot be empty");
            error.statusCode = 400;
            throw error;
        }
        document.title = data.title;
    }

    if (data.content !== undefined) {
        if (!data.content.trim()) {
            const error = new Error("Content cannot be empty");
            error.statusCode = 400;
            throw error;
        }
        document.content = data.content;
    }

    if (data.type !== undefined) {
        const allowedTypes = [
            "README",
            "API Reference",
            "Setup Guide",
            "Module Documentation"
        ];

        if (!allowedTypes.includes(data.type)) {
            const error = new Error("Invalid documentation type");
            error.statusCode = 400;
            throw error;
        }

        document.type = data.type;
    }

    document.updatedAt = new Date().toISOString();

    return document;
};

// Delete documentation
const deleteDocumentation = (repositoryId, docId) => {
    const document = getDocumentationById(repositoryId, docId);

    const index = documentation.findIndex(
        (doc) => doc.id === document.id
    );

    return documentation.splice(index, 1)[0];
};

module.exports = {
    createDocumentation,
    getDocumentation,
    getDocumentationById,
    updateDocumentation,
    deleteDocumentation
};
