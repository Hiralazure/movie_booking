import { Request, Response } from "express";
import { signinPayload, signuPayloadModel } from "./models";
import { db } from "../../db";
import { usersTable } from "../../db/schema";
import { eq } from "drizzle-orm";
import { createHmac, randomBytes } from "node:crypto";
import { createUserToken } from "./utils/token";
export class AuthenticationController {
  public async handleSign(req: Request, res: Response) {
    const validationResult = await signuPayloadModel.safeParseAsync(req.body);
    if (validationResult.error)
      return res.status(400).send({
        message: "Unauthenticated",
        error: validationResult.error.issues,
      });
    const { firstName, lastName, email, password } = validationResult.data;
    const userEmailResult = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    if (userEmailResult.length > 0)
      return res.status(400).json({ message: "User already exist" });
    const salt = randomBytes(32).toString("hex");
    const hash = createHmac("sha256", salt).update(password).digest("hex");
    const [result] = await db
      .insert(usersTable)
      .values({
        firstName,
        lastName,
        email,
        password: hash,
        salt,
      })
      .returning({ id: usersTable.id });
    return res
      .status(200)
      .json({ message: "user has been created succesfully", id: result?.id });
  }
  public async handleSignin(req: Request, res: Response) {
    const validationResult = await signinPayload.safeParseAsync(req.body);
    if (validationResult.error)
      return res.status(400).json({ message: "authentication failed" });
    const { email, password } = validationResult.data;
    const [userSelect] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    if (!userSelect)
      return res
        .status(404)
        .json({ message: `user with email ${email} does not exists` });

    const salt = userSelect.salt!;
    const hash = createHmac("sha256", salt).update(password).digest("hex");
    if (userSelect.password !== hash)
      return res
        .status(400)
        .json({ message: "User email or pass word is incorrect" });
    const token = createUserToken({ id: userSelect.id });
    return res.status(200).json({ message: "sign successfully", token: token });
  }
  public async getUserDetails(req: Request, res: Response) {
    return res.json({ user: req.user });
  }
}
