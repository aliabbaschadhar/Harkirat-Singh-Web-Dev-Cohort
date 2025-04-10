// Synchronous 
// Synchronous means the code runs in a particular sequence of instructions given in the program.
// Each instruction waits for the previous instruction to complete its execution

// Asynchronous code
// Due to synchronous programming, sometimes imp instructions get
// blocked due to some previous instructions, which causes a delay in the UI.
// Asynchronous code execution allows to execute next instructions
// immediately and doesn't block the flow

// Asynchronous

console.log("one"); //First

setTimeout(() => {
    console.log("Hello"); //Printed after 4 seconds delay (third)
}, 4000)

console.log("two"); //second 



