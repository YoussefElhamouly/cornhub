import { Server } from "socket.io";

let io = null;
export default function initSocket(server) {
  io = new Server(server, { transports: ["polling", "websocket"] });

  io.on("connection", () => {});
}

export function socketClient() {
  if (io) return io;
  console.error("socket bro ");
  throw new Error({ message: "Socket wasnt init", status: 500 });
}
