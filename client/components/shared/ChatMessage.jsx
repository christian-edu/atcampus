import Image from './Image';

const ChatMessage = ({ message }) => {
  const transformDate = (date) => {
    const messageDate = new Date(date);
    return new Intl.DateTimeFormat('no-NB', {
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit',
    }).format(messageDate);
  };

  return (
    <div className='pt-4 flex gap-4'>
      <div className='h-12 w-12 flex-shrink-0'>
        <Image />
      </div>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-2'>
          <h3 className='font-bold'>{message.userName}</h3>
          <p className='text-dark-3 text-xs'>
            {transformDate(message.timestamp)}
          </p>
        </div>
        <p className='bg-dark-6 rounded-xl p-2 '>{message.message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
