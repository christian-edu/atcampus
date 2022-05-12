import ReactDom from 'react-dom';
import { motion } from 'framer-motion';

const Modal = (props) => {
  // Modal komponent

  const content = (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed overflow-hidden z-10 w-screen h-screen top-0 left-0 bg-[rgba(0,0,0,0.8)]'
        onClick={props.onClick}
        key='modal-backdrop'
      ></motion.div>
      <motion.div
        initial={{ scale: 0, x: '-50%', y: '-50%' }}
        animate={{ scale: 1, x: '-50%', y: '-50%' }}
        exit={{ opacity: 0 }}
        className='fixed h-auto top-1/2 left-1/2 z-20'
        key='modal-overlay'
      >
        {props.children}
      </motion.div>
      </>
  );

  return <>{ReactDom.createPortal(content, document.querySelector('body'))}</>;
};
export default Modal;
