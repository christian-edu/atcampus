import { useLocation } from 'react-router-dom';
import UserCard from './shared/UserCard';
import Button from './shared/Button';

const GroupMembers = () => {
  const location = useLocation();

  const group = location.state.group;

  console.log(group);

  return (
    <div>
      <h2>Medlemmer</h2>
      <ul className='grid grid-cols-1 gap-4'>
        {group.members.map((member) => (
          <UserCard key={member} edit={true} user={member} />
        ))}
      </ul>
      <Button to="/group/members/searchUser">+ Legg til medlem</Button>
    </div>
  );
};

export default GroupMembers;
