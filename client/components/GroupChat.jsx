import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchJSON } from '../fetchJSON';
import { useLoader } from '../useLoader';
import Breadcrumbs from './shared/Breadcrumbs';
import ChatMessage from './shared/ChatMessage';
import Image from './shared/Image';
import Loading from './shared/Loading';

export function GroupChat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const params = useParams();

  const {
    data: group,
    error,
    loading,
  } = useLoader(() => fetchJSON(`/api/v1/groups/?groupId=${params.id}`));

  // Gjør fetch-kall til api/v1/chat for å hente gamle meldinger.

  const url =
    window.location.origin.replace(/^http/, 'ws') +
    `/chat?groupId=${params.id}`;
  console.info(url);
  const [ws, setWs] = useState(null);

  async function connectSocket() {
    const msgFromServer = await fetchJSON('/api/v1/chat?group_id=' + params.id);
    setMessages(msgFromServer);
    console.info(msgFromServer);
    const websocket = await new WebSocket(url);
    setWs(websocket);

    websocket.onopen = (event) => {
      console.info('Connected to web sockets');
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
    websocket.onclose = function (e) {
      console.log(
        'Socket is closed. Reconnect will be attempted in 1 second.',
        e.reason
      );
      setTimeout(function () {
        connectSocket();
      }, 1000);
    };

    websocket.onerror = function (err) {
      console.error(
        'Socket encountered error: ',
        err.message,
        'Closing socket'
      );
      websocket.close();
    };
  }

  useEffect(() => connectSocket(), []);

  function handleSendMessage(event) {
    event.preventDefault();
    ws.send(JSON.stringify({ message }));
    setMessage('');
  }

  function parseMessages(messages) {
    return messages.map((message, i) => {
      if (message.message) return <ChatMessage message={message} key={i} />;
      if (message.server)
        return (
          <p key={i} className='py-2 text-purple-1'>
            {message.server}
          </p>
        );
    });
  }

  if (loading) return <Loading />;

  return (
    <>
      <Breadcrumbs />
      <div className='bg-white border-1 border-purple-1 rounded p-6'>
        <h2 className='font-bold text-xl mb-4'>Chat</h2>
        <div className='border-b-2 border-dark-5 py-4 mb-4'>
          {messages.length === 0 && 'Ingen meldinger'}
          {messages.length > 0 && (
            <div className='h-[300px] overflow-scroll flex flex-col gap-4'>
              {parseMessages(messages)}
            </div>
          )}
        </div>
        <form onSubmit={handleSendMessage}>
          <input
            className='w-full p-2 border border-purple-3 rounded-standard bg-dark-6 mt-2'
            type='text'
            value={message}
            placeholder='Skriv en melding'
            onChange={(e) => setMessage(e.target.value)}
          />
        </form>
      </div>
    </>
  );
}
