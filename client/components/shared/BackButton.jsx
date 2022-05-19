import { ArrowLeftIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  const backButtonHandler = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={backButtonHandler}
      className='flex flex-col items-center p-2 outline outline-2 outline-purple-1 rounded text-white '
    >
      <ArrowLeftIcon className='h-6 w-6 text-purple-1' />
    </button>
  );
};
export default BackButton;
