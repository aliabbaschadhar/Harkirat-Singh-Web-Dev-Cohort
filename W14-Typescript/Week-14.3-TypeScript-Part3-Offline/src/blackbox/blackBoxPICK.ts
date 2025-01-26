// What is Pick in ts and for what purposes it is used and also give me some example with some proper comments included in it?// The Pick utility type in TypeScript is used to create a new type by picking a subset of properties from an existing type.
// It is useful when you want to create a new type that includes only a few properties from an existing type.

// For example, let's say we have a type called 'Person' with properties 'name', 'age', and 'address'.
type Person = {
    name: string;
    age: number;
    address: {
        street: string;
        city: string;
        state: string;
        zip: string;
    };
};

// Now, let's say we want to create a new type called 'PersonInfo' that includes only the 'name' and 'age' properties from the 'Person' type.
// We can use the Pick utility type to achieve this.
type PersonInfo = Pick<Person, 'name' | 'age'>;

// The 'PersonInfo' type will now have only the 'name' and 'age' properties.
const personInfo: PersonInfo = {
    name: 'John Doe',
    age: 30,
};

// We can also use the Pick utility type to create a new type that includes all properties from an existing type except for a few.
// For example, let's say we want to create a new type called 'PersonDetails' that includes all properties from the 'Person' type except for the 'address' property.
// We can use the Omit utility type in combination with the Pick utility type to achieve this.
type PersonDetails = Omit<Person, 'address'>;

// The 'PersonDetails' type will now have all properties from the 'Person' type except for the 'address' property.
const personDetails: PersonDetails = {
    name: 'John Doe',
    age: 30,
};
