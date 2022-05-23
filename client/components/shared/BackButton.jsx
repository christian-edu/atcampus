import { ArrowLeftIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  // Component for Back button
  
  const navigate = useNavigate();

  const backButtonHandler = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={backButtonHandler}
      className='flex flex-row items-center gap-1 p-2 outline outline-1 outline-dark-3 rounded text-dark-3 hover:bg-white'
    >
      <ArrowLeftIcon className='h-6 w-6 text-dark-3' />
      <span className='hidden lg:block'>Tilbake</span>
    </button>
  );
};
export default BackButton;
