import { Router } from "express";
import { loginWithGoogleController } from "../controllers/authController.js";

const authRouter = Router();

authRouter.route("/google").post(loginWithGoogleController);

export default authRouter;
