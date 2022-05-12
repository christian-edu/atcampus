import { useCallback, useEffect, useState } from 'react';
import UserCard from './shared/UserCard';

const SearchUserResults = () => {

  const [users, setUsers] = useState([]);


  const getGroups = useCallback(async () => {
    const res = await fetch('/api/v1/groups');
    const data = await res.json();
    setUsers(data.flatMap(group => group.members));
  });

    useEffect(() => {
    getGroups();
  }, []);

  return (
    <div className='bg-white p-6 rounded border border-purple-4'>
      <h2 className='font-bold text-xl mb-8'>Søkeresultater</h2>
      <ul className='grid grid-cols-1 gap-4'>
        {users.map((user) => (
          <UserCard key={user} match={true} user={user} />
        ))}
      </ul>
    </div>
  );
};

export default SearchUserResults;
