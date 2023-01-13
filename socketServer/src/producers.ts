import { kafka } from "./kafka";

interface User {
  userId: string;
  iat?: string;
  exp?: string;
}
async function addUser(socketId: string, user: User) {
  const producer = kafka.producer();
  await producer.connect();
  await producer.send({
    topic: "websocketusermanager",
    messages: [
      {
        key: "userInfo",
        value: JSON.stringify({ userId: user?.userId, socketId: socketId }),
      },
    ],
  });
  await producer.disconnect();
}

async function getUserSocketDetails(userId: string) {
  const producer = kafka.producer();
  await producer.connect();
  await producer.send({
    topic: "websocketusermanager",
    messages: [
      {
        key: "getSocketDetails",
        value: userId,
      },
    ],
  });
  await producer.disconnect();
}

export { addUser, getUserSocketDetails };
