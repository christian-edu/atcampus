import { useState } from 'react';
import TopNavBarMenu from './TopNavBarMenu';
import { useNavigate } from 'react-router-dom';

const TopNavBar = () => {
  const [showNavBar, setShowNavBar] = useState(false);

  const navigate = useNavigate();

  const backButtonHandler = () => {
    navigate(-1);
  };

  const showNavBarHandler = () => setShowNavBar((state) => !state);

  return (
    <div>
      {showNavBar ? <TopNavBarMenu /> : <h2></h2>}
      <button onClick={backButtonHandler}>&larr;</button>
      <button onClick={showNavBarHandler}> Menu</button>
    </div>
  );
};

export default TopNavBar;
