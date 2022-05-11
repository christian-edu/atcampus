import { Link } from 'react-router-dom';

const ProfileMenu = ({ showProfileFn }) => {
  return (
    <div>
      <button onClick={showProfileFn}>X</button>
      <ul>
        <li>Endre profil</li>
        <li>Instillinger</li>
        <li>Notifikasjoner</li>
        <li onClick={showProfileFn}>
          {/* <Link to={'/'}>Mine grupper</Link> */}
        </li>
        <li>Mine spørsmål</li>
        <li>Mine svar</li>
        <li>Logg ut</li>
      </ul>
    </div>
  );
};

export default ProfileMenu;