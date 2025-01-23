const jwt = require("jsonwebtoken");
const JWT_SCERET = process.env.JWT_SCERET;

async function auth(req, res, next) {
    const token = req.headers.token;
    const decodedData = await jwt.verify(token, JWT_SCERET);
    if (!decodedData) {
        return res.json({ msg: "You are unauthorized!" })
    } else {
        req.userId = decodedData.userId;
        res.json({ msg: "You are signed in!" });
        next();
    }
}

module.exports = { auth };