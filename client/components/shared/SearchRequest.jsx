const SearchRequest = (props) => {

  return (
    <div className='bg-white p-8 rounded text-center'>
      <h2 className='font-bold text-xl mb-3 w-full border-b-2 pb-4 border-purple-1'>
        {props.group.groupname || props.user.username}
      </h2>
      <p className='mb-4'>Send forespørsel om medlemskap</p>
      <button onClick={props.onClick}>X</button>
      <button>V</button>
    </div>
  );
};
export default SearchRequest;
