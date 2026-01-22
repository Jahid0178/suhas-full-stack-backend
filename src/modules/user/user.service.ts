import { Role, UserStatus } from "../../generated/prisma/enums";
import { prisma } from "../../lib/database";

const getAllUsers = (skip: number, limit: number) => {
  return prisma.user.findMany({
    skip,
    take: limit,
  });
};

const countAllUsers = () => {
  return prisma.user.count();
};

const findUserById = (id: string) => {
  return prisma.user.findFirst({
    where: {
      id,
    },
  });
};

const updateUserRole = (id: string, role: Role) => {
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      role,
    },
  });
};

const updateUserStatus = (id: string, status: UserStatus) => {
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
};

const UserService = {
  getAllUsers,
  countAllUsers,
  findUserById,
  updateUserRole,
  updateUserStatus,
};

export default UserService;
