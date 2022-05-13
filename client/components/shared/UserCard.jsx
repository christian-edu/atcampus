import { DotsHorizontalIcon, PlusIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import MatchRequest from './MatchRequest';
import Modal from './Modal';
import SearchRequest from './SearchRequest';
SearchRequest;

const UserCard = (props) => {
  // klasser for ikoner
  const classes = `h-6 w-6 text-purple-1`;

  const [modalIsVisible, setModalIsVisible] = useState(false);

  // Funksjon for å toggle modal vindu
  const toggleModal = () =>
    setModalIsVisible((modalIsVisible) => !modalIsVisible);

  // Dummy content for modal vindu
  const content = (
    <div className='bg-white p-16 rounded-standard'>
      <h2 className='text-lg'>{props.user}</h2>
    </div>
  );

  return (
    <>
      {modalIsVisible && props.edit && (
        <Modal onClick={toggleModal}>{content}</Modal>
      )}
      {modalIsVisible && props.search && (
        <Modal onClick={toggleModal}>
          <SearchRequest onClick={toggleModal} user={props.user} />
        </Modal>
      )}
      {modalIsVisible && props.match && (
        <Modal onClick={toggleModal}>
          <MatchRequest onClick={toggleModal} user={props.user} />
        </Modal>
      )}
      <li
        className='bg-white flex items-center p-6 rounded-standard border border-purple-4 cursor-pointer'
        onClick={toggleModal}
      >
        <h2 className='font-bold'>{props.user}</h2>
        <button className='ml-auto'>
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
