import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumbs from './shared/Breadcrumbs';
import Button from './shared/Button';
import Message from './shared/Message';
import { motion, AnimatePresence } from 'framer-motion';

export function EditGroupProfile() {
  const [groupName, setGroupName] = useState('');
  const [rules, setRules] = useState('');
  const [file, setFile] = useState('');
  const [message, setMessage] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await fetch(`/api/v1/groups/?groupId=${params.id}`);
    const data = await res.json();
    console.log(data);
    setGroupName(data.name);
    setRules(data.rules);
  };

  useEffect(() => {
    fetchData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch('/api/v1/groups', {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ groupName, file, rules, uuid: params.id }),
    });

    setMessage('Endringer lagret');

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setMessage(null);

    // navigate(`/groups/${params.id}`);
  }

  return (
    <>
      <Breadcrumbs />
      <div className='bg-white p-6 grid gap-4 rounded-standard max-w-2xl mx-auto text-dark-1'>
        <h2 className='font-bold text-xl'>Endre gruppeprofil</h2>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col mb-6'>
            <label className='text-dark-3'>Gruppenavn</label>
            <input
              type='text'
              className='w-full p-2 border border-purple-3 rounded-standard bg-dark-6 mt-2'
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
          <div className='flex flex-col mb-6'>
            <label className='text-dark-3 mb-2'>Gruppebilde</label>
            <input
              type='file'
              value={file}
              onChange={(e) => setFile(e.target.value)}
            />
          </div>
          <div>
            <label className='text-dark-3'>Grupperegler</label>
            <div>
              <textarea
                placeholder={'eks. Alltid være tidsnok'}
                value={rules}
                className='w-full p-2 border border-purple-3 rounded-standard bg-dark-6 mt-2'
                onChange={(e) => setRules(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className='lg:grid grid-cols-3 mt-6'>
            <Button type='submit' className='lg:col-start-2'>
              Lagre
            </Button>
          </div>
        </form>
        <Message show={message}>Endringene ble lagret</Message>
      </div>
    </>
  );
}
