import express from "express";
import { client } from "./src/kafka";
import mongoose from "mongoose";
import kafka from "kafka-node";
import userRoutes from "./src/modules/user/user.routes";
import cors from "cors";
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
    const consumer = new kafka.Consumer(
      client,
      [{ topic: "websocketusermanager" }],
      { encoding: "utf8" }
    );
    consumer.on("error", async function (msg) {
      console.log(msg);
    });
    consumer.on("message", async function (message: any) {
      try {
        message.value = JSON.parse(message.value);
      } catch (err) {
        message.value = message.value;
      }
      if (message?.value?.topic?.toString() === "userInfo") {
        saveSocketUserToDb(message.value);
      } else if (message?.key?.toString() === "getSocketDetails") {
        getSocketUserDetails(message.value);
      }
    });
  } catch (error: any) {
    console.log(error, "Error");
  }
})();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/users", userRoutes);
app.listen(PORT, function () {
  console.log("listening on *:", PORT);
});
