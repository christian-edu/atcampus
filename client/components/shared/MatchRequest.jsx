const MatchRequest = (props) => {

  // Popup som vises når man søker etter gruppe basert på kriterer

  return (
    <div className='bg-white p-8 rounded text-center'>
      <h2 className='font-bold text-xl mb-3 w-full border-b-2 pb-4 border-purple-1'>
        {props.group.groupname || props.user}
      </h2>
      <p className='mb-4'>{props.group ? "Send forespørsel om medlemskap" : "Ønsker du å invitere til gruppen?"}</p>
      <button onClick={props.onClick}>X</button>
      <button>V</button>
    </div>
  );
};
export default MatchRequest;
