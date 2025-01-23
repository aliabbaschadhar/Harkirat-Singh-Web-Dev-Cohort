const express = require("express");
const app = express();


app.get("/multiply",(req,res)=>{
    const a =  parseInt(req.query.a);
    const b =  parseInt(req.query.b);
    res.json({
        ans : a*b
    })
})

//Getting input from dynamic routes 
// add/89/2
app.get("/add/:a/:b",(req,res)=>{
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    res.json({
        ans:a+b
    })
})

// add?a=89&b=2
app.get("/add",(req,res)=>{
    const a =  parseInt(req.query.a);
    const b =  parseInt(req.query.b);
    res.json({
        ans : a+b
    })
})


app.get("/subtract",(req,res)=>{
    const a =  parseInt(req.query.a);
    const b =  parseInt(req.query.b);
    res.json({
        ans : a-b
    })
})



app.get("/divide",(req,res)=>{
    const a =  parseInt(req.query.a);
    const b =  parseInt(req.query.b);
    res.json({
        ans : a/b
    })
})

app.listen(3000,()=>{
    console.log("Running on port 3000 ...")
});