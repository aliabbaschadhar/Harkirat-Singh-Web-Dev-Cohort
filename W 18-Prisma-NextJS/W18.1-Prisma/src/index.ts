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
// createUser();

async function updateUser() {
    try {
        const updatedUser = await client.user.update({
            where: {
                id: 7,
            },
            data: {
                city: "Howareyou",
            }
        })
        console.log("User updated successfully: ", updatedUser)
    } catch (error) {
        console.log("Error occurd while updating user:", error);
    }
}

updateUser();

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


