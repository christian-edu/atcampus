import WebSocketServer from "ws";
import { Server } from "http";
import * as queryString from "querystring";

export default (expressServer: Server) => {
  const wss = new WebSocketServer.Server({ noServer: true, path: "/chat" });
  //https://cheatcode.co/tutorials/how-to-set-up-a-websocket-server-with-node-js-and-express
  //https://github.com/websockets/ws/blob/master/doc/ws.md#class-websocket
  expressServer.on("upgrade", (request, socket, head) => {
    // Authentication goes here!
    wss.handleUpgrade(request, socket, head, (websocket) => {
      wss.emit("connection", websocket, request);
    });
  });

  wss.on(
    "connection",
    function connection(websocketConnection, connectionRequest) {
      websocketConnection.on("message", (message) => {
        const parsedMessage = JSON.parse(message.toString());
        console.log(parsedMessage);
      });
    }
  );
  return wss;
};
