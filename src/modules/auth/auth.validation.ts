import * as z from "zod";
import { Role } from "../../generated/prisma/enums";

export const loginSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string().min(6),
  }),
});

export const createInviteSchema = z.object({
  body: z.object({
    email: z.email(),
    role: z.enum(Role).default(Role.STAFF),
  }),
});

export const registerViaInviteSchema = z.object({
  body: z.object({
    name: z.string({ error: "Name is required" }).min(1).trim(),
    password: z.string({ error: "Password is required" }).min(6).trim(),
    token: z.string({ error: "Token is required" }).min(1).trim(),
  }),
});
