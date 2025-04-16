import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import { rootRouter } from "./routes/"

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

app.use("/api/v1", rootRouter);

app.listen(3001, () => {
    console.log("Server is listening on 3000")
}) 