import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';
import {UserGroupIcon} from '@heroicons/react/solid'
import {UserIcon} from '@heroicons/react/solid'
import {DocumentTextIcon} from '@heroicons/react/solid'
import {CalendarIcon} from '@heroicons/react/solid'

const BottomNavBar = () => {
  const [showProfile, setShowProfile] = useState(false);

  function showProfileFn() {
    if (showProfile) {
      setShowProfile(false);
    } else {
      setShowProfile(true);
    }
  }

  return (
    <div>
      {showProfile ? (
        <ProfileMenu showProfileFn={showProfileFn} />
      ) : (
        <div className='flex justify-between px-6 pt-4 pb-6 sm:justify-center sm:gap-20 fixed inset-x-0 bottom-0 bg-dark-6 text-sm font-semibold text-dark-1 lg:hidden'>
          <div>
            <Link to={'/questions'} className="flex flex-col items-center">
              <DocumentTextIcon className="h-6 w-6 text-purple-1"/>
              <h4>Spørsmål</h4>
            </Link>
          </div>
          <div className="flex flex-col items-center">
            <CalendarIcon className="h-6 w-6 text-purple-1"/>
            <h4>Kalender</h4>
          </div>
          <div>
            <Link to={'/'} className="flex flex-col items-center">
              <UserGroupIcon className="h-6 w-6 text-purple-1"/>
              <h4>Grupper</h4>
            </Link>
          </div>
          <div className="flex flex-col items-center">
            <UserIcon className="h-6 w-6 text-purple-1"/>
            <button onClick={showProfileFn}>Profil</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomNavBar;
