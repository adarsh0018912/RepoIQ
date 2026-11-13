
const architectureService = require("../services/architectureService");

const getRepositoryArchitecture = async (req, res) => {
    try {
        const architecture = await architectureService.generateArchitecture(
            req.params.id
        );

        res.status(200).json({
            success: true,
            data: architecture
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getRepositoryArchitecture
};
