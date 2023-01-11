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
exports.getReturnedSocketUserDetails = void 0;
const kafka_1 = require("./kafka");
const producer = kafka_1.kafka.producer();
function getReturnedSocketUserDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const consumer = kafka_1.kafka.consumer({
                groupId: "socket-consumer",
            });
            yield consumer.connect();
            yield consumer.subscribe({
                topic: "socketServer",
            });
            yield consumer.run({
                eachMessage: ({ topic, partition, message }) => __awaiter(this, void 0, void 0, function* () {
                    var _a, _b;
                    if (((_a = message.key) === null || _a === void 0 ? void 0 : _a.toString()) === "returnSocketDetails") {
                        console.log("SOCKET USER ID RETURN FROM WEB SOCKET MANAGER", (_b = message === null || message === void 0 ? void 0 : message.value) === null || _b === void 0 ? void 0 : _b.toString());
                    }
                }),
            });
        }
        catch (error) {
            console.log(error, "Error");
        }
    });
}
exports.getReturnedSocketUserDetails = getReturnedSocketUserDetails;
