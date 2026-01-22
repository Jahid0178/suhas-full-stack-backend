import { Router } from "express";
import AuthController from "./auth.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";
import {
  createInviteSchema,
  loginSchema,
  registerViaInviteSchema,
} from "./auth.validation";
import validate from "../../middlewares/validate.middleware";

const router = Router();

router.post("/login", validate(loginSchema), AuthController.handleLogin);
router.post(
  "/invite",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  validate(createInviteSchema),
  AuthController.handleCreateInvite,
);
router.post(
  "/register-via-invite",
  validate(registerViaInviteSchema),
  AuthController.handleRegisterViaInvite,
);

export default router;
