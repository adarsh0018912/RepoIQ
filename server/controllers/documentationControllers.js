
const documentationService = require("../services/documentationService");
const repositoryService = require("../services/repositoryService");

// 1. Create documentation
const createDocumentation = async (req, res) => {
    try {
        const repository = await repositoryService.getRepositoryById(
            req.params.id
        );

        const document = await documentationService.createDocumentation(
            repository._id,
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
const getDocumentation = async (req, res) => {
    try {
        const repository = await repositoryService.getRepositoryById(
            req.params.id
        );

        const documents = await documentationService.getDocumentation(
            repository._id
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
const getDocumentationById = async (req, res) => {
    try {
        const document = await documentationService.getDocumentationById(
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
const updateDocumentation = async (req, res) => {
    try {
        const document = await documentationService.updateDocumentation(
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
const deleteDocumentation = async (req, res) => {
    try {
        const document = await documentationService.deleteDocumentation(
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
