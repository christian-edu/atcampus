import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchJSON } from '../fetchJSON';
import Breadcrumbs from './shared/Breadcrumbs';
import ChatMessage from './shared/ChatMessage';
import { motion } from 'framer-motion';
import Loading from './shared/Loading';

export function GroupChat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const bottomOfChat = useRef(null);

  // Gjør fetch-kall til api/v1/chat for å hente gamle meldinger.

  const params = useParams();

  const url =
    window.location.origin.replace(/^http/, 'ws') +
    `/chat?groupId=${params.id}`;
  const [ws, setWs] = useState(null);

  async function connectSocket() {
    const websocket = await new WebSocket(url);
    setWs(websocket);

    websocket.onopen = (event) => {
      console.info('Connected to web sockets');
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
      console.log(
        'Socket is closed. Reconnect will be attempted in 1 second.',
        e
      );
      setTimeout(function () {
        connectSocket();
      }, 1000);
    };

    websocket.onerror = function (err) {
      // TODO: Må legge inn en sjekk her for om man har blitt logget ut
      console.error('Socket encountered error: ', err, 'Closing socket');
      websocket.close();
    };
  }

  useEffect(async () => {
    try {
      setLoading(true);
      const data = await fetchJSON('/api/v1/chat?group_id=' + params.id);
      if (data !== null) setMessages(data);
      else setMessages([]);
    } catch (error) {
      return <div>Error loading messages: {error?.message}</div>;
    } finally {
      await connectSocket();
      setLoading(false);
    }
  }, []);

  function handleSendMessage(event) {
    event.preventDefault();
    ws.send(JSON.stringify({ message }));
    setMessage('');
  }

  function parseMessages(messages) {
    return messages.map((message, i) => {
      if (message.message) {
        return <ChatMessage key={i} message={message} />;
      } else if (message.server) {
        return (
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            key={i}
            className='text-purple-1'
          >
            {message.server}
          </motion.p>
        );
      }
    });
  }

  useEffect(() => {
    if (!loading && messages.length > 0) {
      bottomOfChat.current.scrollIntoView({
        block: 'nearest',
        inline: 'start',
      });
      console.log(':)');
    }
  }, [messages, loading]);

  return (
    <>
      <Breadcrumbs />
      <div className='bg-white border-1 border-purple-1 rounded p-6'>
        <h2 className='font-bold text-xl mb-4'>Chat</h2>
        <div className='border-b-2 relative shadow-sm py-4 mb-4'>
          {loading && <Loading className='bg-white h-full w-full' />}
          {messages.length === 0 && 'Ingen meldinger'}
          {messages.length > 0 && (
            <div className='h-[24rem] overflow-scroll flex flex-col gap-4'>
              {parseMessages(messages)}
              <div ref={bottomOfChat} className='h-1'></div>
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
