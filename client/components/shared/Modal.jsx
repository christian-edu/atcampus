import ReactDom from 'react-dom';

const Modal = (props) => {
  // Modal komponent

  const content = (
    <>
      <div
        className='fixed overflow-hidden z-10 w-screen h-screen top-0 left-0 bg-[rgba(0,0,0,0.8)]'
        onClick={props.onClick}
      ></div>
      <div className='fixed h-auto top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] z-20'>
        {props.children}
      </div>
    </>
  );

  return <>{ReactDom.createPortal(content, document.querySelector('body'))}</>;
};
export default Modal;
