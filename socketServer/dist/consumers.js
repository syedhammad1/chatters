"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReturnedSocketUserDetails = void 0;
const kafka_1 = require("./kafka");
const kafka_node_1 = __importDefault(require("kafka-node"));
function getReturnedSocketUserDetails(io, userMessage) {
    return __awaiter(this, void 0, void 0, function* () {
        const consumer = new kafka_node_1.default.Consumer(kafka_1.client, [{ topic: "socketServer" }], {
            encoding: "utf8",
        });
        consumer.on("error", function (msg) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log(msg);
            });
        });
        consumer.on("message", function (message) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                message.value = JSON.parse(message.value);
                if (((_a = message === null || message === void 0 ? void 0 : message.key) === null || _a === void 0 ? void 0 : _a.toString()) === "returnSocketDetails") {
                    io.to(message.value.socketId).emit("sendMessage", {
                        message: userMessage,
                    });
                    return message.value.socketId;
                }
            });
        });
    });
}
exports.getReturnedSocketUserDetails = getReturnedSocketUserDetails;
