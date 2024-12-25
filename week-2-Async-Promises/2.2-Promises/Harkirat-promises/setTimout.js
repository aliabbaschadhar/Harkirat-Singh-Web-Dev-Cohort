function setTimeoutPromisified(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function getData() {
    console.log("Data after 3 seconds");
}

setTimeoutPromisified(3000).then(getData);
//If 3sec completed then execute the first argument of the input function given to the promise class here it is resolve.
//Then execute whatever is in then() callback.
