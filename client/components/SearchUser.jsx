import { useCallback, useEffect, useState } from 'react';
import GroupCard from './shared/GroupCard';
import GroupCriteria from './shared/GroupCriteria';
import UserCard from './shared/UserCard';

const SearchUser = () => {
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState('');


  const getGroups = useCallback(async () => {
    const res = await fetch('/api/v1/groups');
    const data = await res.json();
    console.log(res);
    setUsers(data.flatMap(group => group.members));
  });

  const inputHandler = (e) => setInput(e.target.value);

  useEffect(() => {
    getGroups();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.toLowerCase().includes(input.toLowerCase())
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
          {/* {(!input) && 'Ingen grupper å vise'} */}
          {input &&
            filteredUsers.map((user) => (
              <UserCard
                key={user}
                user={user}
                search={true}
              />
            ))}
        </ul>
      </div>

      <div className='bg-white p-6 rounded-standard border border-purple-4'>
        <div>
          <h2 className='text-xl font-bold'>Søk etter gruppekriterier</h2>
          <h4>Trykk på en gruppe for å sende forespørsel</h4>
        </div>
        <GroupCriteria />
      </div>
    </>
  );
};

export default SearchUser;
