import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';
import Modal from './Modal';
import {
  UserGroupIcon,
  UserIcon,
  QuestionMarkCircleIcon,
  CalendarIcon
} from '@heroicons/react/solid';

const BottomNavBar = () => {
  const [showProfile, setShowProfile] = useState(false);

  const toggleProfileMenu = () => setShowProfile((showProfile) => !showProfile);

  return (
    <div>
      {showProfile && (
        <Modal onClick={toggleProfileMenu}>
          <ProfileMenu onClick={toggleProfileMenu} />
        </Modal>
      )}
      <div className='flex justify-between px-6 pt-4 pb-6 sm:justify-center sm:gap-20 fixed inset-x-0 bottom-0 bg-purple-5 outline outline-1 outline-dark-5 text-sm font-semibold text-dark-1 lg:hidden'>
        <div>
          <Link to={'/questions'} className='flex flex-col items-center'>
            <QuestionMarkCircleIcon className='h-6 w-6 text-purple-1' />
            <h4>Spørsmål</h4>
          </Link>
        </div>
        <div className='flex flex-col items-center'>
          <CalendarIcon className='h-6 w-6 text-purple-1' />
          <h4>Kalender</h4>
        </div>
        <div>
          <Link to={'/'} className='flex flex-col items-center'>
            <UserGroupIcon className='h-6 w-6 text-purple-1' />
            <h4>Grupper</h4>
          </Link>
        </div>
        <div className='flex flex-col items-center'>
          <UserIcon className='h-6 w-6 text-purple-1' />
          <button onClick={toggleProfileMenu}>Profil</button>
        </div>
      </div>
    </div>
  );
};

export default BottomNavBar;
