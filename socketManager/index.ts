import express, { json } from "express";
import { kafka } from "./src/kafka";
import {
  saveSocketUserToDb,
  getSocketUserDetails,
} from "./src/modules/socketUser/socketUser.controller";
import mongoose from "mongoose";

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
const PORT: number = Number(process.env.PORT) || 3001;

(async () => {
  try {
    const consumer = kafka.consumer({
      groupId: "console-consumer",
    });
    await consumer.connect();
    await consumer.subscribe({
      topic: "websocketmanager",
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
