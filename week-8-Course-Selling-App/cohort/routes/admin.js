const { Router } = require('express');
const adminRouter = Router();
const adminModel = require("./../db");

adminRouter.post("singup", (req, res) => {
    res.json({
        msg: "At admin signup route"
    })
})

adminRouter.post("signin", (req, res) => {
    res.json({ msg: "At admin signin Route" })
});

adminRouter.post("/", (req, res) => { res.json({ msg: "At admin create course route" }) })

adminRouter.put("/", (req, res) => { res.json({ msg: "At admin course update" }) })

adminRouter.get("/bulk", (req, res) => { res.json({ msg: "Show all admin courses" }) })

module.exports = {
    adminRouter: adminRouter
}