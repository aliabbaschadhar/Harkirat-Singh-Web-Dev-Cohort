const { response } = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "s3cret";

function auth(req, res, next) {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log("Token is invalid", token);
                res.status(403).json({
                    message: "Token invalid!",
                    token: token,
                })
            } else {
                req.userId = decoded.userId;
                next();
            }
        })
    } else {
        res.status(404).json({
            message: "Token does not exists",
        })
    }

    // const response = jwt.verify(token, JWT_SECRET);

    // if (response) {
    //     req.userId = response.userId;
    //     next();
    // } else {
    //     res.status(403).json({
    //         message: "Incorrect creds"
    //     })
    // }
}

module.exports = {
    auth,
    JWT_SECRET
}