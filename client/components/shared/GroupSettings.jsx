import { Link } from 'react-router-dom';
import {
  ChevronRightIcon,
  UserAddIcon,
  PencilAltIcon,
  KeyIcon,
  ClipboardListIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import { LogoutIcon } from '@heroicons/react/outline';

const GroupSettings = (props) => {
  // Popup for group settings

  return (
    <div>
      <div className='flex justify-end'>
        <button
        onClick={props.onClick}
        className='text-white px-4 py-2 mb-3 mr-3 outline outline-white text-center bg-purple-1 rounded-full hover:bg-purple-2'>
          X
        </button>
      </div>
      
      <div className='grid grid-cols-1 bg-gradient-left w-screen text-white max-w-2xl mx-auto rounded-standard'>
        <ul className='divide-y divide-purple-4'>
          <Link
            to='/group/members/searchUser'
            className='flex flex-row justify-between my-1 py-3 hover:bg-purple-2 px-4'
            onClick={props.onClick}
          >
            <li className='flex flex-row'>
              <UserAddIcon className='h-6 w-6 text-white mr-4' />
              Inviter medlemmer
            </li>
            <ChevronRightIcon className='h-6 w-6 text-white' />
          </Link>
          <Link
            to='/group/editProfile'
            className='flex flex-row justify-between my-1 py-3 hover:bg-purple-2 px-4'
            onClick={props.onClick}
          >
            <li className='flex flex-row'>
              <PencilAltIcon className='h-6 w-6 text-white mr-4' />
              Endre gruppeprofil
            </li>
            <ChevronRightIcon className='h-6 w-6 text-white' />
          </Link>
          <Link
            to='/group/editRoles'
            className='flex flex-row justify-between my-1 py-3 hover:bg-purple-2 px-4'
            onClick={props.onClick}
          >
            <li className='flex flex-row'>
              <KeyIcon className='h-6 w-6 text-white mr-4' />
              Endre roller
            </li>
            <ChevronRightIcon className='h-6 w-6 text-white' />
          </Link>
          <Link
            to='/group/groupCriteria'
            className='flex flex-row justify-between my-1 py-3 hover:bg-purple-2 px-4'
            onClick={props.onClick}
          >
            <li className='flex flex-row'>
              <ClipboardListIcon className='h-6 w-6 text-white mr-4' />
              Gruppekriterier
            </li>
            <ChevronRightIcon className='h-6 w-6 text-white' />
          </Link>
          <Link
            to='/'
            className='flex flex-row justify-between my-1 py-3 hover:bg-purple-2 px-4'
            onClick={props.onClick}
          >
            <li className='flex flex-row'>
              <TrashIcon className='h-6 w-6 text-white mr-4' />
              Slett gruppe
            </li>
            <ChevronRightIcon className='h-6 w-6 text-white' />
          </Link>
          <Link
            to='/'
            className='flex flex-row justify-between my-1 py-3 hover:bg-purple-2 px-4'
            onClick={props.onClick}
          >
            <li className='flex flex-row'>
              <LogoutIcon className='h-6 w-6 text-white mr-4' />
              Forlat gruppe
            </li>
            <ChevronRightIcon className='h-6 w-6 text-white' />
          </Link>
        </ul>
      </div>
    </div>
  );
};
export default GroupSettings;
