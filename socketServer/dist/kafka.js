"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const kafka_node_1 = __importDefault(require("kafka-node"));
const client = new kafka_node_1.default.KafkaClient({ kafkaHost: "kafkac:9092" });
exports.client = client;
