const express = require('express');
const app = express();


// route handlers
app.get("/",(req,res)=>{
    res.send("Hello World from get");
})

app.post("/",(req,res)=>{
    res.send("Hello World from the post");
})

app.listen(3000, () => console.log('Server started on port 3000'));