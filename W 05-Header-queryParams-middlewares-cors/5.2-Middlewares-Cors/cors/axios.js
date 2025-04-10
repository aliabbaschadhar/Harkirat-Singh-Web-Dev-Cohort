const express = require("express");
const app = express();

const axios = require("axios");

// The response object contains the following properties:

// data: The response body.
//     status: The HTTP status code.
//         statusText: The HTTP status message.
//             headers: The response headers.
//                  config: The request configuration.

axios.post("http://localhost:3000/sum/", {
    a: 1,
    b: 2,
});
// get method


axios({
    method: 'get',
    url: 'https://api.example.com/data',
    headers: {
        'Authorization': 'Bearer your_token_here',
        'Content-Type': 'application/json'
    },
    params: {
        id: 123,
        category: 'books'
    }
})
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });


//axios.post method

axios.post('https://api.example.com/data', {
    name: 'John Doe',
    email: 'john.doe@example.com'
}, {
    headers: {
        'Authorization': 'Bearer your_token_here',
        'Content-Type': 'application/json'
    }
})
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });

//Skeleton
axios.post(
    "http://localhost:3000/sum/", // URL
    {                             // Body (data to send)
        body: "body"
    },
    {                             // Config object (headers, params, etc.)
        headers: {
            "Content-Type": "application/json", // Example header
            "Authorization": "Bearer your_token_here" // Example header
        }
    }
)
    .then(response => {
        console.log("Response:", response.data); // Handle successful response
    })
    .catch(error => {
        console.error("Error:", error); // Handle error
    });

//put method
axios.put('https://api.example.com/data', {
    name: 'John Doe',
    email: 'john.doe@example.com'
}, {
    headers: {
        'Authorization': 'Bearer your_token_here',
        'Content-Type': 'application/json'
    }
})
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });

//delete method
axios.delete('https://api.example.com/data', {
    headers: {
        'Authorization': 'Bearer your_token_here',
        'Content-Type': 'application/json'
    }
})
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    });

