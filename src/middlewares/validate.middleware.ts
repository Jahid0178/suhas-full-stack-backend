import { NextFunction, Request, Response } from "express";
import { ZodSchema, ZodError } from "zod";
import { InternalServerError } from "../utils/errorHandler";

const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        error.issues;
      }

      if (error instanceof Error) {
        throw new InternalServerError(error.message);
      }

      throw new InternalServerError("Something went wrong");
    }
  };

export default validate;
