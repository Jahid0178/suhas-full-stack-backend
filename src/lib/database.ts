import config from "../config/config";
import { PrismaClient } from "../generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

export const prisma = new PrismaClient({
  accelerateUrl: config.DATABASE_URL,
}).$extends(withAccelerate());
