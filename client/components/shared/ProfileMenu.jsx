import {Link, useNavigate} from 'react-router-dom';
import {BellIcon, ChevronRightIcon, LogoutIcon, UserIcon} from '@heroicons/react/solid';
import { profileMenu } from '../../services/menus';
import log from "tailwindcss/lib/util/log";
import {CogIcon} from "@heroicons/react/outline";

const ProfileMenu = ({ onClick }) => {
  // Profile menu popup

    const navigate = useNavigate();

    function logOut(){
        fetch("/api/v1/logout",{
            method: "DELETE"
        })

        window.location.reload(false)

    }

  return (
    <div>
      <div className='flex justify-end'>
        <button
          onClick={onClick}
          className='text-white px-4 py-2 mb-3 mr-3 outline outline-white text-center bg-purple-1 rounded-full hover:bg-purple-2'
        >
          X
        </button>
      </div>

      <div className='grid grid-cols-1 bg-gradient-left w-screen text-white max-w-2xl mx-auto rounded-standard'>
        <ul className='divide-y divide-purple-4'>
            <li
                className='flex flex-row justify-between my-1 hover:bg-purple-2 px-4'
            >
                <Link className='flex flex-row w-full py-3' to={"/"}>
                    <UserIcon className='h-6 w-6 text-white mr-4'/>
                    Endre profil
                    <ChevronRightIcon className='h-6 w-6 ml-auto text-white' />
                </Link>
            </li>
            <li
                className='flex flex-row justify-between my-1 hover:bg-purple-2 px-4'
            >
                <Link className='flex flex-row w-full py-3' to={"/"}>
                    <CogIcon className='h-6 w-6 text-white mr-4'/>

                    Instillinger
                    <ChevronRightIcon className='h-6 w-6 ml-auto text-white' />
                </Link>
            </li>
            <li
                className='flex flex-row justify-between my-1 hover:bg-purple-2 px-4'
            >
                <Link className='flex flex-row w-full py-3' to={"/"}>
                    <BellIcon className='h-6 w-6 text-white mr-4'/>

                    Notifikasjoner
                    <ChevronRightIcon className='h-6 w-6 ml-auto text-white' />
                </Link>
            </li>
            <li onClick={logOut}
                className='flex flex-row justify-between my-1 hover:bg-purple-2 px-4'
            >
                <Link className='flex flex-row w-full py-3' to={"/"}>
                    <LogoutIcon className='h-6 w-6 text-white mr-4'/>

                    Logg ut
                    <ChevronRightIcon className='h-6 w-6 ml-auto text-white' />
                </Link>
            </li>
          {/*{profileMenu.map(({ path, title, Icon }) => (
            <li
              className='flex flex-row justify-between my-1 hover:bg-purple-2 px-4'
              key={title}
              onClick={logOut}
            >
              <Link className='flex flex-row w-full py-3' to={path}>
                <Icon className='h-6 w-6 text-white mr-4' />
                {title}
                <ChevronRightIcon className='h-6 w-6 ml-auto text-white' />
              </Link>
            </li>
          ))}*/}
        </ul>
      </div>
    </div>
  );
};

export default ProfileMenu;
