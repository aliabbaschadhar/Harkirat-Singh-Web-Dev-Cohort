//Async-await is a syntax that allows you to write asynchronous code in a more synchronous and readable manner.
// It provides a way to handle asynchronous operations in a more structured and easy-to-read way, making it easier to manage and understand complex asynchronous code.

//Async function always returns a promise

//To use async await we make our fucntion async and then use await in it to wait for the promise to resolve

// Await pauses the execution of its surrounding async function until the promise is not resovled

// callbackHell --> Promise Chaining --> Async-Await

function api() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Whether data");
            resolve(200);
        }, 2000)
    })
}

async function getWhetherData() {
    await api(); //1st 
    await api(); //2nd
    await api(); //3rd
}

getWhetherData();

//Using previous callbackData() function

function callbackData(dataId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Data :", dataId);
            resolve("success");
        }, 2000)
    })
}

//await stops the execution of surrounding async function 
(async function getCallbackData() {
    await callbackData(1);
    await callbackData(2);
    await callbackData(3);
    await callbackData(4);
})() //Using as IIFE 