import { Request, Response, NextFunction } from "express";
import { verifyUserToken } from "../utils/token";
import { db } from "../../../db";
import { usersTable } from "../../../db/schema";
import { eq } from "drizzle-orm";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}
export async function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const publicRoutes = ["/auth/signin", "/auth/signup"];

  if (publicRoutes.includes(req.path)) {
    return next();
  }

  const header = req.headers["authorization"];
  if (!header) next();
  if (!header?.startsWith("Bearer")) {
    return res
      .status(400)
      .json({ error: "authentication header must start with bearer" });
  }
  const token = header.split(" ")[1];
  if (!token)
    return res.status(400).json({
      error: "authentication header must start with bearer and token",
    });
  const user = verifyUserToken(token);
  const userSelect = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, user.id));
  if (userSelect.length === 0)
    return res.status(400).json({
      error: "authentication header must start with bearer and token",
    });
  req.user = user;
  next();
}
