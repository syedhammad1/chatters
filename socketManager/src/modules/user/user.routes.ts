import express from "express";
import { create } from "./user.controller";

const router = express.Router();

router.post("/create", create);

export default router;
