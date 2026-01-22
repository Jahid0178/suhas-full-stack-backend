import { prisma } from "../../lib/database";

const getAllProjects = () => {
  return prisma.project.findMany({
    where: {
      isDeleted: false,
    },
  });
};

const createProject = (
  data: { name: string; description: string },
  userId: string,
) => {
  return prisma.project.create({
    data: {
      name: data.name,
      description: data.description,
      creator: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

const updateProjectById = (
  projectId: string,
  data: { name: string; description: string },
) => {
  return prisma.project.update({
    where: {
      id: projectId,
    },
    data,
  });
};

const softDeleteProjectById = (projectId: string) => {
  return prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      isDeleted: true,
    },
  });
};

const ProjectService = {
  getAllProjects,
  createProject,
  updateProjectById,
  softDeleteProjectById,
};

export default ProjectService;
