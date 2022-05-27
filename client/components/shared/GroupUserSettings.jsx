import { KeyIcon, TrashIcon } from '@heroicons/react/solid';
import Image from './Image';
import Button from './Button';

const GroupUserSettings = ({ user }) => {
  function removeMember() {
    console.log(user.user_name + ' removed');
    // Send a request to delete the user
  }

  function makeAdmin() {
    console.log('Admin roles given to ' + user.user_name);
    //Send a request to make the user admin
  }

  // Popup som vises når man trykker på et gruppemedlem

  return (
    <div className='flex flex-col items-center bg-white text-dark-1 p-8 rounded text-center shadow-xl'>
      <Image group className='h-20 mb-4 -mt-16' />
      <h2 className='font-bold text-lg w-full border-b-2 pb-4 border-purple-1 mb-5'>
        {user.username}
      </h2>
      <div className='flex flex-col gap-3'>
        <Button onClick={makeAdmin} className='flex items-center gap-3'>
          <KeyIcon className='h-5 w-5' />
          Gjør til admin
        </Button>
        <Button
          onClick={removeMember}
          className={'flex items-center gap-3 bg-red-500 hover:bg-red-400'}
        >
          <TrashIcon className='h-5 w-5' />
          Slett medlem
        </Button>
      </div>
    </div>
  );
};
export default GroupUserSettings;
