const express = require("express");
const app = express();

let requestCount= 0 ;

// function count(req,res,next){
//     requestCount++;
//     next();
// }

app.use((req,res,next)=>{
    requestCount++;
    next();
})

app.get("/add",(req,res)=>{
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    console.log(requestCount)
    res.json({
        ans:a+b,
        requestCount,
    })
})

app.get("/mul",(req,res)=>{
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({
        ans:a*b,
        requestCount,
    })
})

app.listen(3000,()=>{
    console.log("Server running on port 3000");
})