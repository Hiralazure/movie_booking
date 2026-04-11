import { Request, Response } from "express";
import { moviePayload, updateMoviePayload } from "./model";
import { db } from "../../db";
import { movies } from "../../db/schema";
import { eq } from "drizzle-orm";
export class MovieController {
  public async addMovies(req: Request, res: Response) {
    const validationResult = await moviePayload.safeParseAsync(req.body);
    if (validationResult.error)
      return res.status(400).json({ message: "not working" });
    const { name, description } = validationResult.data;
    const [result] = await db
      .insert(movies)
      .values({
        name,
        description,
      })
      .returning({ id: movies.id });
    return res.status(200).json({ id: result?.id });
  }
  public async getMovies(req: Request, res: Response) {
    const allMovies = await db.select().from(movies);
    return res.status(200).json(allMovies);
  }
  public async updateMovies(req: Request, res: Response) {
    const id = req.params.id as string;
    const validationResult = await updateMoviePayload.safeParseAsync(req.body);
    if (validationResult.error)
      return res.status(400).json({
        message: "Validation failed",
        error: validationResult.error.issues,
      });

    const { name, description } = validationResult.data;
    const updateData: any = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;

    const result = await db
      .update(movies)
      .set(updateData)
      .where(eq(movies.id, id))
      .returning({ id: movies.id });

    if (result.length === 0)
      return res.status(404).json({ message: "Movie not found" });

    return res
      .status(200)
      .json({ message: "Movie updated successfully", id: result[0].id });
  }
}
