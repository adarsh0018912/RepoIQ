
const express = require("express");
const router = express.Router();

const {
    createDocumentation,
    getDocumentation,
    getDocumentationById,
    updateDocumentation,
    deleteDocumentation
} = require("../controllers/documentationControllers");

// Create documentation
router.post("/:id", createDocumentation);

// Get all documentation for a repository
router.get("/:id", getDocumentation);

// Get one document
router.get("/:id/:docId", getDocumentationById);

// Update documentation
router.put("/:id/:docId", updateDocumentation);

// Delete documentation
router.delete("/:id/:docId", deleteDocumentation);

module.exports = router;
