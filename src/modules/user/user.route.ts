import { Router } from "express";
import UserController from "./user.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";
import validate from "../../middlewares/validate.middleware";
import { updateRoleSchema, updateUserStatusSchema } from "./user.validate";

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
  validate(updateRoleSchema),
  UserController.handleUpdateUserRole,
);

router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  validate(updateUserStatusSchema),
  UserController.handleUpdateUserStatus,
);

export default router;
