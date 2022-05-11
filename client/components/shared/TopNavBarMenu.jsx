import { Link } from 'react-router-dom';

const TopNavBarMenu = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to='/'>Forsiden</Link>
        </li>
        <li>Still spørsmål</li>
        <li>Topplisten</li>
        <li>Flashcard</li>
        <li>Dokumentering</li>
        <li>Min Profil</li>
        <li>Mine Spørsmål</li>
        <li>Mine svar</li>
      </ul>
    </div>
  );
};

export default TopNavBarMenu;
