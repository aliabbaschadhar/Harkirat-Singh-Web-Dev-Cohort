const { Router } = require("express");
const courseRouter = Router();


courseRouter.post("/purchase", (req, res) => {
    res.json({ msg: "To purchase a course" })
})

courseRouter.get("/preview", (req, res) => {
    res.json({ msg: "To see all the courses" })
})


module.exports = {
    courseRouter: courseRouter
}