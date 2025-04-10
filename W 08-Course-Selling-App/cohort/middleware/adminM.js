
const jwt = require("jsonwebtoken");


function adminMiddleware(req, res, next) {
    const token = req.headers.token;
    console.log(token);
    try {
        const decoded = jwt.verify(token, process.env.JWT_ADMIN_SECRET);

        if (decoded) {
            req.adminId = decoded.id;
            next()
        } else {
            res.status(403).send({ msg: "You are unathorized" });
        }
    } catch (error) {
        console.log(error)
        res.json({ error: error })
    }


}

module.exports = {
    adminMiddleware,
}