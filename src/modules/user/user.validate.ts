import * as z from "zod";
import { Role, UserStatus } from "../../generated/prisma/enums";

export const updateRoleSchema = z.object({
  body: z.object({
    role: z.enum(Role).default(Role.STAFF),
  }),
  params: z.object({
    id: z.string({ error: "Id is required" }).min(1).trim(),
  }),
});

export const updateUserStatusSchema = z.object({
  body: z.object({
    status: z.enum(UserStatus).default(UserStatus.ACTIVE),
  }),
  params: z.object({
    id: z.string({ error: "Id is required" }).min(1).trim(),
  }),
});
