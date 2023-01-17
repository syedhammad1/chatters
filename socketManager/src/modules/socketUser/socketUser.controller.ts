import { Request, Response } from "express";
import mongoose from "mongoose";
import SocketUserModel from "./socketUser.model";
import { client } from "../../kafka";
import kafka from "kafka-node";
const saveSocketUserToDb = async (userData?: any) => {
  // if user already present update it or create a new one
  let socketUser = await SocketUserModel.findOneAndUpdate(
    { userId: userData.user.userId },
    {
      socketId: userData.socketId,
      userId: userData.user.userId,
    },
    { upsert: true }
  );
};

const getSocketUserDetails = async (userId: any) => {
  let socketUser = await SocketUserModel.findOne({
    _id: userId,
  });
  const client = new kafka.KafkaClient({ kafkaHost: "kafkac:9092" });
  const producer = new kafka.Producer(client);

  let KeyedMessage = kafka.KeyedMessage;
  let km = new KeyedMessage("returnSocketDetails", JSON.stringify(socketUser));
  const payload = [
    {
      topic: "socketServer",
      messages: [km],
    },
  ];
  producer.on("ready", function () {
    producer.send(payload, function (error, result) {
      if (error) {
        console.log("Sending payload failed: ", error);
      } else {
        console.log("Sending payload result:", result);
      }
    });
  });
  producer.on("error", function (err) {
    console.log(err);
  });
};
export { saveSocketUserToDb, getSocketUserDetails };
