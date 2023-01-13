"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kafka = void 0;
const kafkajs_1 = require("kafkajs");
const { KAFKA_USERNAME, KAFKA_PASSWORD, KAFKA_ADVERTISED_HOST_NAME } = process.env;
let c = (KAFKA_ADVERTISED_HOST_NAME && (KAFKA_ADVERTISED_HOST_NAME === null || KAFKA_ADVERTISED_HOST_NAME === void 0 ? void 0 : KAFKA_ADVERTISED_HOST_NAME.toString())) ||
    "null:9092";
console.log(c);
const kafka = new kafkajs_1.Kafka({
    clientId: "myproducer1",
    brokers: [
        (KAFKA_ADVERTISED_HOST_NAME && (KAFKA_ADVERTISED_HOST_NAME === null || KAFKA_ADVERTISED_HOST_NAME === void 0 ? void 0 : KAFKA_ADVERTISED_HOST_NAME.toString())) ||
            "localhost:9092",
    ],
});
exports.kafka = kafka;
