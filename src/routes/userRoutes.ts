import { Router } from "express";
import * as userController from "../controllers/userController";
import { authenticateToken } from "../middleware/authMiddleware";
import { validateCreateAccount } from "../validations/createAccountValidation";
import { validateAuthenticate } from "../validations/authValidation";

const router = Router();

router.post(
  "/create-account",
  validateCreateAccount,
  userController.createAccount
);
router.post("/authenticate", validateAuthenticate, userController.authenticate);
router.get("/profile", authenticateToken, userController.getProfile);

export default router;
