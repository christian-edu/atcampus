import { XIcon, CheckIcon } from "@heroicons/react/solid";
import Image from "./Image";

const SearchRequest = ({ group, user, onClick }) => {
  // Popup that shows when clicking on a user or group while searching for user or group by name

  return (
    <div className="flex flex-col items-center bg-white p-8 rounded text-center shadow-xl">
      <Image group className="h-20 mb-4 -mt-16" />
      <h2 className="text-dark-1 font-bold text-xl mb-3 w-full border-b-2 pb-4 border-purple-1">
        {group?.name || user}
      </h2>
      <p className="mb-4">
        {group
          ? "Send forespørsel om medlemskap?"
          : "Ønsker du å invitere til gruppen?"}
      </p>
      <div className="flex flex-row gap-6">
        <button
          className="bg-dark-2 text-white p-2 rounded hover:bg-dark-3"
          onClick={onClick}
        >
          <XIcon className="h-6 w-6" />
        </button>
        <button className="bg-gradient-left text-white p-2 rounded hover:bg-purple-2">
          <CheckIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};
export default SearchRequest;
