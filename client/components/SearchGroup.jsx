import { useCallback, useEffect, useState } from 'react';
import GroupCard from './shared/GroupCard';
import {GroupCriteria} from "./shared/GroupCriteria";



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
    group.name.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <>
      <div className='grid grid-cols-1 gap-4 bg-white p-6 rounded-standard border border-purple-4 mb-6'>
        <div>
          <h2 className='text-xl font-bold'>Søk etter gruppenavn</h2>
          <h4>Trykk på en gruppe for å sende forespørsel</h4>
        </div>
        <div>
          <label htmlFor='groupName'>Gruppenavn</label>
          <input
            type='text'
            id='groupName'
            placeholder='Smidig Prosjekt'
            className='w-full p-2 border border-purple-3 rounded-standard bg-dark-6 mt-2'
            onChange={inputHandler}
          />
        </div>
        <ul className='grid gap-4'>
          {input && filteredGroups.length === 0 && 'Ingen grupper å vise'}
          {input &&
            filteredGroups.map((group) => (
              <GroupCard key={group.groupname} group={group} search={true} />
            ))}
        </ul>
      </div>

      <div className='bg-white p-6 rounded-standard border border-purple-4'>
        <div className='flex flex-col gap-8'>
          <GroupCriteria />
        </div>
      </div>
    </>
  );
};

export default SearchGroup;
