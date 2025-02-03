import { Client } from "pg";
import dotenv from "dotenv";
import express from "express";

const app = express();

app.use(express.json());

dotenv.config();

const pgClient = new Client({
    connectionString: process.env.DB_CONNECTION,
});

pgClient.connect();

app.post("signup", async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const inserQuery = `INSERT INTO users (username,password,email) VALUES ($1,$2,$3)`;

        const response = await pgClient.query(inserQuery, [username, password, email]);

        res.json({
            msg: "You have signUp"
        })
    } catch (e) {
        console.log(e);
        res.json({
            msg: "Error while signing UP!"
        })
    }
})

// async function main() {
//     await pgClient.connect();

//     const response = await pgClient.query("SELECT * FROM users");

//     console.log(response.rows);
//     await pgClient.end(); // Close the database connection after we're done with it
// }

main();

