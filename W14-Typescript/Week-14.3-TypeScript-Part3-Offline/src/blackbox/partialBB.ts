// In TypeScript, the `Partial` utility type is used to create a new type from an existing type by making all its properties optional.
// This is useful when you want to work with objects that may not have all the properties defined.

interface User {
    id: number;
    name: string;
    email: string;
}

// Using Partial to make all properties of User optional
type PartialUser = Partial<User>;

// Example usage of PartialUser
const updateUser = (user: PartialUser) => {
    if (user.id !== undefined) {
        console.log(`Updating user with id: ${user.id}`);
    }
    if (user.name !== undefined) {
        console.log(`Updating user name to: ${user.name}`);
    }
    if (user.email !== undefined) {
        console.log(`Updating user email to: ${user.email}`);
    }
};

// Now you can call updateUser with any subset of User properties
updateUser({ name: "Alice" });
updateUser({ id: 123, email: "alice@example.com" });


