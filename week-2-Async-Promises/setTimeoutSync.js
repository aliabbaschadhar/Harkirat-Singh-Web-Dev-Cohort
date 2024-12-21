//As we know that setTimeout() is originally a Asyncronous function that executes a certain code after some time

//Let's make it in the syncronous way

// This function simulates a synchronous setTimeout behavior
function setTimeoutSync(timeout) {
    // Record the start time
    let startTime = new Date();
    // Infinite loop to block execution
    while (1) {
        // Get the current time
        let currentTime = new Date();
        // Check if the elapsed time exceeds the specified timeout
        if (currentTime.getTime() - startTime.getTime() > timeout)
            break; // Exit the loop if the timeout has been reached
    }
}

// Call the setTimeoutSync function with a timeout of 1000 milliseconds (1 second)
setTimeoutSync(1000);

// Log a message to the console after the timeout
console.log("Hi There");

// Explanation of synchronous behavior:
// The function blocks the execution of any further code until the timeout is reached,
// making it synchronous. This means that the code following the function call will only
// execute after the specified timeout has completed, thus preventing any other code from running during this period.

//Also because javascript has single threaded nature It will first complete the task running in the CPU then it will execute the next tasks present in the callback Queue.


// 1. Call Stack
//  The call stack is a data structure that keeps track of the function calls in your program. It operates in a "Last In, First Out" (LIFO) manner, meaning the last function that was called is the first one to be executed and removed from the stack.
// When a function is called, it gets pushed onto the call stack. When the function completes, it's popped off the stack.

// function first() {
//     console.log("First");
//   }
//   function second() {
//     first();
//     console.log("Second");
//   }
//   second();

// 2. Web APIs
// Web APIs are provided by the browser (or the Node.js runtime) and allow you to perform tasks that are outside the scope of the JavaScript language itself, such as making network requests, setting timers, or handling DOM events.

// 3. Callback Queue ---> 
// The Callback queue is a list of tasks(callbacks) that are waiting to be executed once the call stack is empty. These tasks are added to the queue by Web APIs after they have completed.

// 4. Event loop
// The event loop constantly checks if the call stack is empty. If it is, and there are callbacks in the callback queue, it will push the first callback from the queue onto the call stack for execution.
