import { useEffect, useState } from 'react';
import GroupCard from './shared/GroupCard';
import GroupCriteriaPage from './GroupCriteriaPage';
import { motion, AnimatePresence } from 'framer-motion';

const SearchGroup = () => {
  const [groups, setGroups] = useState([]);
  const [input, setInput] = useState('');

  const inputHandler = (e) => setInput(e.target.value);

  useEffect(() => {
    const getGroups = async () => {
      const res = await fetch('/api/v1/groups');
      const data = await res.json();
      setGroups(data);
    };

    getGroups();
  }, []);

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <>
      <div className='grid grid-cols-1 gap-4 bg-white text-dark-1 p-6 rounded-standard mb-6 max-w-2xl mx-auto'>
        <div>
          <h2 className='text-xl font-bold'>Søk etter gruppenavn</h2>
        </div>
        <div>
          <label htmlFor='groupName'>Gruppenavn</label>
          <input
            type='text'
            id='groupName'
            placeholder='Smidig Prosjekt'
            className='w-full p-2 border border-purple-3 rounded-standard bg-dark-6 mt-2'
            onChange={inputHandler}
          />
        </div>
        <ul className='grid gap-4'>
          <AnimatePresence>
            {input && filteredGroups.length === 0 && (
              <motion.p
                key='text-empty'
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className='text-dark-3'
              >
                Ingen grupper å vise
              </motion.p>
            )}
            {input && filteredGroups.length > 0 && (
              <>
                <motion.h4
                  key='text-search'
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className='text-dark-3'
                >
                  Trykk på en gruppe for å sende forespørsel
                </motion.h4>
                {filteredGroups.map((group) => (
                  <motion.li
                    key={group.uuid}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <GroupCard group={group} search={true} />
                  </motion.li>
                ))}
              </>
            )}
          </AnimatePresence>
        </ul>
      </div>

      <div className='grid grid-cols-1 gap-4 bg-white text-dark-1 p-6 rounded-standard mb-6 max-w-2xl mx-auto'>
        <div className='flex flex-col gap-8'>
          <GroupCriteriaPage lookingForGroup={true} />
        </div>
      </div>
    </>
  );
};

export default SearchGroup;
