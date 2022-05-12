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
      <div className='bg-white p-6 grid gap-4 rounded-standard border border-purple-4'>
        <h2 className='text-xl font-bold'>Opprett gruppe</h2>
        <form onSubmit={handleSubmit}>
          <label>Gruppenavn:</label>
          <div>
            <input
              type='text'
              className='w-full p-2 border border-purple-3 rounded-standard bg-dark-6 mt-2'
              value={groupname}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
          <button>Opprett gruppe</button>
        </form>
      </div>
    </>
  );
}

export default CreateGroup;
