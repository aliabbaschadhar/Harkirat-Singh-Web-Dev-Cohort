const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json()); //To parse the JSON data from body in the post request
app.use(cors()); // To allow cross-origin requests

// Without CORS enabled, you would see an error in your browser console like:

// Access to XMLHttpRequest at 'http://localhost:3000/sum' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

// For production applications, you should configure CORS more specifically to only allow requests from trusted origins:

// app.use(cors({
//     origin: 'https://your-frontend-domain.com',
// }));

app.post("/sum", (req, res) => {
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);

    res.json({
        ans: a + b,
    })
})

app.listen(3000, () => {
    console.log("Server running on port 3000"); // Fixed port number in log message
})