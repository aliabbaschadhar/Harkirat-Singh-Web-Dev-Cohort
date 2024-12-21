function sum(a,b){
    return a+b;
}
function subtract(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    return a/b;
}
//Approach 1
console.log(sum(2,5));
//Approach 2 
function doOperation(a,b,operation){
    return operation(a,b);
}
//Using callback functions
console.log(doOperation(10,12,sum));
console.log(doOperation(12,2,multiply));