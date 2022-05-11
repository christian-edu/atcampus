const GroupCard = (props) => {
  const { groupname, members } = props.group;

  return (
    <div
      className='bg-white flex items-center p-6 rounded-standard border border-purple-4 cursor-pointer'
      onClick={props.onClick}
    >
      <div>
        <h2 className='font-bold'>{groupname}</h2>
        <p>Medlemmer: {members.length}</p>
      </div>
    </div>
  );
};
export default GroupCard;
