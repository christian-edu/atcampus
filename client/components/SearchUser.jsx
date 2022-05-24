import { useCallback, useEffect, useState } from 'react';
import Button from './shared/Button';
import { GroupCriteria } from './shared/GroupCriteria';
import UserCard from './shared/UserCard';

const SearchUser = () => {
  // Needs work

  const [users, setUsers] = useState([]);
  const [input, setInput] = useState('');

  // const fetchGroups = async () => {
  //   const res = await fetch('/api/v1/groups');
  //   const data = await res.json();

  // };

  const inputHandler = (e) => setInput(e.target.value);

  useEffect(() => {
    // fetchGroups();
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(input.toLowerCase())
  );

  console.log(users);

  return (
    <>
      <div className='grid grid-cols-1 gap-4 bg-white text-dark-1 p-6 rounded-standard max-w-2xl mx-auto mb-6'>
        <div>
          <h2 className='text-xl font-bold'>Legg til medlem</h2>
        </div>
        <div>
          <label htmlFor='userName'>Søk etter brukernavn</label>
          <input
            type='text'
            id='userName'
            placeholder='Torleif Jakobsen'
            className='w-full p-2 border border-purple-3 rounded-standard bg-dark-6 mt-2'
            onChange={inputHandler}
          />
        </div>
        <ul className='grid gap-4'>
          {input && filteredUsers.length === 0 && 'Fant ingen brukere'}
          {input && filteredUsers.map((user, i) => <li>Li</li>)}
        </ul>
      </div>

      <div className='bg-white text-dark-1 p-6 rounded-standard max-w-2xl mx-auto'>
        <div>
          <h2 className='text-xl font-bold'>Søk etter gruppekriterier</h2>
          <h4>Trykk på en gruppe for å sende forespørsel</h4>
        </div>
        
        <div className='flex flex-col gap-8'>
          <GroupCriteria />
          <div className="grid grid-cols-1 md:grid-cols-3">
            <Button to='/group/members/searchUser/searchUserResults' className="md:col-start-2">
              Søk etter medlem
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchUser;
