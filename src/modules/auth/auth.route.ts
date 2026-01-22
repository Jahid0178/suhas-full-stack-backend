import { Router } from "express";
import AuthController from "./auth.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";

const router = Router();

router.post("/login", AuthController.handleLogin);
router.post(
  "/invite",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  AuthController.handleCreateInvite,
);
router.post("/register-via-invite", AuthController.handleRegisterViaInvite);

export default router;
