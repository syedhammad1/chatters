import { Request, Response } from "express";
import mongoose from "mongoose";
import User from "./user.model";

const addUser = async (req: Request, res: Response) => {
  let user = await User.create({});
};
export { addUser };
