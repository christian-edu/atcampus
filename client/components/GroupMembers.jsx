import { useLocation } from 'react-router-dom';
import UserCard from './shared/UserCard';

const GroupMembers = () => {
  const location = useLocation();

  const group = location.state.group;

  console.log(group);

  return (
    <div>
      <h2 className='text-dark-1 font-bold text-xl'>Medlemmer</h2>
      <ul className='grid grid-cols-1 gap-4'>
        {group.members.map((member) => (
          <UserCard key={member} edit={true} user={member} />
        ))}
      </ul>
      <button>+ Legg til medlem</button>
    </div>
  );
};

export default GroupMembers;
