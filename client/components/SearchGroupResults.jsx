import GroupCard from "./shared/GroupCard";
import { useLocation } from "react-router-dom";

const SearchGroupResults = () => {
  const location = useLocation();

  const groupResult = location.state.groupResult;

  return (
    <div className="bg-white p-6 rounded-standard">
      <h2 className="font-bold text-xl mb-8">Søkeresultater</h2>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {/*{groupResult.map((group) => (
          <GroupCard key={group.name} match={true} group={group} />
          // Legge til ett group criteria card
        ))}*/}
      </ul>
    </div>
  );
};

export default SearchGroupResults;
