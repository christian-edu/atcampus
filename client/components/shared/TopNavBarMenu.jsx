import { Link } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/solid';
import { ChevronRightIcon } from '@heroicons/react/solid';

const TopNavBarMenu = () => {
  return (
    <div className='grid grid-cols-1 bg-purple-1 w-screen text-white px-4'>
      <ul className='divide-y divide-purple-4'>
        
        <li className='flex flex-row justify-between py-4'>
          <Link to='/' className='flex flex-row'>
            <HomeIcon className='h-6 w-6 text-white mr-4'/>
            Forsiden
          </Link>
          <ChevronRightIcon className='h-6 w-6 text-white mr-4'/>
        </li>
        <li className='py-4'>Still spørsmål</li>
        <li className='py-4'>Topplisten</li>
        <li className='py-4'>Flashcard</li>
        <li className='py-4'>Dokumentering</li>
        <li className='py-4'>Min Profil</li>
        <li className='py-4'>Mine Spørsmål</li>
        <li className='py-4'>Mine svar</li>
      </ul>
    </div>
  );
};

export default TopNavBarMenu;
