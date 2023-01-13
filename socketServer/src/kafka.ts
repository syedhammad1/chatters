import { Kafka } from "kafkajs";
const { KAFKA_USERNAME, KAFKA_PASSWORD, KAFKA_ADVERTISED_HOST_NAME } =
  process.env;
let c =
  (KAFKA_ADVERTISED_HOST_NAME && KAFKA_ADVERTISED_HOST_NAME?.toString()) ||
  "null:9092";
console.log(c);
const kafka = new Kafka({
  clientId: "myproducer1",
  brokers: [
    (KAFKA_ADVERTISED_HOST_NAME && KAFKA_ADVERTISED_HOST_NAME?.toString()) ||
      "localhost:9092",
  ],
});
export { kafka };
