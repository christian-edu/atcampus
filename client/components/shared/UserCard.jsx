import { DotsHorizontalIcon, PlusIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import Modal from './Modal';

const UserCard = ({ user, edit = false }) => {
  // klasser for ikoner
  const classes = `h-6 w-6 text-purple-1`;

  const [modalIsVisible, setModalIsVisible] = useState(false);

  // Funksjon for å toggle modal vindu
  const toggleModal = () => setModalIsVisible((modalIsVisible) => !modalIsVisible);

  // Dummy content for modal vindu
  const content = (
    <div className='bg-white p-16 rounded-standard'>
      <h2 className='text-dark-1 text-lg'>{user}</h2>
    </div>
  );

  return (
    <>
      {modalIsVisible && <Modal onClick={toggleModal}>{content}</Modal>}
      <li
        className='bg-white flex items-center p-6 rounded-standard border border-purple-4 cursor-pointer'
        onClick={toggleModal}
      >
        <h2 className='font-bold'>{user}</h2>
        <button className='ml-auto'>
          {edit ? (
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
