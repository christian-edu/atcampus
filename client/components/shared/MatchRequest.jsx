import { XIcon, CheckIcon } from '@heroicons/react/solid';

const MatchRequest = (props) => {
  // Popup that shows when clicking on a user or group searching for group or user with criterias

  return (
    <div className='flex flex-col items-center bg-white p-8 rounded text-center shadow-xl'>
      <img
        src='https://i.ibb.co/4WTkXk5/Asset-1.png'
        alt='card-image'
        className='h-20 w-20 -mt-16 mb-2'
      />
      <h2 className='text-dark-1 font-bold text-xl w-full border-b-2 pb-4 border-purple-1'>
        {props.group?.groupname || props.user}
      </h2>
      <div className='flex flex-col gap-2 mt-6 mb-4'>
        <p className='text-dark-1 text-sm font-bold px-2 outline outline-1 outline-purple-1 outline-offset-1 rounded'>
          Skolenavn
        </p>
        <p className='text-dark-1 text-sm px-2 outline outline-1 outline-purple-1 outline-offset-1 rounded'>
          Fag: {props.group?.groupname}
        </p>
        <p className='text-dark-1 text-sm px-2 outline outline-1 outline-purple-1 outline-offset-1 rounded'>
          Gruppestørrelse:
        </p>
        <p className='text-dark-1 text-sm px-2 outline outline-1 outline-purple-1 outline-offset-1 rounded'>
          Karaktermål:
        </p>
        <p className='text-dark-1 text-sm px-2 outline outline-1 outline-purple-1 outline-offset-1 rounded'>
          Metode:
        </p>
        <p className='text-dark-1 text-sm px-2 outline outline-1 outline-purple-1 outline-offset-1 rounded'>
          Arbeidsfrekvens:
        </p>
      </div>

      <p className='mb-4 text-sm font-bold'>
        {props.group
          ? 'Send forespørsel om medlemskap'
          : 'Ønsker du å invitere til gruppen?'}
      </p>
      <div className='flex flex-row gap-6'>
        <button
          className='bg-dark-1 text-white p-2 rounded'
          onClick={props.onClick}
        >
          <XIcon className='h-6 w-6' />
        </button>
        <button className='bg-gradient-left text-white p-2 rounded'>
          <CheckIcon className='h-6 w-6' />
        </button>
      </div>
    </div>
  );
};
export default MatchRequest;
