interface Address {
    city: string,
    country: string,
    pincode: number
    hourseNumber: string,
}

// Interfaces can also use other interfaces
interface User {
    name: string,
    age: number,
    email?: string, // optional
    address?: Address,
}



const user: User = {
    name: "john",
    age: 30,
    email: "email@gmail.com",
}

const user2: User = {
    name: "john",
    age: 30,
}


function isLegal(obj: User) {
    obj.age >= 18 ? console.log("Person is legal") : console.log("Person is not legal!");
}

isLegal(user);