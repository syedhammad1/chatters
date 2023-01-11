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
exports.getSocketUserDetails = exports.saveSocketUserToDb = void 0;
const socketUser_model_1 = __importDefault(require("./socketUser.model"));
const kafka_1 = require("../../kafka");
const producer = kafka_1.kafka.producer();
const saveSocketUserToDb = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    // if user already present update it or create a new one
    let socketUser = yield socketUser_model_1.default.findOneAndUpdate({ userId: userData.userId }, {
        socketId: userData.socketId,
        userId: userData.userId,
    }, { upsert: true });
});
exports.saveSocketUserToDb = saveSocketUserToDb;
const getSocketUserDetails = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let socketUser = yield socketUser_model_1.default.findOne({
        _id: userId,
    });
    console.log(socketUser, "socketUsersocketUsersocketUsersocketUsersocketUsersocketUsersocketUsersocketUser");
    yield producer.connect();
    yield producer.send({
        topic: "socketServer",
        messages: [
            {
                key: "returnSocketDetails",
                value: JSON.stringify((_a = socketUser === null || socketUser === void 0 ? void 0 : socketUser.socketId) === null || _a === void 0 ? void 0 : _a.toString()),
            },
        ],
    });
    yield producer.disconnect();
    // return socketUser;
});
exports.getSocketUserDetails = getSocketUserDetails;
