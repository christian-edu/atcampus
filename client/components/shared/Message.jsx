import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/outline';

const MessageContainer = ({ children, className }) => {
  return (
    <div
      className={`border rounded-lg p-2 flex gap-2 items-center ${className}`}
    >
      {children}
    </div>
  );
};

const Message = ({ mode = 'success', children }) => {
  if (mode === 'success')
    return (
      <MessageContainer className='bg-green-100 border-green-700'>
        <CheckCircleIcon className='h-6 w-6 text-green-700' />
        <p>{children}</p>
      </MessageContainer>
    );
  if (mode === 'error')
    return (
      <MessageContainer className='bg-red-100 border-red-700'>
        <XCircleIcon className='h-6 w-6 text-red-700' />
        <p>{children}</p>
      </MessageContainer>
    );
};
export default Message;
