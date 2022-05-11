import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  MenuAlt1Icon,
  UserGroupIcon,
  ChatIcon,
  CalendarIcon,
} from '@heroicons/react/solid';

const GroupPage = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const group = location.state.group;

  return (
    <div className='bg-white p-6'>
      <h2 className='text-xl font-bold mb-8'>{group.groupname}</h2>

      <ul className='grid gap-8'>
        <li className='border-b-2 border-purple-1'>
          <Link to='/' className='flex gap-2 items-center text-lg pb-4'>
            <ChatIcon className='h-6 text-purple-1' />
            Chat
          </Link>
        </li>
        <li className='border-b-2 border-purple-1'>
          <Link to='/' className='flex gap-2 items-center text-lg pb-4'>
            <CalendarIcon className='h-6 text-purple-1' />
            Møtekalender
          </Link>
        </li>
        <li className='border-b-2 border-purple-1'>
          <Link to='/' className='flex gap-2 items-center text-lg pb-4'>
            <MenuAlt1Icon className='h-6 text-purple-1' />
            Notater
          </Link>
        </li>
        <li className='border-b-2 border-purple-1'>
          <button
            onClick={() => navigate('/group/members', { state: { group } })}
          >
            <Link to='/' className='flex gap-2 items-center text-lg pb-4'>
              <UserGroupIcon className='h-6 text-purple-1' />
              Medlemmer
            </Link>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default GroupPage;
