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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReturnedSocketUserDetails = void 0;
function getReturnedSocketUserDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        // try {
        //   const consumer = kafka.consumer({
        //     groupId: "socket-consumer",
        //   });
        //   await consumer.connect();
        //   await consumer.subscribe({
        //     topic: "socketServer",
        //   });
        //   await consumer.run({
        //     eachMessage: async ({ topic, partition, message }) => {
        //       if (message.key?.toString() === "returnSocketDetails") {
        //         console.log(
        //           "SOCKET USER ID RETURN FROM WEB SOCKET MANAGER",
        //           message?.value?.toString()
        //         );
        //       }
        //     },
        //   });
        // } catch (error: any) {
        //   console.log(error, "Error");
        // }
    });
}
exports.getReturnedSocketUserDetails = getReturnedSocketUserDetails;
