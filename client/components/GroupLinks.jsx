import {  useNavigate } from 'react-router-dom';
import { fetchJSON } from '../fetchJSON';
import { useLoader } from '../useLoader';
import Loading from './shared/Loading';
import GroupCard from './shared/GroupCard';
import Button from './shared/Button';


const GroupLinks = () => {
  // Should get the data for the group names you are a part of

  const navigate = useNavigate();


  // Send request to /user, if there is no access token saved in the cookie, returns 401 for a redirect back to /login

    // if its not a 401, we take the user data and save it in a context

  const { data, error, loading } = useLoader(() => fetchJSON('/api/v1/groups'));



  if (loading) return <Loading />;

  if (error) {
    return (
      <div>
        <h2>Error</h2>
        <h3>{error}</h3>
      </div>
    );
  }

  // Return this only if they are logged in

  return (
    <div>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8 mt-6'>
        <Button to='/groups/createGroup' className='lg:col-start-2'>
          Opprett gruppe
        </Button>
        <Button to='/groups/searchGroup' className='lg:col-start-3'>
          Søk etter gruppe
        </Button>
      </div>

      <h2 className='text-dark-1 text-xl font-bold mb-4'>Mine grupper</h2>
      <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
        {data.map((group) => (
          <GroupCard
            group={group}
            key={group.name}
            onClick={() => navigate('/group/specific', { state: { group } })}
          />
        ))}
      </div>
    </div>
  );
};

export default GroupLinks;
