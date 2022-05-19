import { Link, useNavigate } from 'react-router-dom';
import { fetchJSON } from '../fetchJSON';
import { useLoader } from '../useLoader';
import Loading from './shared/Loading';
import GroupCard from './shared/GroupCard';
import Button from './shared/Button';

const GroupLinks = () => {
  // Should get the data for the group names you are a part of

  const navigate = useNavigate();

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

  return (
    <div>
      <div className='grid gap-4 sm:grid-cols-1 md:grid-cols-4 mb-8'>
        <Button to='/createGroup'>Opprett gruppe</Button>
        <Button to='/searchGroup' className='md:col-start-4'>
          Søk etter gruppe
        </Button>
      </div>

      <h2 className='text-dark-1 text-xl font-bold mb-4'>Mine grupper</h2>
      <div className='grid gap-4'>
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
