import { XIcon, CheckIcon } from '@heroicons/react/solid';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserGroupsContext } from '../../store/UserGroupsContext';
import Image from './Image';
import Message from './Message';

const SearchRequest = ({ group, user, onClick, userGroup }) => {
  // Popup that shows when clicking on a user or group while searching for user or group by name
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const { fetchData } = useContext(UserGroupsContext);

  async function invite() {
    console.log('invited member');
    const res = await fetch('/api/v1/groups/member', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ userId: user.uuid, groupId: userGroup.uuid }),
    });

    setMessage(`${user.username} ble lagt til i gruppen din!`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Goes back to the group page
    // Close window in case you want to invite more members?
    fetchData();
    onClick();
  }

  return (
    <div className='flex flex-col items-center bg-white p-8 rounded text-center shadow-xl'>
      <Image group={group} user={user} className='h-20 mb-4 -mt-16' />

      <h2 className='text-dark-1 font-bold text-xl mb-3 w-full border-b-2 pb-4 border-purple-1'>
        {group?.name || user?.username || user?.user_name}
      </h2>
      <p className='mb-4'>
        {group
          ? 'Send forespørsel om medlemskap?'
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
          onClick={invite}
          className='bg-gradient-left text-white p-2 rounded hover:bg-purple-2'
        >
          <CheckIcon className='h-6 w-6' />
        </button>
      </div>
      <Message className='mt-4' show={message}>
        {message}
      </Message>
    </div>
  );
};
export default SearchRequest;
