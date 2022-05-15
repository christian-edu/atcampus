import { Link } from 'react-router-dom';
import TopNavBar from './TopNavBar';
import {
  HomeIcon,
  ColorSwatchIcon,
  QuestionMarkCircleIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ChevronRightIcon,
} from '@heroicons/react/solid';

const TopNavBarMenu = (props) => {
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
              <HomeIcon className='h-6 w-6 text-white mr-4' />
              Forsiden
            </li>
            <ChevronRightIcon className='h-6 w-6 text-white' />
          </Link>
          <Link
            to='/'
            className='flex flex-row justify-between my-1 py-3'
            onClick={props.onClick}
          >
            <li className='flex flex-row'>
              <UserGroupIcon className='h-6 w-6 text-white mr-4' />
              Grupper
            </li>
            <ChevronRightIcon className='h-6 w-6 text-white' />
          </Link>
          <Link
            to='/'
            className='flex flex-row justify-between my-1 py-3'
            onClick={props.onClick}
          >
            <li className='flex flex-row'>
              <ColorSwatchIcon className='h-6 w-6 text-white mr-4' />
              Flashcards
            </li>
            <ChevronRightIcon className='h-6 w-6 text-white' />
          </Link>
          <Link
            to='/'
            className='flex flex-row justify-between my-1 py-3'
            onClick={props.onClick}
          >
            <li className='flex flex-row'>
              <DocumentTextIcon className='h-6 w-6 text-white mr-4' />
              Dokumentdeling
            </li>
            <ChevronRightIcon className='h-6 w-6 text-white' />
          </Link>
          <Link
            to='/'
            className='flex flex-row justify-between my-1 py-3'
            onClick={props.onClick}
          >
            <li className='flex flex-row'>
              <QuestionMarkCircleIcon className='h-6 w-6 text-white mr-4' />
              Mine spørsmål
            </li>
            <ChevronRightIcon className='h-6 w-6 text-white' />
          </Link>
          <Link
            to='/'
            className='flex flex-row justify-between my-1 py-3'
            onClick={props.onClick}
          >
            <li className='flex flex-row'>
              <HomeIcon className='h-6 w-6 text-white mr-4' />
              Mine svar
            </li>
            <ChevronRightIcon className='h-6 w-6 text-white' />
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default TopNavBarMenu;
