import { useState } from 'react';
import TopNavBarMenu from './TopNavBarMenu';

const TopNavBar = () => {
  const [showNavBar, setShowNavBar] = useState(false);

  function showNavBarFn() {
    if (showNavBar) {
      setShowNavBar(false);
    } else {
      setShowNavBar(true);
    }
  }

  return (
    <div>
      {showNavBar ? <TopNavBarMenu /> : <h2></h2>}

      <h2 style={{ display: 'inline-block', marginRight: 20 }}>&#x2190;</h2>
      <button onClick={showNavBarFn}> Menu</button>
    </div>
  );
};

export default TopNavBar;
