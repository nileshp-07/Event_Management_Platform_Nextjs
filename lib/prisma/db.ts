import { PrismaClient } from "@prisma/client";

// Create a single instance of PrismaClient
const prismaClientSingleton = (() => {
  let client: PrismaClient | null = null;

  return () => {
    if (!client) {
      client = new PrismaClient();
    }
    return client;
  };
})();

// Always use the same PrismaClient instance
const db = prismaClientSingleton();

export default db;
