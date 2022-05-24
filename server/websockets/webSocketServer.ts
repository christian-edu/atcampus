import WebSocketServer from "ws";
import { Server } from "http";
import dotenv from "dotenv";
import ChatService from "../service/chatService";
import { ChatMessageEntity } from "../entity/ChatMessageEntity";

const sockets = new Map<string, Map<string, WebSocket>>();
dotenv.config();

export default (expressServer: Server, chatService: ChatService) => {
  const wss = new WebSocketServer.Server({ noServer: true, path: "/chat" });
  //https://cheatcode.co/tutorials/how-to-set-up-a-websocket-server-with-node-js-and-express
  //https://github.com/websockets/ws/blob/master/doc/ws.md#class-websocket
  expressServer.on("upgrade", (request, socket, head) => {
    // Authentication goes here!
    console.info("On upgrade");
    // const cookie = request.headers.cookie;
    // if (!cookie) {
    //   socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
    //   socket.destroy();
    //   return;
    // }
    //
    // const sessionCookie = cookie
    //   ?.split("; ")
    //   ?.find((c: string) => c.startsWith("auth_token"))
    //   ?.split("=")[1];
    //
    // const signedCookie = cookieParser.signedCookie(
    //   decodeURIComponent(sessionCookie!),
    //   process.env.COOKIE_SECRET as string
    // );

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
      const requestURL = new URL("http://dummyhost" + connectionRequest.url!);
      const queryParams = new URLSearchParams(requestURL.searchParams);

      const groupId = queryParams.get("groupId");
      console.info(`Requested group: ${groupId}`);
      let id = 0;
      if (!groupId) throw Error("No groupId!");
      if (!sockets.has(groupId)) {
        sockets.set(groupId, new Map().set(++id, websocketConnection));
      } else {
        // Something really fd up going on with the type checking here... So any it is
        sockets
          .get(groupId)!
          .set((++id).toString(), websocketConnection as any);
        console.info("Added user");
        websocketConnection.send("Added user");
      }

      websocketConnection.on("message", (message) => {
        try {
          const groupSockets = sockets.get(groupId);

          if (groupSockets) {
            for (const user of groupSockets.values()) {
              user.send(message.toString());
            }
          }
          try {
            // chatService.addMessage(new ChatMessageEntity(message));
          } catch (e) {
            console.error(e);
          }
        } catch (e) {
          console.error(e);
        }
      });
    }
  );
  return wss;
};
