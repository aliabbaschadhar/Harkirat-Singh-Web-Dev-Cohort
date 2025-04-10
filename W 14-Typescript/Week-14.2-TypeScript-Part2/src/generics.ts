// What are generics in typescript?
// Generics in TypeScript allow you to create reusable components that can work with different types of data. 
// Generics enable you to create components that work with any data type while still providing compile - time type safety.

// Problem: We need to return first element of array and array can be number or string how would we implement this?

function getFirstElement(arr: (number | string)[]) {
    return arr[0];
}

const ele = getFirstElement([1, 2, 3])
console.log(ele)

// Problem with this approach is that user can send different types of inputs, without any type of errors and ts would not be able to infer the right type of return type

const val1 = getFirstElement(['ali', 'abbas', 'chadhar']);

// console.log(val1.toUpperCase()); // toUpperCase() will cause error.
// Here ts is not able to infer the proper type of coming datatype we are saying that it could be number or can be a string but we don't know what it is.

// So for that we will use generics 

export function genGetFirstElement<G>(arr: G[]): G {
    return arr[0];
}

let output1 = genGetFirstElement(['ali', 'abbas', 'chadhar']);
console.log(output1.toUpperCase()) // ALI

export default function identity<T>(arg: T): T {
    return arg;
}

let beta = identity<string>("Hello");
console.log(beta.toUpperCase()) // HELLO

let beta2 = identity<number>(8899);
console.log(beta2) // 8899