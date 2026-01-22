import { Request, Response } from "express";

import { prisma } from "../../lib/database";
import {
  comparePassword,
  generateToken,
  hashPassword,
  signToken,
} from "../../helpers";
import { AuthService } from "./auth.service";
import {
  ConflictError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from "../../utils/errorHandler";

// handle login
const handleLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await AuthService.findUserByEmail(email);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid password");
    }

    const token = signToken({
      id: user.id,
      name: user.name,
      role: user.role,
      email: user.email,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error: unknown) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// handle create invite
const handleCreateInvite = async (req: Request, res: Response) => {
  try {
    const { email, role } = req.body;

    if (!email || !role) {
      throw new ValidationError("Email and role are required");
    }

    const existingInvite = await AuthService.findInviteByEmail(email);

    if (existingInvite) {
      throw new ConflictError("Invite already exists");
    }

    const user = await AuthService.findUserByEmail(email);

    if (user) {
      throw new ConflictError("User already exists");
    }

    const invite = await AuthService.createInvite({
      email,
      role,
      token: generateToken(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    return res.status(201).json({
      message: "Invite sent successfully",
      data: invite,
    });
  } catch (error: unknown) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleRegisterViaInvite = async (req: Request, res: Response) => {
  try {
    const { password, name, token } = req.body;
    const invite = await AuthService.findInviteByToken(token);

    if (!invite) {
      throw new NotFoundError("Invitation not found");
    }

    const existingUser = await AuthService.findUserByEmail(invite.email);

    if (existingUser) {
      throw new ConflictError("User already exists");
    }

    const isExpiredToken = invite.expiresAt < new Date();

    if (isExpiredToken) {
      throw new UnauthorizedError("Invitation expired");
    }

    const hashedPassword = await hashPassword(password);

    const createUser = await AuthService.createUser({
      name,
      email: invite.email,
      password: hashedPassword,
      role: invite.role,
      invitedAt: invite.createdAt,
    });

    if (!createUser) {
      throw new InternalServerError("Internal server error");
    }

    await AuthService.updateInvite(invite.id, {
      acceptedAt: new Date(),
    });

    return res.status(200).json({
      message: "User registered successfully",
    });
  } catch (error: unknown) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const AuthController = {
  handleLogin,
  handleCreateInvite,
  handleRegisterViaInvite,
};

export default AuthController;
