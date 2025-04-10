import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cors from "cors";
import { brainRouter, contentRouter, userRouter } from "./routes";

const app = express();

app.use(express.json());

// express.json() helps convert raw JSON data into easy - to - use JavaScript objects.
// Without it, your app can't automatically understand and work with JSON in request bodies.
// It also handles potential errors when trying to parse the JSON, making your app more robust.
// Not using it means you'd have to write extra code to manually parse JSON, which is less efficient and prone to errors.

app.use(cors());
// cors() allows cross-origin resource sharing, which enables a web page to make requests to a different domain than the one the web page was loaded from.

app.use("/api/v1/user", userRouter)

app.use("/api/v1/content", contentRouter)

app.use("/api/v1/brain", brainRouter)

// async function main() {
//     await mongoose.connect()
// }

app.listen(3000, () => {
    console.log("Server is listening on 3000")
})