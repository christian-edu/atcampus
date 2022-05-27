import {
  DotsHorizontalIcon,
  PlusIcon,
  KeyIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import { useState } from 'react';
import Image from './Image';
import MatchRequest from './MatchRequest';
import Modal from './Modal';
import SearchRequest from './SearchRequest';
import GroupUserSettings from './GroupUserSettings';
//import Button from './Button';

SearchRequest;

const UserCard = ({ user, edit, search, match }) => {
  // classes for icons
  const classes = `h-6 w-6 text-purple-1`;

  // state for modal window
  const [modalIsVisible, setModalIsVisible] = useState(false);

  // function to toggle modal window
  const toggleModal = () =>
    setModalIsVisible((modalIsVisible) => !modalIsVisible);

  return (
    <>
      {/* Render edit modal if props edit is set to true
      Here we want to only show this if the user is admin of the group*/}
      {modalIsVisible && edit && (
        <Modal onClick={toggleModal}>
          <GroupUserSettings user={user} />
        </Modal>
      )}
      {/* Render search modal if props search is set to true */}
      {modalIsVisible && search && (
        <Modal onClick={toggleModal}>
          <SearchRequest onClick={toggleModal} user={user} />
        </Modal>
      )}
      {/* Render match modal if props search is set to true */}
      {modalIsVisible && match && (
        <Modal onClick={toggleModal}>
          <MatchRequest onClick={toggleModal} user={user} />
        </Modal>
      )}
      <li
        className='bg-white flex items-center p-4 gap-4 rounded-standard border border-purple-4 cursor-pointer'
        onClick={toggleModal}
      >
        <Image className='h-10' />
        <h2 className='font-bold text-lg text-dark-1'>{user.username}</h2>
        <button className='ml-auto'>
          {/* Render dots icon if props edit is set to true, else render plus icons */}
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
