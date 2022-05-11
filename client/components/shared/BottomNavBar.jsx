import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';

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
        <div className='flex justify-between px-6 py-4 fixed inset-x-0 bottom-0 bg-dark-6 text-sm'>
          <div className='flex-col items-center'>
            <Link to={'/questions'}>
              <p>Test</p>
              <h4>Spørsmål</h4>
            </Link>
          </div>
          <div>
            <h4>Flashcards</h4>
          </div>
          <div>
            <Link to={'/'}>
              <h4>Grupper</h4>
            </Link>
          </div>
          <div>
            <button onClick={showProfileFn}>Profile</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomNavBar;
