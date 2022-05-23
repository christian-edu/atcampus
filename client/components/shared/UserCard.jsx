import {
  DotsHorizontalIcon,
  PlusIcon,
  KeyIcon,
  TrashIcon
} from '@heroicons/react/solid';
import { useState } from 'react';
import Image from './Image';
import MatchRequest from './MatchRequest';
import Modal from './Modal';
import SearchRequest from './SearchRequest';
import GroupUserSettings from './GroupUserSettings';
import Button from './Button';

SearchRequest;

const UserCard = (props) => {
  // classes for icons
  const classes = `h-6 w-6 text-purple-1`;

  const { user } = props.user;

  // state for modal window
  const [modalIsVisible, setModalIsVisible] = useState(false);

  
  function removeMember(){
      console.log(user.username + " removed")
      // Send a request to delete the user
  }

  function makeAdmin(){
      console.log(user)
      console.log("Admin roles given to " + user.username)
      //Send a request to make the user admin
  }
  

  // function to toggle modal window
  const toggleModal = () =>
    setModalIsVisible((modalIsVisible) => !modalIsVisible);

  // dummy content for profile settings
  const content = (
    <div className='flex flex-col items-center bg-white text-dark-1 p-8 rounded text-center shadow-xl'>
      <Image group className='h-20 mb-4 -mt-16' />
      <h2 className='font-bold text-lg w-full border-b-2 pb-4 border-purple-1 mb-5'>
        {user.username}
      </h2>
      <div className='flex flex-col gap-3'>
          <Button onClick={makeAdmin} className="flex items-center gap-3"><KeyIcon className='h-5 w-5'/>Gjør til admin</Button>
          <Button onClick={removeMember} className={'flex items-center gap-3 bg-red-500 hover:bg-red-400'}><TrashIcon className='h-5 w-5'/>Slett medlem</Button>
      </div>  
    </div>
  );

  return (
    <>
      {/* Render edit modal if props edit is set to true
      Here we want to only show this if the user is admin of the group*/}
      {modalIsVisible && props.edit && (
        <Modal onClick={toggleModal}>
          {content}
        </Modal>

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
        className='bg-white flex items-center p-4 gap-4 rounded-standard border border-purple-4'
        
      >
        <Image className='h-10' />
        <h2 className='font-bold text-lg text-dark-1'>{user.username}</h2>
        <button className='ml-auto' onClick={toggleModal}>
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
