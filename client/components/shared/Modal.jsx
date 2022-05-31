import React from "react";
import ReactDom from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ onClick, children, show = false }) => {
  // Reusable modal component

  const content = (
    <AnimatePresence>
      {show && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed overflow-hidden z-10 w-screen h-screen top-0 left-0 bg-[rgba(0,0,0,0.8)]"
          onClick={onClick}
        ></motion.div>
      )}
      {show && (
        <motion.div
          key="modal-content"
          initial={{ opacity: 0, scale: 0, y: "-50%", x: "-50%" }}
          animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
          exit={{ opacity: 0, scale: 0, y: "-50%", x: "-50%" }}
          className="fixed h-auto top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] z-20"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return <>{ReactDom.createPortal(content, document.querySelector("body"))}</>;
};
export default Modal;
