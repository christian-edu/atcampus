import { useState } from 'react';
import TopNavBarMenu from './TopNavBarMenu';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { MenuIcon } from '@heroicons/react/solid';
import { ArrowLeftIcon } from '@heroicons/react/solid';

const TopNavBar = () => {
  const [showNavBar, setShowNavBar] = useState(false);

  const navigate = useNavigate();

  const backButtonHandler = () => {
    navigate(-1);
  };

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

      <div className='flex flex-row py-4 px-4 bg-purple-5 items-center justify-between'>
        <button
          onClick={backButtonHandler}
          className='flex flex-col items-center p-2 outline outline-2 outline-purple-1 rounded text-white '
        >
          <ArrowLeftIcon className='h-6 w-6 text-purple-1' />
        </button>

        <button
          onClick={toggleNavBarHandler}
          className='flex flex-col items-center'
        >
          <MenuIcon className='h-7 w-7 text-purple-1' />
          Menu
        </button>
      </div>
    </>
  );
};

export default TopNavBar;
