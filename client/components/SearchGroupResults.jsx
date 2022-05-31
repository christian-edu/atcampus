import GroupCard from "./shared/GroupCard";
import { useLocation } from "react-router-dom";
import { motion } from 'framer-motion';

const SearchGroupResults = () => {
  const location = useLocation();

  const groupResult = location.state.groupResult;

  var result = [];

  for (var i in groupResult) {
    result.push([i, groupResult[i]]);
  }
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.2
      }
    }
  }
  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  }

  return (
    <motion.div
    variants={container}
    initial="hidden"
    animate="show"
    className="bg-white text-dark-1 p-6 rounded-standard"
    >
      <h2 className="font-bold text-xl mb-8">Søkeresultater</h2>
      <motion.ul
      className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
      variants={item}
      >
        {result.map((group) => (
          <GroupCard
            match={true}
            group={group[1].group}
            score={group[1].score}
          />
        ))}
      </motion.ul>
    </motion.div>
  );
};

export default SearchGroupResults;
