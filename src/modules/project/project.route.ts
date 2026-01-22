import { Router } from "express";
import ProjectController from "./project.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";

const router = Router();

router.get("/", ProjectController.handleGetAllProjects);
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["ADMIN", "STAFF"]),
  ProjectController.handleCreateProject,
);
router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  ProjectController.handleUpdateProjectById,
);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  ProjectController.handleSoftDelete,
);

export default router;
