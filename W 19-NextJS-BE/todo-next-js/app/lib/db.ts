// A singleton Prisma client is an instance of the Prisma client that is created only once and reused throughout the application.
// This means that instead of creating a new Prisma client instance every time you need to interact with the database, you create a single instance and use it everywhere.

// Preventing multiple connections: In development with hot - reloading, this prevents creating multiple database connections when the file is reloaded
// Singleton access: It ensures the same Prisma client instance is used throughout the application
// Without this pattern, you might get errors about too many database connections during development as files reload.

import { PrismaClient } from "@prisma/client";

// Declare global type
declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

// Create new Prisma instance if not exists, otherwise reuse global instance
const prisma = globalThis.prisma || new PrismaClient();

// Save reference in development to prevent multiple instances
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

export default prisma;
