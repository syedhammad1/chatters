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
  const payload = [{ topic: "websocketusermanager", messages: "Test message" }];
  // const producer = kafka.producer();
  // await producer.connect();
  // await payload.send({
  //   topic: "websocketusermanager",
  //   messages: [
  //     {
  //       key: "userInfo",
  //       value: JSON.stringify({ userId: user?.userId, socketId: socketId }),
  //     },
  //   ],
  // });
  // Create topics sync
  // producer.createTopics(
  //   ["websocketusermanager", "socketServer"],
  //   false,
  //   function (err, data) {
  //     console.log(data, "CREATED");
  //   }
  // );
  producer.on("ready", function () {
    console.log("READY");
    producer.send(payload, function (error, result) {
      console.log("Sending payload to Kafka");
      if (error) {
        console.log("Sending payload failed: ", error);
      } else {
        console.log("Sending payload result:", result);
      }
    });
  });
  producer.on("error", function (err) {
    console.log(err, "SHOWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW");
  });
  // await producer.disconnect();
}

async function getUserSocketDetails(userId: string) {
  // const producer = kafka.producer();
  // await producer.connect();
  // await producer.send({
  //   topic: "websocketusermanager",
  //   messages: [
  //     {
  //       key: "getSocketDetails",
  //       value: userId,
  //     },
  //   ],
  // });
  // await producer.disconnect();
}

export { addUser, getUserSocketDetails };
