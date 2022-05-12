import { PlusIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import Modal from './Modal';
import GroupRequest from './GroupRequest';

const GroupCard = (props) => {

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const { groupname, members } = props.group;

  const clickHandler = () => {
    if (props.onClick) return props.onClick();
    setModalIsVisible((state) => !state);
  };

  return (
    <>
      {modalIsVisible && <Modal onClick={clickHandler}><GroupRequest onClick={clickHandler} group={props.group} /></Modal>}
      <div
        className='bg-white flex items-center p-6 rounded-standard border border-purple-4 cursor-pointer'
        onClick={clickHandler}
      >
        <div>
          <h2 className='font-bold'>{groupname}</h2>
          <p>Medlemmer: {members.length}</p>
        </div>
        {props.add && <PlusIcon className='h-6 text-purple-1 ml-auto' />}
      </div>
    </>
  );
};
export default GroupCard;
