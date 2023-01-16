// import { Kafka } from "kafkajs";
// const { KAFKA_USERNAME: username, KAFKA_PASSWORD: password } = process.env;
// const sasl =
//   username && password ? { username, password, mechanism: "plain" } : null;
// const ssl = !!sasl;

// const kafka = new Kafka({
//   clientId: "mock-up-kafka-consumer-client",
//   brokers: ["localhost:9092"],
// });
// export { kafka };
const kafka = require("kafka-node");

const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
console.log(client, "client");
export { client };
