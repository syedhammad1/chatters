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
const express_1 = __importDefault(require("express"));
const kafka_1 = require("./src/kafka");
const socketUser_controller_1 = require("./src/modules/socketUser/socketUser.controller");
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default
    .connect("mongodb+srv://hammad:hammad@cluster0.iqsof.mongodb.net/?retryWrites=true&w=majority")
    .then((response) => {
    console.log("Connected!");
})
    .catch((err) => {
    console.log(err);
});
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 3001;
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const consumer = kafka_1.kafka.consumer({
            groupId: "console-consumer",
        });
        yield consumer.connect();
        yield consumer.subscribe({
            topic: "websocketmanager",
        });
        yield consumer.run({
            eachMessage: ({ topic, partition, message }) => __awaiter(void 0, void 0, void 0, function* () {
                var _a, _b;
                if (((_a = message.key) === null || _a === void 0 ? void 0 : _a.toString()) === "userInfo") {
                    let userData = message.value
                        ? JSON.parse(message.value.toString())
                        : undefined;
                    (0, socketUser_controller_1.saveSocketUserToDb)(userData);
                }
                else if (((_b = message.key) === null || _b === void 0 ? void 0 : _b.toString()) === "getSocketDetails") {
                    (0, socketUser_controller_1.getSocketUserDetails)(message.value);
                }
            }),
        });
    }
    catch (error) {
        console.log(error, "Error");
    }
}))();
app.listen(PORT, function () {
    console.log("listening on *:", PORT);
});
