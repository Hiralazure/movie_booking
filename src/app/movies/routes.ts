import { Router } from "express";
import { MovieController } from "./controller";
export const movieRouter = Router();
const movieController = new MovieController();
movieRouter.post("/add", movieController.addMovies.bind(movieController));
movieRouter.get("/get", movieController.getMovies.bind(movieController));
movieRouter.post("/update/:id",movieController.updateMovies.bind(movieController))
