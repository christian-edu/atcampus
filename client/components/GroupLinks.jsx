import { Link, useNavigate } from 'react-router-dom';
import { fetchJSON } from '../fetchJSON';
import { useLoader } from '../useLoader';
import BtnComp from './shared/Button';
import Loading from './shared/Loading';
import GroupCard from './shared/GroupCard';

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
      <div>
        <button class="bg-gradient-left text-white text-center font-bold py-2 px-4 rounded mx-4">
          <Link to={"/createGroup"}>
            Opprett gruppe
          </Link>
        </button>
      </div>
      <div>
        <Link to={'/searchGroup'}>Søk etter gruppe</Link>
      </div>
      <h2>Mine grupper</h2>
      <div className='grid gap-4'>
        {data.map((group) => (
          <GroupCard
            group={group}
            key={group.groupname}
            onClick={() => navigate('/group/specific', { state: { group } })}
          />
        ))}
      </div>
    </div>
  );
};

export default GroupLinks;
