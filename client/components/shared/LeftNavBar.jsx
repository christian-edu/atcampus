import {
  ChevronLeftIcon,
  HomeIcon,
  ColorSwatchIcon,
  QuestionMarkCircleIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ChevronRightIcon,
  UserIcon,
} from '@heroicons/react/solid';
import { useState } from 'react';
const LeftNavBar = () => {
  const [open, setOpen] = useState(true);

  const Menus = [];

  return (
    <div>
      <div
        className={`${
          open ? 'w-72' : 'w-20'
        } hidden lg:block duration-300 h-full p-5 pt-8 bg-purple-1 relative`}
      >
        <ChevronLeftIcon
          className={` absolute cursor-pointer -right-3 top-9 w-7 border-2 border-purple-1 rounded-full bg-white text-dark-1 ${
            !open && 'rotate-180'
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className='flex gap-x-4 items-center'>
          <img
            src='https://svgshare.com/i/hDh.svg'
            alt=''
            className={`cursor-pointer duration-700 h-10 w-10 ${
              open && 'rotate-[90deg]'
            }`}
          />
          <h2
            className={`text-white origin-left font-medium text-xl duration-300 ${
              !open && 'scale-0'
            }`}
          >
            Meny
          </h2>
        </div>
        <ul className='flex flex-col gap-4 pt-14'>
          <li className='text-purple-5 flex items-center justify-between cursor-pointer p-2 hover:bg-purple-2 rounded'>
            <div className='flex gap-x-4'>
              <HomeIcon className='h-6 w-6' />
              <span className={`${!open && 'hidden'} origin-left duration-200`}>
                Forsiden
              </span>
            </div>
            <ChevronRightIcon
              className={`${
                !open && 'hidden'
              } h-6 w-6 origin-left duration-200`}
            />
          </li>
          <li className='text-purple-5 flex items-center justify-between cursor-pointer p-2 hover:bg-purple-2 rounded'>
            <div className='flex gap-x-4'>
              <UserGroupIcon className='h-6 w-6' />
              <span className={`${!open && 'hidden'} origin-left duration-200`}>
                Grupper
              </span>
            </div>
            <ChevronRightIcon
              className={`${
                !open && 'hidden'
              } h-6 w-6 origin-left duration-200`}
            />
          </li>
          <li className='text-purple-5 flex items-center justify-between cursor-pointer p-2 hover:bg-purple-2 rounded'>
            <div className='flex gap-x-4'>
              <ColorSwatchIcon className='h-6 w-6' />
              <span className={`${!open && 'hidden'} origin-left duration-200`}>
                Flashcards
              </span>
            </div>
            <ChevronRightIcon
              className={`${
                !open && 'hidden'
              } h-6 w-6 origin-left duration-200`}
            />
          </li>
          <li className='text-purple-5 flex items-center justify-between cursor-pointer p-2 hover:bg-purple-2 rounded'>
            <div className='flex gap-x-4'>
              <DocumentTextIcon className='h-6 w-6' />
              <span className={`${!open && 'hidden'} origin-left duration-200`}>
                Dokumentdeling
              </span>
            </div>
            <ChevronRightIcon
              className={`${
                !open && 'hidden'
              } h-6 w-6 origin-left duration-200`}
            />
          </li>
          <li className='text-purple-5 flex items-center justify-between cursor-pointer p-2 hover:bg-purple-2 rounded'>
            <div className='flex gap-x-4'>
              <QuestionMarkCircleIcon className='h-6 w-6' />
              <span className={`${!open && 'hidden'} origin-left duration-200`}>
                Mine spørsmål
              </span>
            </div>
            <ChevronRightIcon
              className={`${
                !open && 'hidden'
              } h-6 w-6 origin-left duration-200`}
            />
          </li>
          <li className='text-purple-5 flex items-center justify-between cursor-pointer p-2 hover:bg-purple-2 rounded'>
            <div className='flex gap-x-4'>
              <QuestionMarkCircleIcon className='h-6 w-6' />
              <span className={`${!open && 'hidden'} origin-left duration-200`}>
                Mine svar
              </span>
            </div>
            <ChevronRightIcon
              className={`${
                !open && 'hidden'
              } h-6 w-6 origin-left duration-200`}
            />
          </li>
        </ul>
        <div className='text-purple-5 flex items-center justify-between bottom-4 cursor-pointer p-2 hover:bg-purple-2 rounded'>
          <div className='flex gap-x-4'>
            <UserIcon className='h-6 w-6' />
            <span className={`${!open && 'hidden'} origin-left duration-200`}>
              Profil
            </span>
          </div>
          <ChevronRightIcon
            className={`${!open && 'hidden'} h-6 w-6 origin-left duration-200`}
          />
        </div>
      </div>
    </div>
  );
};

export default LeftNavBar;
