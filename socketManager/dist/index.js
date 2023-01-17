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
const mongoose_1 = __importDefault(require("mongoose"));
const kafka_node_1 = __importDefault(require("kafka-node"));
const user_routes_1 = __importDefault(require("./src/modules/user/user.routes"));
const cors_1 = __importDefault(require("cors"));
const socketUser_controller_1 = require("./src/modules/socketUser/socketUser.controller");
mongoose_1.default
    .connect("mongodb+srv://hammad:hammad@cluster0.iqsof.mongodb.net/?retryWrites=true&w=majority")
    .then((response) => {
    console.log("Connected!");
})
    .catch((err) => {
    console.log(err);
});
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 3009;
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const consumer = new kafka_node_1.default.Consumer(kafka_1.client, [{ topic: "websocketusermanager" }], { encoding: "utf8" });
        consumer.on("error", function (msg) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log(msg);
            });
        });
        consumer.on("message", function (message) {
            var _a, _b, _c;
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    message.value = JSON.parse(message.value);
                }
                catch (err) {
                    message.value = message.value;
                }
                if (((_b = (_a = message === null || message === void 0 ? void 0 : message.value) === null || _a === void 0 ? void 0 : _a.topic) === null || _b === void 0 ? void 0 : _b.toString()) === "userInfo") {
                    (0, socketUser_controller_1.saveSocketUserToDb)(message.value);
                }
                else if (((_c = message === null || message === void 0 ? void 0 : message.key) === null || _c === void 0 ? void 0 : _c.toString()) === "getSocketDetails") {
                    (0, socketUser_controller_1.getSocketUserDetails)(message.value);
                }
            });
        });
    }
    catch (error) {
        console.log(error, "Error");
    }
}))();
app.use((0, cors_1.default)({ origin: "*" }));
app.use(express_1.default.json());
app.use("/users", user_routes_1.default);
app.listen(PORT, function () {
    console.log("listening on *:", PORT);
});
