
const mongoose = require("mongoose");

const documentationSchema = new mongoose.Schema({
    repositoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Repository",
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: [
            "README",
            "API Reference",
            "Setup Guide",
            "Module Documentation"
        ],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    sourceCommit: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

const Documentation = mongoose.model(
    "Documentation",
    documentationSchema
);

module.exports = Documentation;
