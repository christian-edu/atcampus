import { useState } from 'react';
import TopNavBarMenu from './TopNavBarMenu';
import Modal from './Modal';
import { MenuIcon } from '@heroicons/react/solid';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import BackButton from './BackButton';

const TopNavBar = () => {
  const [showNavBar, setShowNavBar] = useState(false);

  const toggleNavBarHandler = () => setShowNavBar((showNavBar) => !showNavBar);

  return (
    <>
      {showNavBar ? (
        <Modal onClick={toggleNavBarHandler}>
          {' '}
          <TopNavBarMenu onClick={toggleNavBarHandler} />{' '}
        </Modal>
      ) : (
        <h2></h2>
      )}

      <div className='flex flex-row py-4 px-4 bg-purple-5 items-center justify-between lg:hidden'>
        <BackButton />

        <button
          onClick={toggleNavBarHandler}
          className='flex flex-col items-center'
        >
          <MenuIcon className='w-12 text-purple-1'/>
        </button>
      </div>
    </>
  );
};

export default TopNavBar;
