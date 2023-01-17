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
const kafka_node_1 = __importDefault(require("kafka-node"));
const saveSocketUserToDb = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    // if user already present update it or create a new one
    let socketUser = yield socketUser_model_1.default.findOneAndUpdate({ userId: userData.user.userId }, {
        socketId: userData.socketId,
        userId: userData.user.userId,
    }, { upsert: true });
});
exports.saveSocketUserToDb = saveSocketUserToDb;
const getSocketUserDetails = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    let socketUser = yield socketUser_model_1.default.findOne({
        _id: userId,
    });
    const client = new kafka_node_1.default.KafkaClient({ kafkaHost: "kafkac:9092" });
    const producer = new kafka_node_1.default.Producer(client);
    let KeyedMessage = kafka_node_1.default.KeyedMessage;
    let km = new KeyedMessage("returnSocketDetails", JSON.stringify(socketUser));
    const payload = [
        {
            topic: "socketServer",
            messages: [km],
        },
    ];
    producer.on("ready", function () {
        producer.send(payload, function (error, result) {
            if (error) {
                console.log("Sending payload failed: ", error);
            }
            else {
                console.log("Sending payload result:", result);
            }
        });
    });
    producer.on("error", function (err) {
        console.log(err);
    });
});
exports.getSocketUserDetails = getSocketUserDetails;
