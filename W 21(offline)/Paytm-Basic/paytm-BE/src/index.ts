import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import { rootRouter } from "./routes";

dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());


app.use("/api/v1", rootRouter);

app.listen(PORT, () => {
    console.log("Backend is running on:", PORT)
})