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

const UserCard = ({ user, edit, search, match, userGroup }) => {
  // classes for icons
  const classes = `h-6 w-6 text-purple-1`;

  console.log(user);

  // state for modal window
  const [modalIsVisible, setModalIsVisible] = useState(false);

  // function to toggle modal window
  const toggleModal = () =>
    setModalIsVisible((modalIsVisible) => !modalIsVisible);

  return (
    <>
      <Modal show={modalIsVisible && edit} onClick={toggleModal}>
        <GroupUserSettings user={user} />
      </Modal>
      <Modal show={modalIsVisible && search} onClick={toggleModal}>
        <SearchRequest
          onClick={toggleModal}
          user={user}
          userGroup={userGroup}
        />
      </Modal>
      <Modal show={modalIsVisible && match} onClick={toggleModal}>
        <MatchRequest onClick={toggleModal} user={user} />
      </Modal>
      <div
        className={`bg-white flex items-center p-4 gap-4 rounded-standard border border-purple-4 ${
          edit || search || match ? 'cursor-pointer' : ''
        }`}
        onClick={toggleModal}
      >
        <Image className='h-10' />
        <h2 className='font-bold text-lg text-dark-1'>
          {user.username || user.user_name}
        </h2>
        <button className='ml-auto'>
          {edit && <DotsHorizontalIcon className={classes} />}
          {(search || match) && <PlusIcon className={classes} />}
        </button>
      </div>
    </>
  );
};
export default UserCard;
