import { DotsHorizontalIcon, PlusIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import Image from './Image';
import MatchRequest from './MatchRequest';
import Modal from './Modal';
import SearchRequest from './SearchRequest';
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

  // Dummy content for edit modal window
  const content = (
    <div className='bg-white p-16 rounded-standard'>
      {/*<h2 className='text-lg'>{user.username}</h2>*/}
        <div>
            <button onClick={makeAdmin}>Gjør til admin</button>
        </div>
        <div>
            <button onClick={removeMember}>Fjern medlem</button>
        </div>
    </div>
  );

  return (
    <>
      {/* Render edit modal if props edit is set to true
      Here we want to only show this if the user is admin of the group*/}
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
