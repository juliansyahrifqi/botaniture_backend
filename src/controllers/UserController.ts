import { Request, Response } from "express";
import { myDataSource } from "../app-data-source";
import { User } from "../entities/User";

export const getUsers = async(_req: Request, res: Response) => {
  const users = await myDataSource.getRepository(User).find();

  res.send(users);
}