"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socketUser_controller_1 = require("./socketUser.controller");
const router = express_1.default.Router();
router.get("/", socketUser_controller_1.saveSocketUserToDb);
exports.default = router;
