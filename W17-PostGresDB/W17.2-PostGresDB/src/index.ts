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
    const { username, password, email, city, country, street, pincode } = req.body;

    try {
        const insertQuery = `INSERT INTO users (username,password,email) VALUES ($1,$2,$3) RETURNING id`;
        const insertAddressQuery = `INSERT INTO addresses (city,country,street,pincode,user_id) VALUES ($1,$2,$3,$4,$5)`

        // transaction begins here
        await pgClient.query("BEGIN;")

        const response = await pgClient.query(insertQuery, [username, password, email]);

        const user_id = response.rows[0].id;

        const addressInsertResponse = await pgClient.query(insertAddressQuery, [city, country, street, pincode, user_id])

        await pgClient.query("COMMIT;") //End here

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
