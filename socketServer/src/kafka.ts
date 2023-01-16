import kafka from "kafka-node";
const { KAFKA_USERNAME, KAFKA_PASSWORD, KAFKA_ADVERTISED_HOST_NAME } =
  process.env;
// const kafka = new Kafka({
//   clientId: "socketServerProducer",
//   brokers: ["kafka:9092"],
// });

const client = new kafka.KafkaClient({ kafkaHost: "kafkac:9092" });
export { client };
