"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kafka = void 0;
const kafkajs_1 = require("kafkajs");
const { KAFKA_USERNAME: username, KAFKA_PASSWORD: password } = process.env;
const sasl = username && password ? { username, password, mechanism: "plain" } : null;
const ssl = !!sasl;
const kafka = new kafkajs_1.Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"],
});
exports.kafka = kafka;
