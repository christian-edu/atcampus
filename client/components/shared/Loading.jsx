import { motion, AnimatePresence } from 'framer-motion';

const Loading = ({ show = false }) => {
  return (
    <>
      {show && (
        <AnimatePresence>
          <motion.div
            key='loading'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className='bg-purple-1 h-screen w-screen absolute top-0 left-0'
          >
            Loading...
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};
export default Loading;
