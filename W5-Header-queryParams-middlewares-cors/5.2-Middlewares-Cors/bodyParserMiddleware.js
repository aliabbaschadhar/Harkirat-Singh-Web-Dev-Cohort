const express = require("express");
const bodyParser = require("body-parser"); //To parse the JSON data from body in the post request

const app = express();

app.use(bodyParser.json());// Why do we need it?
//When we are parsing data from body to server it first needs to get coverted into the js object 
//That's why we use body-parser library we can also do that using express bcz express also uses 
// the same library under the hood like body-parser

// app.use(express.json());

app.post("/add",(req,res)=>{
    console.log(req.body);
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);

    res.json({
        ans : a+b
    })
})

app.listen(3000,()=>{
    console.log("Server running !");
})
