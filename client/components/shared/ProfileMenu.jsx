import { Link } from 'react-router-dom';
import {
  ChevronRightIcon,
  UserIcon,
  CogIcon,
  BellIcon,
 } from '@heroicons/react/solid';
import {LogoutIcon } from '@heroicons/react/outline';

const ProfileMenu = (props) => {
  return (
    <div>
      <button onClick={props.onClick} className='text-white'>
        X
      </button>

      <div className='grid grid-cols-1 bg-gradient-left w-screen text-white px-4'>
        <ul className='divide-y divide-purple-4'>
          <Link
            to='/'
            className='flex flex-row justify-between my-1 py-3'
            onClick={props.onClick}
          >
            <li className='flex flex-row'>
              <UserIcon className='h-6 w-6 text-white mr-4' />
              Endre profil
            </li>
            <ChevronRightIcon className='h-6 w-6 text-white' />
          </Link>
          <Link
            to='/'
            className='flex flex-row justify-between my-1 py-3'
            onClick={props.onClick}
          >
            <li className='flex flex-row'>
              <CogIcon className='h-6 w-6 text-white mr-4' />
              Instillinger
            </li>
            <ChevronRightIcon className='h-6 w-6 text-white' />
          </Link>
          <Link
            to='/'
            className='flex flex-row justify-between my-1 py-3'
            onClick={props.onClick}
          >
            <li className='flex flex-row'>
              <BellIcon className='h-6 w-6 text-white mr-4' />
              Notifikasjoner
            </li>
            <ChevronRightIcon className='h-6 w-6 text-white' />
          </Link>
          <Link
            to='/'
            className='flex flex-row justify-between my-1 py-3'
            onClick={props.onClick}
          >
            <li className='flex flex-row'>
              <LogoutIcon className='h-6 w-6 text-white mr-4' />
              Logg ut
            </li>
            <ChevronRightIcon className='h-6 w-6 text-white' />
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default ProfileMenu;
