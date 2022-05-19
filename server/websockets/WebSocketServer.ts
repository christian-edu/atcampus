import WebSocketServer from "ws";
import { Server } from "http";
import * as queryString from "querystring";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { Socket } from "net";
const sockets = new Map<string, Map<string, Socket>>();
dotenv.config();

export default (expressServer: Server) => {
  const wss = new WebSocketServer.Server({ noServer: true, path: "/chat" });
  //https://cheatcode.co/tutorials/how-to-set-up-a-websocket-server-with-node-js-and-express
  //https://github.com/websockets/ws/blob/master/doc/ws.md#class-websocket
  expressServer.on("upgrade", (request, socket, head) => {
    // Authentication goes here!
    const cookie = request.headers.cookie;
    if (!cookie) {
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      socket.destroy();
      return;
    }

    const sessionCookie = cookie
      ?.split("; ")
      ?.find((c: string) => c.startsWith("jwt"))
      ?.split("=")[1];

    const signedCookie = cookieParser.signedCookie(
      decodeURIComponent(sessionCookie!),
      process.env.COOKIE_SECRET as string
    );

    // TODO: Get user from DB
    // Check group membership
    // If member from URL query params checks out, push socket to map Map<GroupID, Map<UserId, Socket>> should do the trick?

    wss.handleUpgrade(request, socket, head, (websocket) => {
      wss.emit("connection", websocket, request);
    });
  });

  wss.on(
    "connection",
    function connection(websocketConnection, connectionRequest) {
      const requestURL = new URL(connectionRequest.url!);
      const queryParams = new URLSearchParams(requestURL.searchParams);

      const groupId = queryParams.get("groupId");

      websocketConnection.on("message", (message) => {
        const parsedMessage = JSON.parse(message.toString());
        console.log(parsedMessage);
      });
    }
  );
  return wss;
};
