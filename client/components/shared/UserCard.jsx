import { DotsHorizontalIcon, PlusIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import Modal from './Modal';

const UserCard = (props) => {
  // klasser for ikoner
  const classes = `h-6 w-6 text-purple-1`;

  const [modalIsVisible, setModalIsVisible] = useState(false);

  // Funksjon for å toggle modal vindu 
  const toggleModal = () => setModalIsVisible((state) => !state);

  // Dummy content for modal vindu
  const content = (
    <div className='bg-white p-16 rounded-standard'>
      <h2 className='text-lg'>{props.user}</h2>
    </div>
  );

  return (
    <>   
      {modalIsVisible && <Modal onClick={toggleModal}>{content}</Modal>}
      <li className='bg-white flex items-center p-6 rounded-standard border border-purple-4'>
        <h2 className='font-bold'>{props.user}</h2>
        <button onClick={toggleModal} className='ml-auto'>
          {props.edit ? (
            <DotsHorizontalIcon className={classes} />
          ) : (
            <PlusIcon className={classes} />
          )}
        </button>
      </li>
    </>
  );
};
export default UserCard;
