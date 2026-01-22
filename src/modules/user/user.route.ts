import { Router } from "express";
import UserController from "./user.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";

const router = Router();

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  UserController.handleGetAllUsers,
);

router.patch(
  "/:id/role",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  UserController.handleUpdateUserRole,
);

router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  UserController.handleUpdateUserStatus,
);

export default router;
