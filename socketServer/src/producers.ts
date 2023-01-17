import { client } from "./kafka";
import kafka from "kafka-node";
interface User {
  userId: string;
  iat?: string;
  exp?: string;
}
async function addUser(socketId: string, user: User) {
  const client = new kafka.KafkaClient({ kafkaHost: "kafkac:9092" });
  const producer = new kafka.Producer(client);
  let KeyedMessage = kafka.KeyedMessage;
  let message = { topic: "userInfo", socketId, user };
  let km = new KeyedMessage("userInfo", JSON.stringify(message));
  const payload = [
    {
      topic: "websocketusermanager",
      messages: [km],
    },
  ];
  producer.on("ready", function () {
    producer.send(payload, function (error, result) {
      if (error) {
        console.log("Sending payload failed: ", error);
      } else {
        console.log("Sending payload result:", result);
      }
    });
  });
  producer.on("error", function (err) {
    console.log(err);
  });
}

async function getUserSocketDetails(userId: string) {
  const client = new kafka.KafkaClient({ kafkaHost: "kafkac:9092" });
  const producer = new kafka.Producer(client);
  let KeyedMessage = kafka.KeyedMessage;
  let km = new KeyedMessage("getSocketDetails", userId);
  const payload = [
    {
      topic: "websocketusermanager",
      messages: [km],
    },
  ];
  producer.on("ready", function () {
    producer.send(payload, function (error, result) {
      if (error) {
        console.log("Sending payload failed: ", error);
      } else {
        console.log("Sending payload result:", result);
      }
    });
  });
  producer.on("error", function (err) {
    console.log(err);
  });
}

export { addUser, getUserSocketDetails };
