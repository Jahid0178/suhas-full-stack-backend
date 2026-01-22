import { Request } from "express";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: "ADMIN" | "MANAGER" | "STAFF";
  };
}

export interface JwtPayload {
  id: string;
  role: "ADMIN" | "MANAGER" | "STAFF";
}
