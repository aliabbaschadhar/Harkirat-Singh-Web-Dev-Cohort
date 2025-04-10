const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// const { createUserRoutes } = require("./routes/user")
// const { createCourseRoutes } = require("./routes/course")

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");


// mongoose.connect("")

const app = express();

app.use(express.json());
app.use(cors());

// createCourseRoutes(app); //ugly way of routing in express
// createUserRoutes(app);

app.use("/api/v1/user", userRouter); //if any request will come at /user route then it will get routed to userRouter and will implement the code present in the user.js

app.use("/api/v1/course", courseRouter);
app.use("/api/v1/admin", adminRouter);

async function main() {
    await mongoose.connect(process.env.DB_CONNECTION);

    app.listen(3000, () => {
        console.log("Server running on 3000");
    })
}
main(); // You should show only that server is running on port 3000 if you database is connected 
