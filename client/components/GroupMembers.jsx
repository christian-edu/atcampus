import { useLocation } from 'react-router-dom';
import UserCard from './shared/UserCard';
import Button from './shared/Button';

const GroupMembers = () => {
  const location = useLocation();

  const { groupMember } = location.state.group;

  return (
    <div className='bg-white p-6 rounded max-w-xl mx-auto text-dark-1'>
      <h2 className='font-bold text-xl mb-8'>Medlemmer</h2>
      <ul className='grid grid-cols-1 gap-4 mb-8'>
        {groupMember.map((member) => (
          <UserCard key={member.user.username} edit={true} user={member} />
        ))}
      </ul>
      <div className='grid grid-cols-1 md:grid-cols-3'>
        <Button to='/group/members/searchUser' className="md:col-start-2">+ Legg til medlem</Button>
      </div>
    </div>
  );
};

export default GroupMembers;
