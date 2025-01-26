const user = {
    name: "john",
    age: 30,
    email: "email@gmail.com",
}

interface User {
    name: string,
    age: number,
    email: string,
}

function isLegal(obj: User) {
    obj.age >= 18 ? console.log("Person is legal") : console.log("Person is not legal!");
}

isLegal(user);