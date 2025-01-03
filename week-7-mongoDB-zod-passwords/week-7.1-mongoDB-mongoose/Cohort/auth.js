const jwt = require("jsonwebtoken");
const JWT_SECRET = "fasjajka89172349";

function auth(req, res, next) {
    const token = req.body.token;

    const decodedData = jwt.verify(token, JWT_SECRET);

    if (decodedData) {
        req.userId = decodedData.id;
        next();
    } else {
        req.status(403).send({ msg: "You are unauthorized!!" });
    }
}

module.exports = {
    auth,
    JWT_SECRET,
}