"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const kafka_node_1 = __importDefault(require("kafka-node"));
const { KAFKA_USERNAME, KAFKA_PASSWORD, KAFKA_ADVERTISED_HOST_NAME } = process.env;
// const kafka = new Kafka({
//   clientId: "socketServerProducer",
//   brokers: ["kafka:9092"],
// });
const client = new kafka_node_1.default.KafkaClient({ kafkaHost: "kafkac:9092" });
exports.client = client;
