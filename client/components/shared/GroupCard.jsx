import { PlusIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import Modal from './Modal';
import SearchRequest from './SearchRequest';
import MatchRequest from './MatchRequest';
import { UserGroupIcon } from '@heroicons/react/solid';

const GroupCard = (props) => {
  // Komponent for gruppekort

  const [modalIsVisible, setModalIsVisible] = useState(false);

  // Mottar en gruppe som props // <GroupCard group={group} />
  const { groupname, members } = props.group;

  // Toggle modal vinduer
  const clickHandler = () => {
    if (props.onClick) return props.onClick();
    setModalIsVisible((state) => !state);
  };

  return (
    <>
      {modalIsVisible && props.search && (
        <Modal onClick={clickHandler}>
          <SearchRequest onClick={clickHandler} group={props.group} />
        </Modal>
      )}
      {modalIsVisible && props.match && (
        <Modal onClick={clickHandler}>
          <MatchRequest onClick={clickHandler} group={props.group} />
        </Modal>
      )}
      <div
        className='bg-white flex items-center p-6 rounded-standard border border-purple-4 cursor-pointer'
        onClick={clickHandler}
      >
        <div>
          <h3 className='text-dark-1 text-lg font-bold'>{groupname}</h3>
          <div className='flex flex-row items-center text-dark-3 mt-2'>
            <UserGroupIcon className='h-5 w-5 mr-2' />
            <p className='text-md'>Medlemmer: {members.length}</p>
          </div>
        </div>
        {/* Rendrer et pluss ikon hvis search eller match props er satt til true <GroupCard match={true} /> */}
        {(props.search || props.match) && (
          <PlusIcon className='h-6 text-purple-1 ml-auto' />
        )}
      </div>
    </>
  );
};
export default GroupCard;
