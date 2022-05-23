import {
    XIcon,
    CheckIcon,
    KeyIcon,
    TrashIcon
} from '@heroicons/react/solid';
import Image from './Image';

const GroupUserSettings = () => {
  // Popup som vises når man trykker på et gruppemedlem

  return (
    <div className='flex flex-col items-center bg-white text-dark-1 p-8 rounded text-center shadow-xl'>
      <Image group className='h-20 mb-4 -mt-16' />
    <h2 className='font-bold text-lg w-full border-b-2 pb-4 border-purple-1'>
        Brukernavn
    </h2>
    <div>
        
    </div>

    </div>
  );
};
export default GroupUserSettings;
