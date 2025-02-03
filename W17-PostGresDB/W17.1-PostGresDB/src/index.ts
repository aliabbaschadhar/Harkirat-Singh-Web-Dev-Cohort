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
        // SQL injection is a technique where an attacker injects malicious SQL code in a web application to access, modify or manipulate the database.
        // In this case we are directly using the user input in our SQL query which can be harmfull.
        // For example if an attacker passes a string like "SELECT * FROM users" in the username field, it will be injected in the query and the database will return all the rows.
        // To prevent this we should use parameterized queries where the user input is passed as a parameter to the query.

        //! const inserQuery = `INSERT INTO users (username,password,email) VALUES ('${username}','${password}','${email}')`;

        const inserQuery = `INSERT INTO users (username,password,email) VALUES ($1,$2,$3)`;
        // Using parameterized variables queries prevents SQL injection by separating SQL code from user input. User inputs are passed as parameters, which the database treats as data only, not executable code.
        //Week 17.1 done!!!

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

