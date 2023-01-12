import { kafka } from "./kafka";
const producer = kafka.producer();

interface User {
  userId: string;
  iat?: string;
  exp?: string;
}
async function getReturnedSocketUserDetails() {
  try {
    const consumer = kafka.consumer({
      groupId: "socket-consumer",
    });
    await consumer.connect();
    await consumer.subscribe({
      topic: "socketServer",
    });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        if (message.key?.toString() === "returnSocketDetails") {
          console.log(
            "SOCKET USER ID RETURN FROM WEB SOCKET MANAGER",
            message?.value?.toString()
          );
        }
      },
    });
  } catch (error: any) {
    console.log(error, "Error");
  }
}

export { getReturnedSocketUserDetails };
