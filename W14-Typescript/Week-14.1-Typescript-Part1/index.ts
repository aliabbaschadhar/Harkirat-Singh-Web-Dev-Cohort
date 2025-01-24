let x: number = 1; //type infrencing
console.log(x)

function greet(name: string): void {
    console.log(`Hello, ${name}`);
}

function add(x: number, y: number): number {
    return x + y;
}
let ans = add(1, 2);
console.log(ans)
greet("Ali");

function delayedFunc(anotherFn: () => void): void {
    setTimeout(anotherFn, 1000);
}

function Hi(): void {
    console.log("Hi there");
}

delayedFunc(Hi);

function delayedFunc2(anotherFn: () => number): void {
    setTimeout(() => {
        const result: number = anotherFn();
        console.log(result);
    }, 1000);
}

function add2(x: number, y: number): number {
    return x + y;
}

// delayedFunc2(add2(89,9))

// The error here is that the function `delayedFunc2` expects a function that returns a number
// but we are passing a number directly to it. This is because the function `add2` is called 
// immediately and its return value (a number) is passed to `delayedFunc2` instead of the
// function itself. To fix this, we should pass the function `add2` itself to `delayedFunc2`
// and then call it inside the `setTimeout` callback.

delayedFunc2(() => add2(89, 22));

