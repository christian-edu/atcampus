import { Link, useLocation, useNavigate } from 'react-router-dom';
import Modal from './shared/Modal';
import GroupSettings from './shared/GroupSettings';
import { useState } from 'react';
import {
  MenuAlt1Icon,
  UserGroupIcon,
  ChatIcon,
  CalendarIcon,
  CogIcon,
} from '@heroicons/react/solid';
import Image from './shared/Image';

const GroupPage = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const group = location.state.group;

  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => setShowSettings((showSettings) => !showSettings);

  console.log(group);

  const visible = group.isPrivate ? 'Privat' : 'Offtentlig';

  return (
    <div className='bg-white p-6 max-w-xl mx-auto rounded-standard'>
      <div className='flex flex-row gap-4'>
        <Image className='h-16' group />
        <div>
          <h2 className='text-dark-1 text-xl font-bold'>{group.name}</h2>
          <h4 className='font-bold text-dark-3 mb-8'>({visible})</h4>
        </div>
        {showSettings && (
          <Modal onClick={toggleSettings}>
            <GroupSettings onClick={toggleSettings} group={group} />
          </Modal>
        )}
        <CogIcon
          onClick={toggleSettings}
          className='text-dark-1 h-6 w-6 cursor-pointer ml-auto'
        />
      </div>
      <ul className='grid gap-4 text-md text-dark-1'>
        <li className='border-b-2 border-purple-1 hover:bg-dark-6'>
          <Link to='/' className='flex gap-2 items-center text-lg py-4'>
            <ChatIcon className='h-6 text-purple-1' />
            Chat
          </Link>
        </li>
        <li className='border-b-2 border-purple-1 hover:bg-dark-6'>
          <Link to='/' className='flex gap-2 items-center text-lg py-4'>
            <CalendarIcon className='h-6 text-purple-1' />
            Møtekalender
          </Link>
        </li>
        <li className='border-b-2 border-purple-1 hover:bg-dark-6'>
          <Link to='/' className='flex gap-2 items-center text-lg py-4'>
            <MenuAlt1Icon className='h-6 text-purple-1' />
            Notater
          </Link>
        </li>
        <li
          className='border-b-2 border-purple-1 hover:bg-dark-6 cursor-pointer'
          onClick={() => navigate('/group/members', { state: { group } })}
        >
          <span to='/' className='flex gap-2 items-center text-lg py-4'>
            <UserGroupIcon className='h-6 text-purple-1' />
            Medlemmer
          </span>
        </li>
      </ul>
    </div>
  );
};

export default GroupPage;
