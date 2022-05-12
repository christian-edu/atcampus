import { useCallback, useEffect, useState } from 'react';
import GroupCard from './shared/GroupCard';
import {useLocation} from "react-router-dom";

const SearchGroupResults = () => {


    const location = useLocation();

    const groupResult = location.state.groupResult;



  return (
    <div className='bg-white p-6 rounded border border-purple-4'>
      <h2 className='font-bold text-xl mb-8'>Søkeresultater</h2>
      <ul className='grid grid-cols-1 gap-4'>
        {groupResult.map((group) => (
          <GroupCard key={group.groupname} match={true} group={group} />
        ))}

      </ul>
    </div>
  );
};

export default SearchGroupResults;
