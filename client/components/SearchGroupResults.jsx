import { useCallback, useEffect, useState } from 'react';
import GroupCard from './shared/GroupCard';

const SearchGroupResults = () => {
  const [groups, setGroups] = useState([]);

  const getGroups = useCallback(async () => {
    const res = await fetch('/api/v1/groups');
    const data = await res.json();
    setGroups(data);
  });

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <div className='bg-white p-6 rounded border border-purple-4'>
      <h2 className='font-bold text-xl mb-8'>Søkeresultater</h2>
      <ul className='grid grid-cols-1 gap-4'>
        {groups.map((group) => (
          <GroupCard key={group.groupname} match={true} group={group} />
        ))}
      </ul>
    </div>
  );
};

export default SearchGroupResults;
