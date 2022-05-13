import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './shared/Button';
import Modal from './shared/Modal';
import { XIcon, CheckIcon } from '@heroicons/react/solid';

const CreateGroupPopup = (props) => {
  return (
    <div className='flex flex-col items-center bg-white p-8 rounded text-center shadow-xl'>
      <h2 className='text-dark-1 font-bold text-xl mb-3 w-full border-b-2 pb-4 border-purple-1'>
        Ny gruppe!
      </h2>
      <p className='mb-4'>
        Du kan sette opp gruppekriterier slik at andre studenter kan matche med
        gruppen din.
      </p>
      <p className='font-bold mb-4'>
        Ønsker du å sette opp gruppekriterier nå?
      </p>
      <div className='flex flex-row gap-6'>
        <button
          className='bg-dark-1 text-white p-2 rounded'
          onClick={props.onCancel}
        >
          <XIcon className='h-6 w-6' />
        </button>
        <button
          className='bg-gradient-left text-white p-2 rounded'
          onClick={props.onConfirm}
        >
          <CheckIcon className='h-6 w-6' />
        </button>
      </div>
    </div>
  );
};

function CreateGroup() {
  const [groupname, setGroupName] = useState('');
  const [modalIsVisible, setModalIsVisible] = useState(false);
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
        setModalIsVisible(true);
      }
    }
  }

  const cancelHandler = () => navigate('/');

  const confirmHandler = () => navigate('/group/groupCriteria');

  if (error)
    return (
      <div>
        <h2>Error: </h2>
        <h4>{error}</h4>
      </div>
    );

  return (
    <>
      {modalIsVisible && (
        <Modal>
          <CreateGroupPopup
            onCancel={cancelHandler}
            onConfirm={confirmHandler}
          />
        </Modal>
      )}
      <div className='bg-white p-6 grid gap-4 rounded-standard border border-purple-4'>
        <h2 className='text-xl font-bold'>Opprett gruppe</h2>
        <form onSubmit={handleSubmit}>
          <label>Gruppenavn:</label>
          <div className='mb-6'>
            <input
              type='text'
              className='w-full p-2 border border-purple-3 rounded-standard bg-dark-6 mt-2'
              value={groupname}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
          <Button type='submit'>Opprett gruppe</Button>
        </form>
      </div>
    </>
  );
}

export default CreateGroup;
