import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

// Creating user using prisma
async function createUser() {
    try {
        const newUser = await client.user.create({
            data: {
                username: "john_doe",
                password: "secure_pass",
                age: 30,
                city: "New York",
            }
        });
        console.log("User created successfully:", newUser);
    } catch (error) {
        console.error("Error creating user:", error);
    }
}

createUser();

