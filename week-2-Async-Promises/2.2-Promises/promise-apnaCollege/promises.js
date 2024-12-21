// Promises in Js 
// A promise is an object that represents the eventual completion or failure of an asynchronous operation.
// It is a way to handle asynchronous code in a more structured and predictable way.

//Promise has 3 states
// 1. Pending --> Initial state
// 2. Fulfilled --> When the operation is successful
// 3. Rejected  --> When the operation fails due to some error


let promise1 = new Promise((resolve, reject) => {
    console.log("I am a promise");
    resolve("I am resolved");
})

console.log(promise1); //Promise { <fullfilled> } //I am resolved



const getPromise = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Resolved");
            // reject("Fuck you");
            console.log("I am a promise my Love");
        }, 2000);
    })
}

let promise = getPromise();

//If promise is resolved successfully then we apply operation on promise using then
promise.then((data) => {
    console.log("Data says: ", data);
    console.log("Promise fullfilled");
})

//If promise is rejected then we apply operation on promise using catch
// promise.catch((error) => {
//     console.log("Error says: ", error);
//     console.log("Promise rejected");
// })


// function callbackData(dataId, getNextData) {
//     // 2sec
//     setTimeout(() => {
//         console.log("Data :", dataId);
//         if (getNextData) {
//             getNextData();
//         }
//     }, 2000);
// }

// callbackData() in the form of promises

// function callbackData(dataId, getNextData) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log("Data :", dataId);
//             resolve("success");
//             if (getNextData) {
//                 getNextData();
//             }
//         })
//     })
// }

// We don't need getNextData because we are using promises

function callbackData(dataId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Data :", dataId);
            resolve("success");
        }, 2000)
    })
}


callbackData(1).then(() => {
    callbackData(2).then(() => {
        callbackData(3).then(() => {
            callbackData(4).then((res) => {
                console.log(res);
            })
        })
    })
})

//Promise Chaining
callbackData(1).then(() => {
    return callbackData(2);
}).then(() => {
    return callbackData(3);
}).then(() => {
    return callbackData(4);
}).then((res) => {
    console.log(res)
})

//Logic --> call data 1 and if it got suceed then call data 2 and if it got succeed then calldata3 and if got succeed then calldata4 and
//  then print the result like the promise is resolved or not.