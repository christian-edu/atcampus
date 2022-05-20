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
      className='flex flex-row items-center gap-1 p-2 outline outline-2 outline-purple-1 rounded text-purple-1'
    >
      <ArrowLeftIcon className='h-6 w-6 text-purple-1' />
      <span className='hidden lg:block'>Tilbake</span>
    </button>
  );
};
export default BackButton;
