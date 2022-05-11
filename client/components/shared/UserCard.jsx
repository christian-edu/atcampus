import { DotsHorizontalIcon, PlusIcon } from '@heroicons/react/solid';

const UserCard = (props) => {
  const classes = `h-6 w-6 text-purple-1`;

  const clickHandler = () => {
    props.onClick();
  };

  return (
    <li className='bg-white flex items-center p-6 rounded-standard border border-purple-4'>
      <h2 className='font-bold'>{props.user}</h2>
      <button onClick={clickHandler} className='ml-auto'>
        {props.edit ? (
          <DotsHorizontalIcon className={classes} />
        ) : (
          <PlusIcon className={classes} />
        )}
      </button>
    </li>
  );
};
export default UserCard;
