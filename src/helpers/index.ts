import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config";

export const hashPassword = (password: string) => bcrypt.hash(password, 10);

export const comparePassword = (password: string, hash: string) =>
  bcrypt.compare(password, hash);

export const signToken = (payload: object) =>
  jwt.sign(payload, config.JWT_SECRET, { expiresIn: "1d" });

export const verifyToken = (token: string) =>
  jwt.verify(token, config.JWT_SECRET);

export const generateToken = () => Math.random().toString(36).substring(2, 15);
