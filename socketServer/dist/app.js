"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const producers_1 = require("./producers");
const consumers_1 = require("./consumers");
var cors = require("cors");
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 4000;
app.use(cors({ origin: "*" }));
let http = require("http").Server(app);
let io = require("socket.io")(http);
io.use((socket, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // let data = await jwtVerify(socket.handshake.auth.token, jwtSecret);
        let data = { userId: new Date().getTime().toString(), iat: "0" };
        if (!data)
            return next(new Error("Authentication Error"));
        if (data.iat) {
            delete data.iat;
        }
        if (data.exp) {
            delete data.exp;
        }
        socket["user"] = data;
        next();
    }
    catch (error) {
        console.log("[*] Index.js Error", error.message);
        return next(new Error("Authentication Error"));
    }
    // } else {
    //   console.log("[*] Token not found.");
    //   return next(new Error("Authentication Error"));
    // }
}));
const onConnection = (socket) => __awaiter(void 0, void 0, void 0, function* () {
    (0, producers_1.addUser)(socket.id, socket.user);
    console.log("USER CONNECTED TO SERVER PORT", process.env.PORT, socket.id);
    socket.on("send_message", (payload) => {
        let { userId, message } = payload;
        console.log(payload);
        (0, producers_1.getUserSocketDetails)(userId);
        (0, consumers_1.getReturnedSocketUserDetails)();
    });
    socket.on("disconnect", () => { });
    socket.on("connect_error", (err) => {
        console.log(err.message);
    });
});
app.get("/", (req, res) => {
    res.send(`hello from ${PORT}`);
});
io.on("connection", onConnection);
http.listen(PORT, function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("listening on *:", PORT);
    });
});
