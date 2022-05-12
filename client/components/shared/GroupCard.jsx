import { PlusIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import Modal from './Modal';
import SearchRequest from './SearchRequest';
import MatchRequest from "./MatchRequest";

const GroupCard = (props) => {

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const { groupname, members } = props.group;

  const clickHandler = () => {
    if (props.onClick) return props.onClick();
    setModalIsVisible((state) => !state);
  };

  return (
    <>
      {(modalIsVisible && props.search) && <Modal onClick={clickHandler}><SearchRequest onClick={clickHandler} group={props.group} /></Modal>}
      {(modalIsVisible && props.match) && <Modal onClick={clickHandler}><MatchRequest onClick={clickHandler} group={props.group} /></Modal>}
      <div
        className='bg-white flex items-center p-6 rounded-standard border border-purple-4 cursor-pointer'
        onClick={clickHandler}
      >
        <div>
          <h2 className='font-bold'>{groupname}</h2>
          <p>Medlemmer: {members.length}</p>
        </div>
        {(props.search || props.match) && <PlusIcon className='h-6 text-purple-1 ml-auto' />}
      </div>
    </>
  );
};
export default GroupCard;
