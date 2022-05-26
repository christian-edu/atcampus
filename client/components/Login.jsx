import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './shared/Button';
import logo from '../src/images/atcampus-black.svg';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  async function sendLogin(e) {
    e.preventDefault();
    const res = await fetch('/api/v1/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ userName: username, password }),
    });

    if (res.status === 200) {
      navigate('/');
    }
    // Make more error handling, incase there is wrong password etc
  }

  return (
    <div className='absolute top-0 left-0 w-screen h-screen bg-dark-6 flex flex-col gap-8 justify-center items-center'>
      <img src={logo} alt='atcampus logo' className='w-[10rem]' />
      <form
        onSubmit={sendLogin}
        className='bg-white flex gap-6 flex-col p-8 rounded border-1 border-purple-1 w-[90%] lg:w-[40%]'
      >
        <h1 className='text-xl font-bold text-center'>Logg inn</h1>
        <div>
          <label>Brukernavn:</label>
          <input
            className='w-full p-2 border border-purple-3 rounded-standard bg-dark-6 mt-2'
            type='text'
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          <label>Passord: </label>
          <input
            type='password'
            className='w-full p-2 border border-purple-3 rounded-standard bg-dark-6 mt-2'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <Button type='submit'>Log inn</Button>
        {/* <pre>{JSON.stringify({ username, password })}</pre> */}
      </form>
    </div>
  );
}
