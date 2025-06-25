import { Router } from "express";
import { privateRoute } from "../middlewares/authMiddleware.js";
import {
  generateShortURLController,
  getShortURLController,
} from "../controllers/shortURLController.js";

const shortURLRouter = Router();

shortURLRouter
  .route("/shortener")
  .post(privateRoute, generateShortURLController);

shortURLRouter.route("/:shortURL").get(getShortURLController);

export default shortURLRouter;
