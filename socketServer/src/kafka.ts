import kafka from "kafka-node";
const client = new kafka.KafkaClient({ kafkaHost: "kafkac:9092" });
export { client };
