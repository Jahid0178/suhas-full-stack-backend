import { Router } from "express";
import ProjectController from "./project.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";
import validate from "../../middlewares/validate.middleware";
import {
  createProjectSchema,
  deleteProjectSchema,
  updateProjectSchema,
} from "./project.validate";

const router = Router();

router.get("/", ProjectController.handleGetAllProjects);
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["ADMIN", "STAFF"]),
  validate(createProjectSchema),
  ProjectController.handleCreateProject,
);
router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  validate(updateProjectSchema),
  ProjectController.handleUpdateProjectById,
);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  validate(deleteProjectSchema),
  ProjectController.handleSoftDelete,
);

export default router;
