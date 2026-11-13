
const mongoose = require("mongoose");

const repositorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: ""
    },
    htmlUrl: {
        type: String,
        required: true
    },
    isPrivate: {
        type: Boolean,
        default: false
    },
    defaultBranch: {
        type: String,
        default: "main"
    },
    language: {
        type: String,
        default: null
    },
    stars: {
        type: Number,
        default: 0
    },
    forks: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Repository = mongoose.model("Repository", repositorySchema);

module.exports = Repository;
