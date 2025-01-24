var x = 1; //type infrencing
console.log(x);
function greet(name) {
    console.log("Hello, ".concat(name));
}
function add(x, y) {
    return x + y;
}
var ans = add(1, 2);
console.log(ans);
greet("Ali");
function delayedFunc(anotherFn) {
    setTimeout(anotherFn, 1000);
}
function Hi() {
    console.log("Hi there");
}
delayedFunc(Hi);
