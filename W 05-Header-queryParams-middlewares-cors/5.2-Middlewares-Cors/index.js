const express = require("express");
const app = express();

let requestCount = 0;

// function count(req,res,next){
//     requestCount++;
//     next();
// }

app.use((req, res, next) => {
    requestCount++;
    next();
})
// request will be like this
// http://localhost:3000/add/2/3
app.get("/add/:a/:b", (req, res) => {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    console.log(requestCount);
    res.json({
        ans: a + b,
        requestCount,
    });
});

// request will be like this
// http://localhost:3000/mul?a=2&b=3
app.get("/mul", (req, res) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({
        ans: a * b,
        requestCount,
    })
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
})