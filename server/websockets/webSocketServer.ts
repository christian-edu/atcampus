import WebSocketServer from "ws";
import { Server } from "http";
import dotenv from "dotenv";
import ChatService from "../service/chatService";
import { ChatMessageEntity } from "../entity/ChatMessageEntity";
import cookieParser from "cookie-parser";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserService from "../service/userService";
import { Duplex } from "stream";
import Logger from "../util/logger";
import GroupService from "../service/groupService";
import HttpException from "../util/errorUtils";
dotenv.config();

const sockets = new Map<string, Map<string, WebSocket>>();
function getUserIdfromCookie(cookie: string) {
  const sessionCookie = cookie
    ?.split("; ")
    ?.find((c: string) => c.startsWith("auth_token"))
    ?.split("=")[1];

  const signedCookie: any = cookieParser.signedCookie(
    decodeURIComponent(sessionCookie!),
    process.env.COOKIE_SECRET as string
  );
  const verifiedToken = jwt.verify(signedCookie, process.env.JWT_KEY as string);
  return (verifiedToken as JwtPayload)?.userId;
}
function _writeUnauthorized(socket: Duplex) {
  socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
  socket.destroy();
}
export default (
  expressServer: Server,
  chatService: ChatService,
  userService: UserService
) => {
  const wss = new WebSocketServer.Server({ noServer: true, path: "/chat" });
  //https://cheatcode.co/tutorials/how-to-set-up-a-websocket-server-with-node-js-and-express
  //https://github.com/websockets/ws/blob/master/doc/ws.md#class-websocket
  expressServer.on("upgrade", async (request, socket, head) => {
    const cookie = request.headers.cookie;

    if (!cookie) {
      Logger.debug("upgrade", "no cookie");
      _writeUnauthorized(socket);
      return;
    }

    const userId = getUserIdfromCookie(cookie);
    const requestURL = new URL("http://dummyhost" + request.url!);
    const queryParams = new URLSearchParams(requestURL.searchParams);
    const groupId = queryParams.get("groupId");
    if (!userId || !groupId) {
      _writeUnauthorized(socket);
      return;
    }
    const userGroups = await userService.fetchGroupsByUserId(userId);
    const hasAcces = userGroups.filter((g) => g.uuid === groupId);
    if (hasAcces.length === 0) {
      _writeUnauthorized(socket);
    }

    wss.handleUpgrade(request, socket, head, (websocket) => {
      wss.emit("connection", websocket, request);
    });
  });

  wss.on(
    "connection",
    async function connection(websocketConnection, connectionRequest) {
      const requestURL = new URL("http://dummyhost" + connectionRequest.url!);
      const queryParams = new URLSearchParams(requestURL.searchParams);
      const groupId = queryParams.get("groupId");
      const userId = getUserIdfromCookie(connectionRequest.headers.cookie!);

      if (!groupId) throw Error("No groupId!");
      if (!sockets.has(groupId)) {
        sockets.set(groupId, new Map().set(userId, websocketConnection));
      } else {
        // Something really fd up going on with the type checking here... So any it is
        sockets.get(groupId)!.set(userId, websocketConnection as any);
        sendMessageToGroup(
          JSON.stringify({ message: `user with id: ${userId} has connected` })
        );
      }

      function sendMessageToGroup(message: string) {
        const groupSockets = sockets.get(groupId!);
        if (groupSockets) {
          for (const user of groupSockets.values()) {
            user.send(message);
          }
        }
      }

      websocketConnection.on("message", async (message) => {
        // save message to db
        try {
          const recievedData = JSON.parse(message.toString());
          const res = await chatService.addMessage(
            recievedData.message,
            userId,
            groupId
          );
          const data = {
            message: recievedData.message,
            userId: userId,
            username: res.user.userName,
          };
          sendMessageToGroup(JSON.stringify(data));
        } catch (e) {
          Logger.error("websocket_server", (e as HttpException).message);
          websocketConnection.send(
            JSON.stringify({ error: "could not send message" })
          );
        }
      });

      websocketConnection.on("close", function () {
        sockets.get(groupId)?.delete(userId);
      });
    }
  );
  return wss;
};
