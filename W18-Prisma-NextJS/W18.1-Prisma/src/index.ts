import { PrismaClient } from "@prisma/client";
import { create } from "domain";

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
};
createUser();

async function deleteUser() {
    try {
        await client.user.delete({
            where: {
                id: 3,
            }
        })
    } catch (error) {
        //@ts-ignore
        console.log("Error occured while deleting: ", error.meta.cause);
    }
}


