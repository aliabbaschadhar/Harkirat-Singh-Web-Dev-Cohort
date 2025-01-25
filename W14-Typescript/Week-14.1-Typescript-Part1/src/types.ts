const user = {
    name: "Ali",
    age: 22
}

function hello(user: {
    name: string,
    age: number,
}) {
    console.log("Hello ", user.name);
}

hello(user);

type S = string | number;

let var1: S = 1;
let var2: S = "ali";

let z = var1 + var2;
// ts can sum number +number
//ts can sum number + string
// ts can sum string+string

function sumResult(x: S, y: S) {
    // return x + y; // causes error
}

// ts can't sum string|number + string|number


// Behind the secene what happens when we use this kind of type like S

type sumInput = string | number;

function sumBehind(a: sumInput, b: sumInput) {
    // Behind the secene it checks for the type of var and then execute according to it.
    // It do runtime checks.
    if (typeof a === "number" && typeof b === "number") {
        return a + b;
    } else {
        return String(a) + String(b);
    }
}

