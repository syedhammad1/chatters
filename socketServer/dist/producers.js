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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserSocketDetails = exports.addUser = void 0;
const kafka_1 = require("./kafka");
function addUser(socketId, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const producer = kafka_1.kafka.producer();
        yield producer.connect();
        yield producer.send({
            topic: "websocketusermanager",
            messages: [
                {
                    key: "userInfo",
                    value: JSON.stringify({ userId: user === null || user === void 0 ? void 0 : user.userId, socketId: socketId }),
                },
            ],
        });
        yield producer.disconnect();
    });
}
exports.addUser = addUser;
function getUserSocketDetails(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const producer = kafka_1.kafka.producer();
        yield producer.connect();
        yield producer.send({
            topic: "websocketusermanager",
            messages: [
                {
                    key: "getSocketDetails",
                    value: userId,
                },
            ],
        });
        yield producer.disconnect();
    });
}
exports.getUserSocketDetails = getUserSocketDetails;
