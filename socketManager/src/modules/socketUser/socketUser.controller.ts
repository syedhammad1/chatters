import { Request, Response } from "express";
import mongoose from "mongoose";
import SocketUserModel from "./socketUser.model";
import { kafka } from "../../kafka";
const producer = kafka.producer();
const saveSocketUserToDb = async (userData?: any) => {
  // if user already present update it or create a new one
  let socketUser = await SocketUserModel.findOneAndUpdate(
    { userId: userData.userId },
    {
      socketId: userData.socketId,
      userId: userData.userId,
    },
    { upsert: true }
  );
};

const getSocketUserDetails = async (userId: any) => {
  let socketUser = await SocketUserModel.findOne({
    _id: userId,
  });
  console.log(
    socketUser,
    "socketUsersocketUsersocketUsersocketUsersocketUsersocketUsersocketUsersocketUser"
  );
  await producer.connect();
  await producer.send({
    topic: "socketServer",
    messages: [
      {
        key: "returnSocketDetails",
        value: JSON.stringify(socketUser?.socketId?.toString()),
      },
    ],
  });
  await producer.disconnect();
  // return socketUser;
};
export { saveSocketUserToDb, getSocketUserDetails };
