
const Documentation = require("../models/Documentation");

// Create documentation
const createDocumentation = async (repositoryId, data) => {
    const { title, type, content } = data;

    if (
        typeof title !== "string" || !title.trim() ||
        typeof type !== "string" ||
        typeof content !== "string" || !content.trim()
    ) {
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

    return await Documentation.create({
        repositoryId,
        title: title.trim(),
        type,
        content,
        sourceCommit: data.sourceCommit || null
    });
};

// Get all documentation for a repository
const getDocumentation = async (repositoryId) => {
    return await Documentation.find({ repositoryId })
        .sort({ createdAt: -1 });
};

// Get one document
const getDocumentationById = async (repositoryId, docId) => {
    let document;

    try {
        document = await Documentation.findOne({
            _id: docId,
            repositoryId
        });
    } catch (error) {
        if (error.name === "CastError") {
            const notFound = new Error("Documentation not found");
            notFound.statusCode = 404;
            throw notFound;
        }

        throw error;
    }

    if (!document) {
        const error = new Error("Documentation not found");
        error.statusCode = 404;
        throw error;
    }

    return document;
};

// Update documentation
const updateDocumentation = async (repositoryId, docId, data) => {
    const document = await getDocumentationById(
        repositoryId,
        docId
    );

    if (data.title !== undefined) {
        if (
            typeof data.title !== "string" ||
            !data.title.trim()
        ) {
            const error = new Error("Title cannot be empty");
            error.statusCode = 400;
            throw error;
        }

        document.title = data.title.trim();
    }

    if (data.content !== undefined) {
        if (
            typeof data.content !== "string" ||
            !data.content.trim()
        ) {
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

    await document.save();

    return document;
};

// Delete documentation
const deleteDocumentation = async (repositoryId, docId) => {
    const document = await getDocumentationById(
        repositoryId,
        docId
    );

    await document.deleteOne();

    return document;
};

module.exports = {
    createDocumentation,
    getDocumentation,
    getDocumentationById,
    updateDocumentation,
    deleteDocumentation
};
