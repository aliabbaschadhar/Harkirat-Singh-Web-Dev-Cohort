function HI(arg, time, getNextData) {
    setTimeout(() => {
        console.log(arg);
        if (getNextData) {
            getNextData();
        }
    }, time)
}
//Callback Hell
// HI("hi", 1000, () => {
//     HI("Hello", 3000, () => {
//         HI("Hello There", 5000);
//     })
// })

//Using promisified timeout

function setTimeoutPromisified(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

//Promise Hell
// setTimeoutPromisified(1000).then(() => {
//     console.log("HI");
//     setTimeoutPromisified(3000).then(() => {
//         console.log("Hello")
//         setTimeoutPromisified(5000).then(() => {
//             console.log("Hi there");
//         })
//     })
// })

//Promise chaining
setTimeoutPromisified(1000).then(() => {
    console.log("Hi");
    return setTimeoutPromisified(5000);
}).then(() => {
    console.log("Hello");
    return setTimeoutPromisified(10000);
}).then(() => {
    console.log("Hi Im here after 10 seconds");
})