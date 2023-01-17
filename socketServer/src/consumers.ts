import { client } from "./kafka";
import kafka from "kafka-node";
interface User {
  userId: string;
  iat?: string;
  exp?: string;
}
async function getReturnedSocketUserDetails(io: any, userMessage: string) {
  const consumer = new kafka.Consumer(client, [{ topic: "socketServer" }], {
    encoding: "utf8",
  });
  consumer.on("error", async function (msg) {
    console.log(msg);
  });
  consumer.on("message", async function (message: any) {
    message.value = JSON.parse(message.value);
    if (message?.key?.toString() === "returnSocketDetails") {
      io.to(message.value.socketId).emit("sendMessage", {
        message: userMessage,
      });
      return message.value.socketId;
    }
  });
}

export { getReturnedSocketUserDetails };
