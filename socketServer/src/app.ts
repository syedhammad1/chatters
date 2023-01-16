import express from "express";
import { addUser, getUserSocketDetails } from "./producers";
import { getReturnedSocketUserDetails } from "./consumers";
import { client } from "./kafka";
import kafka from "kafka-node";
var cors = require("cors");
const app = express();
const PORT: number = Number(process.env.PORT) || 4000;
app.use(cors({ origin: "*" }));
let http = require("http").Server(app);

let io = require("socket.io")(http);

interface User {
  userId: string;
  iat?: string;
  exp?: string;
}
interface MessagePayload {
  userId: string;
  message: string;
}
io.use(async (socket: any, next: any) => {
  try {
    // const created = await kafka.admin().createTopics({
    //   topics: [{ topic: "macarena", numPartitions: 1, replicationFactor: 1 }],
    // });
    // console.log(created, "CREATEDDDDDDDDDDdd");
    // let data = await jwtVerify(socket.handshake.auth.token, jwtSecret);
    let data: User = { userId: new Date().getTime().toString(), iat: "0" };
    if (!data) return next(new Error("Authentication Error"));
    if (data.iat) {
      delete data.iat;
    }
    if (data.exp) {
      delete data.exp;
    }
    socket["user"] = data;
    next();
  } catch (error: any) {
    console.log("[*] Index.js Error", error.message);
    return next(new Error("Authentication Error"));
  }
  // } else {
  //   console.log("[*] Token not found.");
  //   return next(new Error("Authentication Error"));
  // }
});
// const consumer = new kafka.Consumer(
//   client,
//   [{ topic: "websocketusermanager" }],
//   {
//     groupId: "1",
//   }
// );
// consumer.on("error", async function (msg) {
//   console.log(msg);
// });
// consumer.on("message", async function (message) {
//   console.log(message, "THOS MESSAGE RECEIVED");
// });
const onConnection = async (socket: any) => {
  addUser(socket.id, socket.user);
  // console.log("USER CONNECTED TO SERVER PORT", process.env.PORT, socket.id);
  // socket.on("send_message", (payload: MessagePayload) => {
  //   let { userId, message } = payload;
  //   console.log(payload);
  //   getUserSocketDetails(userId);
  //   getReturnedSocketUserDetails();
  // });

  socket.on("disconnect", () => {});

  socket.on("connect_error", (err: any) => {
    console.log(err.message);
  });
};

app.get("/", (req: any, res: any) => {
  res.send(`hello from ${PORT}`);
});

io.on("connection", onConnection);

http.listen(PORT, async function () {
  console.log("listening on *:", PORT);
});
