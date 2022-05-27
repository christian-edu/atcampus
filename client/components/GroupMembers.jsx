import UserCard from './shared/UserCard';
import Button from './shared/Button';
import { useParams } from 'react-router-dom';
import { useLoader } from '../useLoader';
import { fetchJSON } from '../fetchJSON';
import Loading from './shared/Loading';
import Breadcrumbs from './shared/Breadcrumbs';

const GroupMembers = () => {
  const params = useParams();

  const {
    data: groupMembers,
    error,
    loading,
  } = useLoader(() => fetchJSON(`/api/v1/groups/member/?groupId=${params.id}`));

  if (loading) return <Loading />;

  console.log(groupMembers);

  return (
    <>
      <Breadcrumbs />
      <div className='bg-white p-6 rounded max-w-xl mx-auto text-dark-1'>
        <h2 className='font-bold text-xl mb-8'>Medlemmer</h2>
        <ul className='grid grid-cols-1 gap-4 mb-8'>
          {groupMembers.map((member) => (
            <UserCard key={member.uuid} edit={true} user={member} />
          ))}
        </ul>
        <div className='grid grid-cols-1 md:grid-cols-3'>
          <Button
            to='/groups/specific/members/searchUser'
            className='md:col-start-2'
          >
            + Legg til medlem
          </Button>
        </div>
      </div>
    </>
  );
};

export default GroupMembers;
