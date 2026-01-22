import { Role } from "../../generated/prisma/enums";
import { prisma } from "../../lib/database";

const findUserByEmail = (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

const findInviteByEmail = (email: string) => {
  return prisma.invite.findFirst({
    where: {
      email,
    },
  });
};

const findInviteByToken = (token: string) => {
  return prisma.invite.findFirst({
    where: {
      token,
    },
  });
};

const createInvite = ({
  email,
  role,
  token,
  expiresAt,
}: {
  email: string;
  role: Role;
  token: string;
  expiresAt: Date;
}) => {
  return prisma.invite.create({
    data: {
      email,
      role,
      token,
      expiresAt,
    },
  });
};

const createUser = ({
  name,
  email,
  password,
  role,
  invitedAt,
}: {
  name: string;
  email: string;
  password: string;
  role: Role;
  invitedAt: Date;
}) => {
  return prisma.user.create({
    data: {
      name,
      email,
      password,
      role,
      invitedAt,
    },
  });
};

const updateInvite = (id: string, data: object) => {
  return prisma.invite.update({
    where: {
      id,
    },
    data,
  });
};

export const AuthService = {
  createInvite,
  createUser,
  findUserByEmail,
  findInviteByEmail,
  findInviteByToken,
  updateInvite,
};
