import express from "express";
import type { Request, Response } from "express";
export function createApplication() {
  const app = express();
  app.use(express.json());
  app.get("/", (req: Request, res: Response) => {
    return res.json({ message: "all is well" });
  });
  return app;
}
