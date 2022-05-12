import {
  XIcon,
  CheckIcon
} from "@heroicons/react/solid";

const MatchRequest = (props) => {

  // Popup som vises når man søker etter gruppe basert på kriterer

  return (
    <div className='flex flex-col items-center bg-white p-8 rounded text-center shadow-xl'>
      <h2 className='text-dark-1 font-bold text-xl mb-3 w-full border-b-2 pb-4 border-purple-1'>
        {props.group.groupname || props.user}
      </h2>
      <p>Kriterier</p>
      <p className='mb-4'>{props.group ? "Send forespørsel om medlemskap" : "Ønsker du å invitere til gruppen?"}</p>
      <div className="flex flex-row gap-6">
        <button className="bg-dark-1 text-white p-2 rounded" onClick={props.onClick}>
          <XIcon className="h-6 w-6"/>
        </button>
        <button className="bg-gradient-left text-white p-2 rounded">
          <CheckIcon className="h-6 w-6"/>
        </button>
      </div>
      
    </div>
  );
};
export default MatchRequest;
