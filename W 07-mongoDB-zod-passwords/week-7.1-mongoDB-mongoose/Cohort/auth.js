const jwt = require("jsonwebtoken");
const JWT_SECRET = "fasjajka89172349";

function auth(req, res, next) {
    const token = req.headers.token;

    // const decodedData = jwt.verify(token, JWT_SECRET);

    // if (decodedData) {
    //     req.userId = decodedData.id;
    //     next();
    // } else {
    //     req.status(403).send({ msg: "You are unauthorized!!" });
    // }

    // Better approach 

    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log(err) // Invalid token
                res.status(401).send({
                    message: "Unauthorized"
                })
            } else {
                console.log(decoded) // decoded returns you the object ==> {username: 'abc, password : "123"}

                req.userId = decoded.id;
                next();
            }
        })
    } else {
        res.status(401).send({
            message: "Unauthorized",
        })
    }
}

module.exports = {
    auth,
    JWT_SECRET,
}