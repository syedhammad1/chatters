import mongoose from "mongoose";

const socketUserSchema = new mongoose.Schema({
  socketId: String,
  userId: String,
});

const socketUserModel = mongoose.model("SocketUser", socketUserSchema);

export default socketUserModel;
