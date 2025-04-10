const { Router } = require('express');
const adminRouter = Router();
const { adminModel, courseModel } = require("./../db");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { adminMiddleware } = require('../middleware/adminM');
require("dotenv").config();

adminRouter.post("/signup", async (req, res) => {
    //zod
    const requiredBody = zod.object({
        email: zod.string().min(8).max(30).email(),
        password: zod.string().min(8).max(30).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
        firstName: zod.string().min(3).max(8),
        lastName: zod.string().min(3).max(10),
    })
    const parsedData = requiredBody.safeParse(req.body);
    if (!parsedData.success) {
        return res.json({
            msg: "Inocorrect format!",
            error: parsedData.error
        })
    }

    //Main logic

    const { email, password, firstName, lastName } = req.body;

    const admin = await adminModel.findOne({ email: email });
    if (admin) return res.status(403).send({ msg: "admin already exists" })

    const hashedPassword = await bcrypt.hash(password, 5);

    try {
        await adminModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })
        res.json({ msg: "You are signed up at admin endpoint" });
    } catch (error) {
        res.status(403).send({
            msg: "Some error occured!",
            error: error
        })
    }
})

adminRouter.post("/signin", async (req, res) => {
    const requiredBody = zod.object({
        email: zod.string().min(8).max(30).email(),
        password: zod.string().max(30).min(8).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/), // This regex says that the password should have at least one uppercase letter, one lowercase letter and one number. It should also have a minimum length of 8 and a maximum length of 30.
    })
    const parsedData = requiredBody.safeParse(req.body);
    if (!parsedData.success) {
        return res.json({
            msg: "Inocorrect format!",
            error: parsedData.error
        })
    }
    const { email, password } = req.body;

    const admin = await adminModel.findOne({
        email: email
    })
    if (!admin) {
        return res.status(404).send({ msg: "admin doesn't exist in our DB" });
    }
    const matchedPassword = bcrypt.compare(password, admin.password);

    if (!matchedPassword) {
        return res.status(403).send({ msg: "Incorrect password" });
    }
    console.log(process.env.JWT_ADMIN_SECRET);

    // # Why the password for admin and user is different bcz if we use the same password then the user will be access the same end points as admin
    // # bcz jwt will think that the token was issued by me so it must be valid but that time user will be accessing the end points of admin.

    try {
        const token = jwt.sign({
            password: password
        },
            process.env.JWT_ADMIN_SECRET);
        return res.status(200).send({
            token: token
        });
    } catch (error) {
        res.status(404).send({
            msg: "Error occured",
        });
        console.log(error);
        return;
    }
});

adminRouter.post("/course", adminMiddleware, async (req, res) => {
    const adminId = req.adminId;
    const { title, description, imageUrl, price } = req.body

    const course = await courseModel.create({
        title: title, description: description, imageUrl: imageUrl, price: price, creatorId: adminId
    })

    res.json({
        msg: "Course Created!",
        courseId: course._id,
    })
})

adminRouter.put("/course", adminMiddleware, async (req, res) => {
    const { adminId } = req.adminId;
    const { title, description, price, imageUrl, courseId } = req.body;

    const course = await courseModel.findOneAndUpdate({
        _id: courseId,
        creatorId: adminId,
    }, {
        title,
        imageUrl,
        price,
        description
    }, {
    }, {
        new: true // This option returns the modified document rather than the original
    })
    if (!course) {
        return res.json({ msg: "Course not found" })
    }
    res.json({
        msg: "Course updated!", courseId: courseId,
        creatorId: adminId
    })
});


adminRouter.get("/course/bulk", async (req, res) => {
    const adminId = req.adminId;
    const courses = await courseModel.find({ creatorId: adminId });

    res.json({
        msg: "Show all admin courses",
        courses
    })
})

module.exports = {
    adminRouter: adminRouter
}