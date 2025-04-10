// Typescript follows ES6 module system.

import { genGetFirstElement } from "./generics"; // simple export
import identity from "./generics"; // export default

let alpha = genGetFirstElement(["Hello", "hi"]);
console.log(alpha.toLowerCase()); // hello

let hello = identity("how are you");
console.log(hello.toUpperCase()); // HOW ARE YOU

