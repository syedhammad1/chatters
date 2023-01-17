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
});

const onConnection = async (socket: any) => {
  addUser(socket.id, socket.user);
  socket.on("send_message", async (payload: MessagePayload) => {
    let { userId, message } = payload;
    getUserSocketDetails(userId);
    getReturnedSocketUserDetails(io, message);
  });

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
