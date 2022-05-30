import { useEffect, useRef, useState } from "react";
import { fetchJSON } from "../fetchJSON";
import { useLoader } from "../useLoader";
import Loading from "./shared/Loading";

export function ChatComponent({ groupId }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  // Gjør fetch-kall til api/v1/chat for å hente gamle meldinger.

  const url =
    window.location.origin.replace(/^http/, "ws") + `/chat?groupId=${groupId}`;
  const [ws, setWs] = useState(null);

  async function connectSocket() {
    let websocket = await new WebSocket(url);
    setWs(websocket);
    let wsClosed = false;
    window.onpopstate = () => {
      if (!wsClosed) {
        wsClosed = true;
        websocket.close();
        setWs(null);
        websocket = null;
      }
    };
    websocket.onopen = (event) => {
      console.info("Connected to web sockets");
    };

    websocket.onmessage = (event) => {
      try {
        const recievedMessage = JSON.parse(event.data);
        setMessages((oldState) => {
          const oldMessages = [...oldState];
          oldMessages.push(recievedMessage);
          return oldMessages;
        });
      } catch (e) {
        console.error(e);
      }
    };
    websocket.onclose = function (e) {
      if (!wsClosed) {
        console.log(
          "Socket is closed. Reconnect will be attempted in 1 second.",
          e
        );
        setTimeout(function () {
          connectSocket();
        }, 1000);
      }
    };

    websocket.onerror = function (err) {
      // TODO: Må legge inn en sjekk her for om man har blitt logget ut
      console.error("Socket encountered error: ", err, "Closing socket");
      websocket.close();
    };
  }
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(async () => {
    try {
      const data = await fetchJSON("/api/v1/chat?group_id=" + groupId);
      if (data !== null) setMessages(data);
      else setMessages([]);
    } catch (error) {
      return <div>Error loading messages: {error?.message}</div>;
    } finally {
      await connectSocket();
    }
  }, []);

  function handleSendMessage(event) {
    event.preventDefault();
    ws.send(JSON.stringify({ message }));
    setMessage("");
  }

  function parseMessages(messages) {
    const dateFormat = {
      month: "numeric",
      year: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const now = new Date().toLocaleDateString("nb-NO", dateFormat);
    return messages.map((message) => {
      const messageTime = new Date(message.timestamp).toLocaleDateString(
        "nb-NO",
        dateFormat
      );
      if (message.message) {
        return (
          <p key={messages.indexOf(message)} className={"chat-message"}>
            {`[${messageTime}] `} {message.userName}: {message.message}
          </p>
        );
      } else if (message.server) {
        return (
          <p key={messages.indexOf(message)} className={"server-message"}>
            {`[${now}] `} {message.server}
          </p>
        );
      }
    });
  }

  return (
    <div id="chat-container">
      <div id="chat-messages" className="w-full max-h-[20rem] overflow-scroll">
        {parseMessages(messages)}
        <div ref={messagesEndRef} />
      </div>
      <div id="chat-input" className={"flex w-full space-x-10"}>
        <label>
          New message:
          <input
            className={
              "flex w-full outline outline-1 outline-dark-3 rounded text-dark-3"
            }
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <button
          onClick={(e) => handleSendMessage(e)}
          className={
            "flex flex-row gap-1 p-2 outline outline-1 outline-dark-3 rounded text-dark-3 hover:bg-white"
          }
        >
          Send!
        </button>
      </div>
    </div>
  );
}
