import express from "express";
import cors from "cors"
import dotenv from "dotenv"

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

app.listen(3000, () => {
    console.log("Server is listening on 3000")
}) 