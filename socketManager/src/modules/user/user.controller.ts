import { Request, Response } from "express";
import mongoose from "mongoose";
import User from "./user.model";

const create = async (req: Request, res: Response) => {
  //check user
  let userExists = await User.findOne({ email: req.body.email });
  if (!userExists) {
    let user = await User.create(req.body);
  }
  res.json("Created Successfully");
};
export { create };
