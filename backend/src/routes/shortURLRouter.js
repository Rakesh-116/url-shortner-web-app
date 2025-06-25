import { Router } from "express";
import { privateRoute } from "../middlewares/authMiddleware.js";
import {
  generateShortURLController,
  getShortURLController,
  getAllShortURLsController,
} from "../controllers/shortURLController.js";

const shortURLRouter = Router();

shortURLRouter.route("/shortener").post(generateShortURLController);

shortURLRouter.route("/:shortURL").get(getShortURLController);

shortURLRouter.route("/all").get(getAllShortURLsController);

export default shortURLRouter;
