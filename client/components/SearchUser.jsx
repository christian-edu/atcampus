import { useEffect, useState } from 'react';
import Button from './shared/Button';
import Breadcrumbs from './shared/Breadcrumbs';

const SearchUser = () => {
  // Needs work

  const [user, setUser] = useState([]);
  const [email, setEmail] = useState('');
  const [userName, setUsername] = useState('');
  const [showEmail, setShowEmail] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {}, [user]);

  async function search() {
    setUser([]);
    setError(undefined);
    const res = await fetch('/api/v1/user/search', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ userName, email }),
    });

    if (res.status === 200) {
      setUser(await res.json());
    } else if (res.status === 204) {
      setError('Ingen brukere funnet');
    }
  }

  function setInput(e, email) {
    if (email) {
      setEmail(e.target.value);
    } else {
      setUsername(e.target.value);
    }
  }

  function showEmailField(showIt) {
    if (showIt) {
      setShowEmail(true);
      setUsername('');
    } else {
      setShowEmail(false);
      setEmail('');
    }
  }

  return (
    <>
      <Breadcrumbs />
      <div className='grid grid-cols-1 gap-4 bg-white text-dark-1 p-6 rounded-standard max-w-2xl mx-auto mb-6'>
        <div>
          <h2 className='text-xl font-bold'>Legg til medlem</h2>
        </div>
        <div>
          <div>
            <input
              type='radio'
              name={'emailOrName'}
              value={'mail'}
              onClick={(event) => showEmailField(true)}
              className='form-check-input appearance-none rounded-full h-4 w-4 border border-dark-4 bg-white checked:bg-purple-1 checked:border-dark-1 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
            />
            <label htmlFor='email'>Søk etter epost</label>
          </div>
          <div>
            <input
              type='radio'
              name={'emailOrName'}
              value={'name'}
              defaultChecked
              onClick={(event) => showEmailField(false)}
              className='form-check-input appearance-none rounded-full h-4 w-4 border border-dark-4 bg-white checked:bg-purple-1 checked:border-dark-1 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
            />
            <label htmlFor='userName'>Søk etter brukernavn</label>
          </div>
          {showEmail ? (
            <input
              type='email'
              id='email'
              placeholder='Eks. student@kristiania.no'
              className='w-full p-2 border border-purple-3 rounded-standard bg-dark-6 mt-2 mb-8'
              onChange={(event) => setInput(event, true)}
            />
          ) : (
            <input
              type='text'
              id='userName'
              placeholder='Eks. Torleif Jakobsen'
              className='w-full p-2 border border-purple-3 rounded-standard bg-dark-6 mt-2 mb-8'
              onChange={(event) => setInput(event, false)}
            />
          )}

        <div className='grid grid-cols-1 md:grid-cols-3'>
          <Button onClick={search} className='md:col-start-2'>Søk bruker</Button>
        </div>
          
        </div>

        <ul>
          {user ? (
            user.map((specificUser) => (
              <li key={specificUser.username}>
                {specificUser.username} ({specificUser.email})
              </li>
            ))
          ) : (
            <h2>Ingen brukere</h2>
          )}
          {error ? <h2>{error}</h2> : <></>}
        </ul>
      </div>
    </>
  );
};

export default SearchUser;
