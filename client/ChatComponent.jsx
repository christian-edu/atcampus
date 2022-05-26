import { useEffect, useState } from "react";

export function ChatComponent({ groupId }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  // Gjør fetch-kall til api/v1/chat for å hente gamle meldinger.

  const url =
    window.location.origin.replace(/^http/, "ws") + `/chat?groupId=${groupId}`;
  console.info(url);
  const [ws, setWs] = useState(null);
  useEffect(async () => {
    const websocket = await new WebSocket(url);

    setWs(websocket);

    websocket.onopen = (event) => {
      console.info("Connected to web sockets");
    };

    websocket.onmessage = (event) => {
      try {
        const recievedMessage = JSON.parse(event.data);
        console.log(recievedMessage);
        setMessages((oldState) => {
          const oldMessages = [...oldState];
          oldMessages.push(recievedMessage);
          return oldMessages;
        });
      } catch (e) {
        console.error(e);
      }
    };
  }, []);

  function handleSendMessage(event) {
    event.preventDefault();
    console.info(message);
    ws.send(JSON.stringify({ message }));
  }

  function parseMessages(messages) {
    return messages.map((message) => (
      <p key={messages.indexOf(message)}>{message.message}</p>
    ));
  }

  return (
    <div id="chat-container">
      <div id="chat-messages">{parseMessages(messages)}</div>
      <div id="chat-input">
        <label>
          New message:{" "}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <button onClick={(e) => handleSendMessage(e)}>Send!</button>
      </div>
    </div>
  );
}
