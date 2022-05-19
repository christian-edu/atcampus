import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { topNavBarMenu } from '../../services/menus';

const TopNavBarMenu = (props) => {
  return (
    <div>
      <div className='flex justify-end'>
        <button
          onClick={props.onClick}
          className='flex justify-end text-white px-4 py-2 mb-3 mr-3 outline outline-white text-center bg-purple-1 rounded-full hover:bg-purple-2'
        >
          X
        </button>
      </div>

      <div className='grid grid-cols-1 bg-gradient-left w-screen text-white max-w-2xl mx-auto rounded-standard'>
        <ul className='divide-y divide-purple-4'>
          {topNavBarMenu.map(({ path, title, Icon }) => (
            <li
              className='flex flex-row justify-between my-1 hover:bg-purple-2 px-4'
              key={title}
            >
              <Link className='flex flex-row w-full py-3' to={path}>
                <Icon className='h-6 w-6 text-white mr-4' />
                {title}
                <ChevronRightIcon className='h-6 w-6 ml-auto text-white' />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TopNavBarMenu;
