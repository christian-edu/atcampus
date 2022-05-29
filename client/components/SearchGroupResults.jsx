import GroupCard from "./shared/GroupCard";
import { useLocation } from "react-router-dom";

const SearchGroupResults = () => {
  const location = useLocation();

  const groupResult = location.state.groupResult;

  var result = [];

  for (var i in groupResult) {
    result.push([i, groupResult[i]]);
  }

  console.log("in search results");
  console.log(result[0][1].group);

  return (
    <div className="bg-white p-6 rounded-standard">
      <h2 className="font-bold text-xl mb-8">Søkeresultater</h2>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {result.map((group) => (
          <GroupCard match={true} group={group[1].group} />
        ))}
      </ul>
    </div>
  );
};

export default SearchGroupResults;
