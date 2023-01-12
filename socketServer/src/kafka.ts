import { Kafka } from "kafkajs";
const { KAFKA_USERNAME: username, KAFKA_PASSWORD: password } = process.env;
const sasl =
  username && password ? { username, password, mechanism: "plain" } : null;
const ssl = !!sasl;

const kafka = new Kafka({
  clientId: "my-producer",
  brokers: ["localhost:9092"],
});
export { kafka };
