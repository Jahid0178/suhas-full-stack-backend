import { Response, NextFunction } from "express";
import { prisma } from "../lib/database";
import { verifyToken } from "../helpers";
import { AuthRequest, JwtPayload } from "../typescript/interface";

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cookies = req.cookies;

    if (!cookies || !cookies.token) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const token = cookies.token;

    const decoded = verifyToken(token) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        role: true,
        status: true,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (user.status === "INACTIVE") {
      return res.status(403).json({ message: "User account is inactive" });
    }

    req.user = {
      id: user.id,
      role: user.role,
    };

    next();
  } catch (error) {
    console.log("auth middleware error", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
