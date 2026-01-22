import { Request, Response } from "express";
import UserService from "./user.service";
import { Role, UserStatus } from "../../generated/prisma/enums";

const handleGetAllUsers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const totalUsers = await UserService.countAllUsers();
    const totalPages = Math.ceil(totalUsers / limit);
    const users = await UserService.getAllUsers(skip, limit);

    if (!users) {
      return res.status(404).json({ message: "Users not found" });
    }

    return res.status(200).json({
      status: 200,
      message: "Users fetched successfully",
      data: users,
      meta: {
        page,
        limit,
        totalUsers,
        totalPages,
      },
    });
  } catch (error: unknown) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleUpdateUserRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!id || !role) {
      return res.status(400).json({ message: "User ID and role are required" });
    }

    const existingUser = await UserService.findUserById(id as string);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await UserService.updateUserRole(
      id as string,
      role as Role,
    );

    if (!updatedUser) {
      return res.status(500).json({ message: "Internal server error" });
    }

    return res.status(200).json({
      status: 200,
      message: "Updated user role",
      data: updatedUser,
    });
  } catch (error: unknown) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleUpdateUserStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!id || !status) {
      return res
        .status(400)
        .json({ message: "User ID and status are required" });
    }

    const existingUser = await UserService.findUserById(id as string);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await UserService.updateUserStatus(
      id as string,
      status as UserStatus,
    );

    if (!updatedUser) {
      return res.status(500).json({ message: "Internal server error" });
    }

    return res.status(200).json({
      status: 200,
      message: "Updated user status",
      data: updatedUser,
    });
  } catch (error: unknown) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const UserController = {
  handleGetAllUsers,
  handleUpdateUserRole,
  handleUpdateUserStatus,
};

export default UserController;
