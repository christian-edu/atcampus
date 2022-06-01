import Image from './Image';
import { motion } from 'framer-motion';

const calcDaysPassed = (date1, date2) =>
  Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

const transformDate = (date) => {
  const messageDate = new Date(date);
  const today = new Date();

  if (calcDaysPassed(today, messageDate) === 0)
    return (
      `I dag ` +
      new Intl.DateTimeFormat('no-NB', {
        // weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
      }).format(messageDate)
    );

  if (calcDaysPassed(today, messageDate) === 1)
    return (
      `I går ` +
      new Intl.DateTimeFormat('no-NB', {
        // weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
      }).format(messageDate)
    );

  if (calcDaysPassed(today, messageDate) > 1)
    return new Intl.DateTimeFormat('no-NB', {
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit',
    }).format(messageDate);

  if (calcDaysPassed(today, messageDate) >= 7)
    return new Intl.DateTimeFormat('no-NB', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(messageDate);
};

const ChatMessage = ({ message }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className='pt-4 flex gap-4'
    >
      <div className='h-8 w-8 flex-shrink-0'>
        <Image />
      </div>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-2'>
          <h3 className='font-bold text-dark-2'>{message.userName}</h3>
          <p className='text-dark-3 text-xs'>
            {transformDate(message.timestamp)}
          </p>
        </div>
        <p className='bg-dark-6 rounded-xl p-2 self-start'>{message.message}</p>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
