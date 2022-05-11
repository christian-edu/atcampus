import { Link, useNavigate } from 'react-router-dom';
import { fetchJSON } from '../fetchJSON';
import { useLoader } from '../useLoader';

const GroupLinks = () => {
  // Should get the data for the group names you are a part of

  const navigate = useNavigate();

  const { data, error, loading } = useLoader(() => fetchJSON('/api/v1/groups'));

  if (loading) {
    return <div>Loading...</div>;
  }

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
        <Link to={'/createGroup'}>Opprett gruppe</Link>
      </div>
      <div>
        <Link to={'/searchGroup'}>Søk etter gruppe</Link>
      </div>
      <div>
        <h2>Mine grupper</h2>
        {data.map((group) => (
          <div>
            <div key={group.groupname}>
              <button
                onClick={() =>
                  navigate('/group/specific', { state: { group } })
                }
              >
                {group.groupname}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupLinks;
