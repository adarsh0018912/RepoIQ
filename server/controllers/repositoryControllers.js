const getRepositories = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Repository routes are working"
    });
};

module.exports = {
    getRepositories
};