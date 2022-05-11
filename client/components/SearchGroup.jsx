import { useCallback, useEffect, useState } from 'react';
import GroupCriteria from './shared/GroupCriteria';

const SearchGroup = () => {
  const [groups, setGroups] = useState([]);
  const [input, setInput] = useState('');

  const getGroups = useCallback(async () => {
    const res = await fetch('api/v1/groups');
    const data = await res.json();
    setGroups(data);
  });

  const inputHandler = (e) => setInput(e.target.value);

  useEffect(() => {
    getGroups();
  }, []);

  const filteredGroups = groups.filter((group) =>
    group.groupname.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <>
      <div className='grid grid-cols-1 gap-4 bg-white p-6 rounded-standard border border-purple-4 mb-6'>
        <div>
          <h2>Søk etter gruppenavn</h2>
          <h4>Trykk på en gruppe for å sende forespørsel</h4>
        </div>
        <div>
          <label htmlFor='groupName mb-20'>Gruppenavn</label>
          <input
            type='text'
            id='groupName'
            placeholder='Gruppenavn'
            className='w-full p-2 border border-purple-3 rounded-standard'
            onChange={inputHandler}
          />
        </div>
        <ul>
          {(!input || filteredGroups.length === 0) && 'Ingen grupper å vise'}
          {input &&
            filteredGroups.map((group) => (
              <li key={group.groupname}>{group.groupname}</li>
            ))}
        </ul>
      </div>

      <div className='bg-white p-6 rounded-standard border border-purple-4'>
        <div>
          <h2>Søk etter gruppekriterier</h2>
          <h4>Trykk på en gruppe for å sende forespørsel</h4>
        </div>
        <GroupCriteria />
      </div>
    </>
  );
};

export default SearchGroup;
