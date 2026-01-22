import { Request, Response } from "express";
import { AuthRequest } from "../../typescript/interface";
import { prisma } from "../../lib/database";
import ProjectService from "./project.service";
import {
  InternalServerError,
  NotFoundError,
  ValidationError,
} from "../../utils/errorHandler";

const handleGetAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await ProjectService.getAllProjects();

    if (!projects) {
      throw new NotFoundError("No projects found");
    }

    return res.status(200).json({
      status: 200,
      message: "Projects fetched successfully",
      data: projects,
    });
  } catch (error: unknown) {
    console.log(error);
    return res.status(500).json({ message: "Failed to get projects" });
  }
};

const handleCreateProject = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description } = req.body;
    const userId = req.user?.id;

    const projectData = {
      name,
      description,
    };

    const createdProject = await ProjectService.createProject(
      projectData,
      userId!,
    );

    if (!createdProject) {
      throw new InternalServerError("Failed to create project");
    }

    return res.status(201).json({
      status: 200,
      message: "Project created successfully",
      data: createdProject,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create project" });
  }
};

const handleUpdateProjectById = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, status } = req.body;
    const projectId = req.params.id as string;

    if (!name || !description) {
      throw new ValidationError("Name and description are required");
    }

    const projectData = {
      name,
      description,
      status,
    };

    const updatedProject = await ProjectService.updateProjectById(
      projectId,
      projectData,
    );

    if (!updatedProject) {
      throw new InternalServerError("Failed to update project");
    }

    return res.status(200).json({
      status: 200,
      message: "Project updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update project" });
  }
};

const handleSoftDelete = async (req: AuthRequest, res: Response) => {
  try {
    const projectId = req.params.id as string;

    const deletedProject =
      await ProjectService.softDeleteProjectById(projectId);

    if (!deletedProject) {
      throw new InternalServerError("Failed to delete project");
    }

    return res.status(200).json({
      status: 200,
      message: "Project deleted successfully",
      data: deletedProject,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete project" });
  }
};

const ProjectController = {
  handleGetAllProjects,
  handleCreateProject,
  handleUpdateProjectById,
  handleSoftDelete,
};

export default ProjectController;
