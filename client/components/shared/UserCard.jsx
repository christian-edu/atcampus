import { DotsHorizontalIcon, PlusIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import MatchRequest from './MatchRequest';
import Modal from './Modal';
import SearchRequest from './SearchRequest';
SearchRequest;

const UserCard = (props) => {
  // classes for icons
  const classes = `h-6 w-6 text-purple-1`;

  // state for modal window
  const [modalIsVisible, setModalIsVisible] = useState(false);

  // function to toggle modal window
  const toggleModal = () =>
    setModalIsVisible((modalIsVisible) => !modalIsVisible);

  // Dummy content for edit modal window
  const content = (
    <div className='bg-white p-16 rounded-standard'>
      <h2 className='text-lg'>{props.user}</h2>
    </div>
  );

  return (
    <>
      {/* Render edit modal if props edit is set to true */}
      {modalIsVisible && props.edit && (
        <Modal onClick={toggleModal}>{content}</Modal>
      )}
      {/* Render search modal if props search is set to true */}
      {modalIsVisible && props.search && (
        <Modal onClick={toggleModal}>
          <SearchRequest onClick={toggleModal} user={props.user} />
        </Modal>
      )}
      {/* Render match modal if props search is set to true */}
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
          {/* Render dots icon if props edit is set to true, else render plus icons */}
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
