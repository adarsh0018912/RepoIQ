
const documentationService = require("../services/documentationservice");
const repositoryService = require("../services/repositoryService");

// 1. Create documentation
const createDocumentation = (req, res) => {
    try {
        const repository = repositoryService.getRepositoryById(
            req.params.id
        );

        const document = documentationService.createDocumentation(
            repository.id,
            req.body
        );

        res.status(201).json({
            success: true,
            message: "Documentation created successfully",
            data: document
        });

    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        });
    }
};

// 2. Get all documentation
const getDocumentation = (req, res) => {
    try {
        const repository = repositoryService.getRepositoryById(
            req.params.id
        );

        const documents = documentationService.getDocumentation(
            repository.id
        );

        res.status(200).json({
            success: true,
            count: documents.length,
            data: documents
        });

    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        });
    }
};

// 3. Get one document
const getDocumentationById = (req, res) => {
    try {
        const document = documentationService.getDocumentationById(
            req.params.id,
            req.params.docId
        );

        res.status(200).json({
            success: true,
            data: document
        });

    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        });
    }
};

// 4. Update documentation
const updateDocumentation = (req, res) => {
    try {
        const document = documentationService.updateDocumentation(
            req.params.id,
            req.params.docId,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Documentation updated successfully",
            data: document
        });

    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        });
    }
};

// 5. Delete documentation
const deleteDocumentation = (req, res) => {
    try {
        const document = documentationService.deleteDocumentation(
            req.params.id,
            req.params.docId
        );

        res.status(200).json({
            success: true,
            message: "Documentation deleted successfully",
            data: document
        });

    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createDocumentation,
    getDocumentation,
    getDocumentationById,
    updateDocumentation,
    deleteDocumentation
};
