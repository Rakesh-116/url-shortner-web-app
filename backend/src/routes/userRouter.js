// src/routes/userRouter.js (or .ts)
import { Router } from "express";
import { getUserProfileController } from "../controllers/userController.js";
import { privateRoute } from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.route("/profile").get(privateRoute, getUserProfileController);

export default userRouter;
