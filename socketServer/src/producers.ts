import { kafka } from "./kafka";
const producer = kafka.producer();

interface User {
  userId: string;
  iat?: string;
  exp?: string;
}
async function addUser(socketId: string, user: User) {
  await producer.connect();
  await producer.send({
    topic: "websocketmanager",
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
  await producer.connect();
  await producer.send({
    topic: "websocketmanager",
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
