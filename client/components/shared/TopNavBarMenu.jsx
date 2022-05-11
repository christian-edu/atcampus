import { Link } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/solid';
import { ChevronRightIcon } from '@heroicons/react/solid';
import {UserGroupIcon} from '@heroicons/react/solid'
import {DocumentTextIcon} from '@heroicons/react/solid'
import {QuestionMarkCircleIcon} from '@heroicons/react/solid'
import {ColorSwatchIcon} from '@heroicons/react/solid'

const TopNavBarMenu = () => {
  return (
    <div className='grid grid-cols-1 bg-gradient-left w-screen text-white px-4'>
      <ul className='divide-y divide-purple-4'>
        
        <Link to="/" className='flex flex-row justify-between my-1 py-3'>
          <li className='flex flex-row'>
            <HomeIcon className='h-6 w-6 text-white mr-4'/>
            Forsiden
          </li>
          <ChevronRightIcon className='h-6 w-6 text-white'/>
        </Link>
        <Link to="/" className='flex flex-row justify-between my-1 py-3'>
          <li className='flex flex-row'>
            <UserGroupIcon className='h-6 w-6 text-white mr-4'/>
            Grupper
          </li>
          <ChevronRightIcon className='h-6 w-6 text-white'/>
        </Link>
        <Link to="/" className='flex flex-row justify-between my-1 py-3'>
          <li className='flex flex-row'>
            <ColorSwatchIcon className='h-6 w-6 text-white mr-4'/>
            Flashcards
          </li>
          <ChevronRightIcon className='h-6 w-6 text-white'/>
        </Link>
        <Link to="/" className='flex flex-row justify-between my-1 py-3'>
          <li className='flex flex-row'>
            <DocumentTextIcon className='h-6 w-6 text-white mr-4'/>
            Dokumentdeling
          </li>
          <ChevronRightIcon className='h-6 w-6 text-white'/>
        </Link>
        <Link to="/" className='flex flex-row justify-between my-1 py-3'>
          <li className='flex flex-row'>
            <QuestionMarkCircleIcon className='h-6 w-6 text-white mr-4'/>
            Mine spørsmål
          </li>
          <ChevronRightIcon className='h-6 w-6 text-white'/>
        </Link>
        <Link to="/" className='flex flex-row justify-between my-1 py-3'>
          <li className='flex flex-row'>
            <HomeIcon className='h-6 w-6 text-white mr-4'/>
            Mine svar
          </li>
          <ChevronRightIcon className='h-6 w-6 text-white'/>
        </Link>
        
      </ul>
    </div>
  );
};

export default TopNavBarMenu;
