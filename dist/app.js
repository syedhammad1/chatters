"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 3000;
let http = require("http").Server(app);
// set up socket.io and bind it to our
// http server.
let io = require("socket.io")(http);
const onConnection = (socket) => {
    console.log("User CONNECTED ON SERVER", PORT);
    // addUser(socket.id, socket.user, socket.user.role)
    socket.on("disconnect", () => {
        // removeUser(socket.id);
    });
    socket.on("connect_error", (err) => {
        console.log(err.message);
    });
};
app.get("/", (req, res) => {
    res.send(`hello from ${PORT}`);
});
// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
io.on("connection", onConnection);
http.listen(PORT, function () {
    console.log("listening on *:", PORT);
});
