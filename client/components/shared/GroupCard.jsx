import { PlusIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import Modal from './Modal';
import SearchRequest from './SearchRequest';
import MatchRequest from './MatchRequest';
import { UserGroupIcon, LockClosedIcon } from '@heroicons/react/solid';
import { LockOpenIcon } from '@heroicons/react/outline';
import Image from './Image';

const GroupCard = (props) => {
  // Group Card component

  // classes for private icon
  const privateIconClasses = 'h-4 absolute top-4 right-4';

  // State for modals
  const [modalIsVisible, setModalIsVisible] = useState(false);

  // Recieves group as props // <GroupCard group={group} />
  const { name, groupMember, isPrivate } = props.group;

  // Render cloesed icon if group is private, render open icon is group is not private
  const privateIcon = isPrivate ? (
    <LockClosedIcon className={privateIconClasses} />
  ) : (
    <LockOpenIcon className={privateIconClasses} />
  );

  // Toggle modal window
  const clickHandler = () => {
    // If component recives onClick as a prop it will return props.onClick and not render modal windows
    if (props.onClick) return props.onClick();
    setModalIsVisible((state) => !state);
  };

  return (
    <>
      {/* render search modal window if search is set to true */}
      {modalIsVisible && props.search && (
        <Modal onClick={clickHandler}>
          <SearchRequest onClick={clickHandler} group={props.group} />
        </Modal>
      )}
      {/* render match modal window if match is set to true */}
      {modalIsVisible && props.match && (
        <Modal onClick={clickHandler}>
          <MatchRequest onClick={clickHandler} group={props.group} />
        </Modal>
      )}

      <div
        className='bg-white flex items-center gap-2 relative p-6 rounded-standard border border-purple-4 cursor-pointer'
        onClick={clickHandler}
      >
        <Image group className='h-14 w-14' />
        <div>
          <h3 className='text-dark-1 text-lg font-bold mb-1'>{name}</h3>
          <div className='flex flex-row items-center text-dark-3'>
            <UserGroupIcon className='h-5 w-5 mr-2' />

            <p className='text-md'>Medlemmer: {groupMember.length}</p>
          </div>
        </div>
        {/* Render plus icon if search or match is true */}
        {(props.search || props.match) && (
          <PlusIcon className='h-6 text-purple-1 ml-auto' />
        )}

        {!(props.search || props.search) && privateIcon}
      </div>
    </>
  );
};
export default GroupCard;
