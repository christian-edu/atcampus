import { useLocation } from 'react-router-dom';
import GroupCriteriaPage from './GroupCriteriaPage';
import Button from './shared/Button';
import { groupCriterias } from '../services/criterias';

import { useState } from 'react';

export function ShowCriteriaPage() {
  const [editCriteria, setEditCriteria] = useState(false);

  const location = useLocation();
  const group = location.state.group;

  const { criteria } = group;

  const criterias = groupCriterias(criteria);

  return (
    <div className='bg-white p-6 text-dark-1 max-w-2xl mx-auto rounded-standard'>
      <div className='grid grid-cols-1 md:grid-cols-3'>
        <Button
          onClick={() => setEditCriteria((show) => !show)}
          className='md:col-start-2 mb-10'
        >
          {editCriteria ? <h2>Vis kriterier</h2> : <h2>Endre kriterier</h2>}
        </Button>
      </div>

      {!editCriteria && (
        <>
          <h2 className='font-bold text-xl'>Gruppekriterier</h2>
          <ul className='flex flex-col gap-3 mt-6 mb-4'>
            {Object.entries(criterias).map((criteria) => (
              <li
                key={criteria[0]}
                className='text-sm px-2 outline outline-1 outline-purple-1 outline-offset-1 rounded'
              >
                <span className='font-bold'>{criteria[0]}: </span>
                {criteria[1]}
              </li>
            ))}
          </ul>
        </>
      )}

      {editCriteria && <GroupCriteriaPage editGroup={true} />}
    </div>
  );
}
