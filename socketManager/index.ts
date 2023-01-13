import express from "express";
import { kafka } from "./src/kafka";
const admin = kafka.admin();

const topic = "websocketusermanager";
const run = async () => {
  await admin.connect();
  await admin.createTopics({
    topics: [{ topic }],
    waitForLeaders: true,
  });
  await admin.createPartitions({
    topicPartitions: [{ topic: topic, count: 1 }],
  });
};
run().catch((e) =>
  kafka.logger().error(`[Kafka-config] ${e.message}`, { stack: e.stack })
);
import mongoose from "mongoose";
import {
  saveSocketUserToDb,
  getSocketUserDetails,
} from "./src/modules/socketUser/socketUser.controller";
mongoose
  .connect(
    "mongodb+srv://hammad:hammad@cluster0.iqsof.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((response) => {
    console.log("Connected!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const PORT: number = Number(process.env.PORT) || 3009;

(async () => {
  try {
    const consumer = kafka.consumer({
      groupId: "socketManagerConsumer",
    });
    await consumer.connect();
    await consumer.subscribe({
      topic: "websocketusermanager",
    });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        if (message.key?.toString() === "userInfo") {
          let userData = message.value
            ? JSON.parse(message.value.toString())
            : undefined;
          saveSocketUserToDb(userData);
        } else if (message.key?.toString() === "getSocketDetails") {
          getSocketUserDetails(message.value);
        }
      },
    });
  } catch (error: any) {
    console.log(error, "Error");
  }
})();

app.listen(PORT, function () {
  console.log("listening on *:", PORT);
});
