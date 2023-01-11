import express from "express";
import { saveSocketUserToDb } from "./socketUser.controller";

const router = express.Router();

router.get("/", saveSocketUserToDb);

export default router;
