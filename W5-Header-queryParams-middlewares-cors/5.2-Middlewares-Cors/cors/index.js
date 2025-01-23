const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json()); //To parse the JSON data from body in the post request
app.use(cors()); // To allow cross-origin requests

app.post("/sum/",(req,res)=>{
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);

    res.json({
        ans:a+b,
    })
})

app.listen(3000,()=>{
    console.log("Server running on 3000");
})