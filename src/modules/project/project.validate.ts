import * as z from "zod";
import { ProjectStatus } from "../../generated/prisma/enums";

export const createProjectSchema = z.object({
  body: z.object({
    name: z.string({ error: "Name is required" }).min(1).trim(),
    description: z.string({ error: "Description is required" }).min(1).trim(),
  }),
});

export const updateProjectSchema = z.object({
  body: z.object({
    name: z.string({ error: "Name is required" }).min(1).trim(),
    description: z.string({ error: "Description is required" }).min(1).trim(),
    status: z.enum(ProjectStatus).default(ProjectStatus.ACTIVE),
  }),
});

export const deleteProjectSchema = z.object({
  params: z.object({
    id: z.string({ error: "Id is required" }).min(1).trim(),
  }),
});
