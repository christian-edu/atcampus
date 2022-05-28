import { Link, useNavigate } from 'react-router-dom';
import { fetchJSON } from '../fetchJSON';
import { useLoader } from '../useLoader';
import Loading from './shared/Loading';
import GroupCard from './shared/GroupCard';
import Button from './shared/Button';
import { useContext, useEffect } from 'react';
import { UserInfoContext } from '../App';
import React from 'react';

const GroupLinks = () => {
  // Should get the data for the group names you are a part of

  const navigate = useNavigate();

  const user = React.useContext(UserInfoContext);

  // Send request to /user, if there is no access token saved in the cookie, returns 401 for a redirect back to /login

  // if its not a 401, we take the user data and save it in a context

  const {
    data: groupData,
    error,
    loading,
  } = useLoader(() => fetchJSON('/api/v1/user/groups'));

  if (!user) {
    return <Link to={'/login'}>Login</Link>;
  }

  if (loading) return <Loading />;

  if (error) {
    return (
      <div>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8 mt-6'>
          <Button to='/createGroup' className='lg:col-start-2'>
            Opprett gruppe
          </Button>
          <Button to='/searchGroup' className='lg:col-start-3'>
            Søk etter gruppe
          </Button>
        </div>
        <h2>Error</h2>
        <h3>{error.toString()}</h3>
        <h3>Ingen grupper funnet</h3>
      </div>
    );
  }

  return (
    <div>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8 mt-6'>
        <Button to='/createGroup' className='lg:col-start-2'>
          Opprett gruppe
        </Button>
        <Button to='/searchGroup' className='lg:col-start-3'>
          Søk etter gruppe
        </Button>
      </div>

      <h2 className='text-dark-1 text-xl font-bold mb-4'>Mine grupper</h2>
      <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
        {/*Only return this id groupdata is nbot undefined*/}

        {groupData.map((group) => (
          <GroupCard
            group={group}
            key={group.uuid}
            onClick={() => navigate(`/groups/${group.uuid}`)}
          />
        ))}
      </div>
    </div>
  );
  // Return this only if they are logged in
};

export default GroupLinks;
