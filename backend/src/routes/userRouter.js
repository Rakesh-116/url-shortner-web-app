// src/routes/userRouter.js (or .ts)
import { Router } from "express";
import {
  getUserProfileController,
  getAllUserURLsController,
} from "../controllers/userController.js";
import { privateRoute } from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.route("/profile").get(privateRoute, getUserProfileController);

userRouter.route("/myurls").get(privateRoute, getAllUserURLsController);

export default userRouter;
