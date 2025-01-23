const jwt = require("jsonwebtoken");
const JWT_SECRET = "afjkaljfal008q409";

function auth(req, res, next) {
    const token = req.headers.token;
    const decodedData = jwt.verify(token, JWT_SECRET);

    if (decodedData) {
        req.userId = decodedData._id;
        next();
    } else {
        res.status(403).json({ msg: "Incorrect credentials" });
    }
}

module.exports = {
    JWT_SECRET,
    auth,
}