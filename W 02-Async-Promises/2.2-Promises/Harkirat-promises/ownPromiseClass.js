class MyPromise {
    constructor(fn) {
        const afterDone = () => {
            this.resolve();
        }
        fn(afterDone);
    }
    then(callback) {
        this.resolve = callback;
    }
}

function readTheFile(resolve) {
    setTimeout(() => {
        console.log("callback based setTimeout completed");
        resolve();
    }, 2000);
}
function setTimoutPromisified() {
    return new MyPromise(readTheFile);
}

let promise = setTimoutPromisified();
function callback(data) {
    console.log("Callback has been called")
}
promise.then(callback)