
const app = require("./app");

const PORT = 5000;

const server = app.listen(PORT, () => {
    console.log(`RepoIQ server running on port ${PORT}`);
});


