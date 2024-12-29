//Express is a routing and middleware web framework for Node.js that has minimal fuctionality of its own.

//An express application is essentially a series of middleware function calls.

//Middleware is a function that has access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle.

//Middleware functions can perform the following tasks:

//1. Execute any code
//2. Make changes to the request and the response objects
//3. End the request-response cycle
//4. Call the next middleware function in the stack

const express = require("express"); 
const app = express();

//function to apply middlewares
function isOldEnough(age){
    if(age>=14){
        return true;
    }else{
        return false;
    }
}

//Using a middleware but the route is only used to show the final endpoint like what the user want to do.

// app.get("/ride1",(req,res)=>{
//     if(isOldEnough(req.query.age)){
//         res.json({
//             msg: "you have successfully riden the ride1",
//         })
//     }else{
//         res.status(411).json({
//             msg:"You are not eligible for that ride yet",
//         })
//     }
// })

function isOldEnoughMiddlware(req,res,next){
    //As we know that middlware function has access to the request and response object and next function so;
    const age = req.query.age;
    if(age>=14){
        // next() is a function in Express that is used to pass control to the next middleware function. If we don't call next() then the request will be stuck at this middleware and the code after this middleware will not be executed.
        next();
    }else{
        res.json({
            msg:"Sorry, you are not eligible for that ride yet",
        })
    }
}

//Like here user only need to ride the ride1 So everything will be checked before the route in the middlware
// app.get("/ride1",isOldEnoughMiddlware,(req,res)=>{
//     res.json({
//         msg: "you have successfully riden the ride1",
//     })
// })
// If we want that all the routes in the app uses this middleware then we can use app.use() and orders matter here.

app.use(isOldEnoughMiddlware);

app.get("/ride1",(req,res)=>{
    res.json({
        msg: "you have successfully riden the ride1",
    })
})

app.get("/ride2",(req,res)=>{
    res.json({
        msg: "you have successfully riden the ride2",
    })
})

app.listen(3001, () => {
    console.log("Listening on port 3001");
})