// We can type objects like this

interface User889 {
    id: string | number,
    name: string,
}

// Key value pair
type Users889 = { [key: string]: User889 };

const users: Users889 = {
    'abc13': { id: 'abcded', name: "john doe" },
    'axouaf': { id: "afdaoi2", name: "baby" },
};

// Using records

type Users88 = Record<string, User889>

const users12: Users88 = {
    'abc13': { id: 'abcded', name: "john doe" },
    'axouaf': { id: "afdaoi2", name: "baby" },
}

console.log(users['abc13'])

type Person2 = Record<"name" | 'age', string | number>;

const person: Person2 = {
    name: 'John',
    age: 30,
}

console.log(person.name);

// Another fancier to deal with objects is using Maps like cpp Maps

// Init an empty Map

const usersMap = new Map<string, User889>();

// Add users to map using .set

usersMap.set('abc123', { id: "abc123", name: "john Doe" });
usersMap.set('xyxafld', { id: 9138, name: "Django" });


// Accessing a value using .get
console.log(usersMap.get("abc123")); // output : {'abc123',{id:"abc123", name: "john Doe"} }