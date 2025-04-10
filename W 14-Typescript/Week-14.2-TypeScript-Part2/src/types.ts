type User1 = {
    firstName: string,
    lastName: string,
    age: number,
}

// Unions in types
// Let’s say you want to print the id of a user, which can be a number or a string.

type stringOrNumber = string | number;

function printId(id: stringOrNumber) {
    console.log(`ID : ${id}`)
}

printId(101);
printId("202");

// What if you want to create a type that has every property of multiple types / interfaces
// Intersection

type Worker1 = {
    name: string,
    startDate: Date,
}

type Manager = {
    name: string,
    department: string,
}

type TeamLead = Worker1 & Manager;

const teamLead: TeamLead = {
    name: "harkirat",
    startDate: new Date(),
    department: "Software engineer"
}