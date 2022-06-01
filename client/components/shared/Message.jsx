import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/outline';
import { motion, AnimatePresence } from 'framer-motion';

const MessageContainer = ({ children, className, show = true }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key='message'
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className={`border rounded-lg p-2 flex gap-2 items-center ${className}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Message = ({ mode = 'success', children, show = true, className }) => {
  if (mode === 'success')
    return (
      <MessageContainer
        show={show}
        className={`bg-green-100 border-green-700 ${className}`}
      >
        <CheckCircleIcon className='h-6 w-6 text-green-700' />
        <p>{children}</p>
      </MessageContainer>
    );
  if (mode === 'error')
    return (
      <MessageContainer
        show={show}
        className={`bg-red-100 border-red-700 ${className}`}
      >
        <XCircleIcon className='h-6 w-6 text-red-700' />
        <p>{children}</p>
      </MessageContainer>
    );
};
export default Message;
