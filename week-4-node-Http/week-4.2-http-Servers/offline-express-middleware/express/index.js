const express = require("express");

// Create an Express application
const app = express();

const users = [
    {
        name: "John",
        kidneys: [{
            healthy: false,
        },
        {
            healthy: true,
        },],
    },
    {
        name: "Jane",
        kidneys: [{
            healthy: true,
        },
        {
            healthy: true,
        },
        {
            healthy: false,
        }],
    },
    {
        name: "Bob",
        kidneys: [{
            healthy: true,
        },
        {
            healthy: false,
        },
        {
            healthy: true,
        },
        {
            healthy: false
        },
        ],
    },
]

// Middleware to parse incoming JSON requests
app.use(express.json());

// GET endpoint to retrieve kidney information for all users
app.get('/', (req, res) => {
    const responses = [];
    // Calculate kidney statistics for each user
    users.forEach((user) => {
        const numOfKidneys = user.kidneys.length;
        const numOfHealthyKidneys = user.kidneys.filter((kidney) => kidney.healthy !== false).length;
        responses.push(`${user.name} has ${numOfKidneys} kidneys and has ${numOfHealthyKidneys} healthy kidneys & has ${numOfKidneys - numOfHealthyKidneys} unhealthy kidneys`)
    })
    // Send response as JSON array
    res.json(responses);
})

// In post user sends data to the server with the help of body
// POST endpoint to add a new kidney for all users
app.post("/", (req, res) => {
    // Get kidney health status from request body
    const isHealthy = req.body.isHealthy;
    // Add new kidney to each user
    users.forEach((user) => {
        user.kidneys.push({ healthy: isHealthy });
    })
    // Send success response
    res.json({ msg: "Done!" })
})

// PUT endpoint to mark all kidneys as healthy
app.put("/", (req, res) => {
    // Update each kidney's health status
    users.forEach((user) => {
        user.kidneys.forEach((kidney) => {
            kidney.healthy = true;
        })
    })
    // Send empty response to indicate success
    res.json({})
})

// DELETE endpoint to remove all unhealthy kidneys
app.delete("/", (req, res) => {
    // Filter out unhealthy kidneys for each user
    users.forEach((user) => {
        user.kidneys = user.kidneys.filter((kidney) => kidney.healthy === true);
    });
    // Send success response
    res.json({ msg: "done!" });
})

// Start the server on port 3000
app.listen(3000);
