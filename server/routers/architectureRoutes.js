
const express = require("express");
const router = express.Router();

const {
    getRepositoryArchitecture
} = require("../controllers/architectureControllers");

router.get("/:id", getRepositoryArchitecture);

module.exports = router;
