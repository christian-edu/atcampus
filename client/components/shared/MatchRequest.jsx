import { XIcon, CheckIcon } from '@heroicons/react/solid';
import Image from './Image';
import React from 'react';
import { UserInfoContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { groupCriterias } from '../../services/criterias';

const MatchRequest = ({ group, user, onClick }) => {
  // Popup som vises når man søker etter gruppe basert på kriterer

  const { criteria } = group || user;

  const userInfo = React.useContext(UserInfoContext);
  const navigate = useNavigate();

  const criterias = groupCriterias(criteria);

  async function joinGroup() {
    const res = await fetch('/api/v1/groups/member', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        userId: userInfo.uuid,
        groupId: group.uuid,
      }),
    });
    navigate('/');
  }

  return (
    <div className='flex flex-col items-center bg-white text-dark-1 p-8 rounded-standard text-center shadow-xl'>
      <Image group className='h-20 mb-4 -mt-16' />
      <h2 className='font-bold text-xl w-full border-b-2 pb-4 border-purple-1'>
        {group?.name || user}
      </h2>
      <ul className='flex flex-col gap-3 mt-6 mb-4'>
        {Object.entries(criterias).map((criteria) => (
          <li
            key={criteria[0]}
            className='text-sm px-2 outline outline-1 outline-purple-1 outline-offset-1 rounded'
          >
            <span className='font-bold'>{criteria[0]}: </span>
            {criteria[1]}
          </li>
        ))}
      </ul>

      <p className='mb-4 text-sm font-bold'>
        {group
          ? 'Send forespørsel om medlemskap'
          : 'Ønsker du å invitere til gruppen?'}
      </p>
      <div className='flex flex-row gap-6'>
        <button
          className='bg-dark-2 text-white p-2 rounded hover:bg-dark-3'
          onClick={onClick}
        >
          <XIcon className='h-6 w-6' />
        </button>
        <button
          className='bg-gradient-left text-white p-2 rounded hover:bg-purple-2'
          onClick={joinGroup}
        >
          <CheckIcon className='h-6 w-6' />
        </button>
      </div>
    </div>
  );
};
export default MatchRequest;
