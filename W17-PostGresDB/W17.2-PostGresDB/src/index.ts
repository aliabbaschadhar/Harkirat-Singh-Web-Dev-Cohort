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

        await pgClient.query("COMMIT;") //Ends here

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

app.get("/metadata", async (req, res) => {
    const { id } = req.query;

    if (!id) {
        res.json({
            msg: "Please provide id"
        })
        return;
    }

    const query1 = `SELECT username,email,id 
    FROM users
    WHERE id=$1`;

    const response1 = await pgClient.query(query1, [id]);

    const query2 = `SELECT * FROM addresses WHERE user_id=$1`;
    const response2 = await pgClient.query(query2, [id]);

    res.json({
        user: response1.rows[0],
        address: response2.rows,
    })
    // We are trying to get users information and address information from the tables using id 
})

app.get("/better-metadata", async (req, res) => {
    const { id } = req.query;

    if (!id) {
        res.json({
            msg: "Please provide id"
        })
        return;
    }

    // We can replace users to u and addresses to a by using alias like done down below

    const query = `SELECT u.id, u.username, u.email, a.city, a.country, a.street, a.pincode
    FROM users u 
    JOIN addresses a 
    ON u.id = a.user_id
    WHERE user_id = $1`;

    const response = await pgClient.query(query, [id]);

    res.json({
        response
    })
})


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})
