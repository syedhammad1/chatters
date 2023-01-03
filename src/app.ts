import express from "express";
import { Kafka } from "kafkajs";

const app = express();
const PORT: number = Number(process.env.PORT) || 3000;

let http = require("http").Server(app);

let io = require("socket.io")(http);

const onConnection = (socket: any) => {
  console.log("User CONNECTED ON SERVER", PORT);

  socket.on("disconnect", () => {});

  socket.on("connect_error", (err: any) => {
    console.log(err.message);
  });
};

app.get("/", (req: any, res: any) => {
  res.send(`hello from ${PORT}`);
});

io.on("connection", onConnection);

http.listen(PORT, function () {
  console.log("listening on *:", PORT);
});
