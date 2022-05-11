import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateGroup() {
  const [groupname, setGroupName] = useState('');
  const [error, setError] = useState();

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (groupname.length === 0) {
      alert('Please fill in a group name');
    } else {
      const res = await fetch('/api/v1/groups', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ groupname }),
      });

      if (!res.ok) {
        setError('Failed to create the group, Error: ' + res.status);
      } else {
        navigate('/');
      }
    }
  }

  if (error) {
    return (
      <div>
        <h2>Error: </h2>
        <h4>{error}</h4>
      </div>
    );
  }

  return (
    <>
      <div>
        <h2>Opprett gruppe</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Gruppenavn:{' '}
            <input
              type='text'
              value={groupname}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </label>
          <button>Opprett gruppe</button>
        </form>
      </div>
    </>
  );
}

export default CreateGroup;
