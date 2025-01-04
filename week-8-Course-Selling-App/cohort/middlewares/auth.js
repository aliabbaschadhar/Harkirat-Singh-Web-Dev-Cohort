const jwt = require("jsonwebtoken");
const JWT_SECRET = "fadjklalq"

function auth(req, res, next) {
    const { token } = req.headers;
    const decodedData = jwt.verify(token, JWT_SECRET);

    if (decodedData.data) { }
}

module.exports = {
    auth, JWT_SECRET,
}