// const express = require("express")
// const Router = express.Router; // 1

const { Router } = require("express"); //2
//Both 1 and 2 are doing same thing

const userRouter = Router(); //Router is a function not a class
// If  we console.log(userRouter) then
//{
// params: { },
// _params: [],
//     caseSensitive: false,
//         mergeParams: undefined,
//             strict: false,
//                 stack: []
// }

// params: An object that holds parameters for the router.
// _params: An array that holds parameter callbacks.

// caseSensitive: A boolean indicating whether the router is case -sensitive(default is false).

// mergeParams: A boolean or undefined indicating whether to merge parent and child route parameters.

// strict: A boolean indicating whether the router is strict about trailing slashes(default is false).

// stack: An array that holds the middleware and route handlers added to the router.

userRouter.post('/signup', (req, res) => {
    res.json({ msg: "Signup endpoint" })
})
userRouter.post("/signin", (req, res) => {
    res.json({ msg: "Signin enpoint" })
})
userRouter.get("/purchases", (req, res) => {
    res.json({ msg: "To see all the purchased courses" })
})


module.exports = {
    userRouter: userRouter
}
