import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileMenu from '../ProfileMenu';

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
        <div>
          <div style={{ display: 'inline-block', marginRight: 20 }}>
            <Link to={'/questions'}>
              <h4>Spørsmål</h4>
            </Link>
          </div>
          <div style={{ display: 'inline-block', marginRight: 20 }}>
            <h4>Flashcards</h4>
          </div>
          <div style={{ display: 'inline-block', marginRight: 20 }}>
            <Link to={'/'}>
              <h4>Grupper</h4>
            </Link>
          </div>
          <div style={{ display: 'inline-block' }}>
            <button onClick={showProfileFn}>Profile</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomNavBar;
