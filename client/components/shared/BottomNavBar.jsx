import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';
import Modal from './Modal';
import { bottomNavBarMenu } from '../../services/menus';

const BottomNavBar = () => {
  // Component for bottom menu on mobile

  // State for showing profile menu
  const [modalIsVisible, setModalIsVisible] = useState(false);

  // Toggle showing profile menu
  const toggleProfileMenu = () =>
    setModalIsVisible((modalIsVisible) => !modalIsVisible);

  return (
    <div>
      {/* Render modal */}
      {modalIsVisible && (
        <Modal onClick={toggleProfileMenu}>
          <ProfileMenu onClick={toggleProfileMenu} />
        </Modal>
      )}
      <div className='flex justify-between px-6 pt-4 pb-6 sm:justify-center sm:gap-20 fixed inset-x-0 bottom-0 bg-purple-5 outline outline-1 outline-dark-5 text-sm font-semibold text-dark-1 lg:hidden'>
        {bottomNavBarMenu.map(({ title, path, Icon }) => {
          if (title === 'Profil')
            return (
              <div
                key={title}
                className='flex flex-col items-center cursor-pointer'
                onClick={toggleProfileMenu}
              >
                <Icon className='h-6 w-6 text-purple-1' />
                <h4>{title}</h4>
              </div>
            );
          return (
            <Link to={path} className='flex flex-col items-center' key={title}>
              <Icon className='h-6 w-6 text-purple-1' /> <h4>{title}</h4>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavBar;
