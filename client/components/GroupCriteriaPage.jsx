import { GroupCriteria } from './shared/GroupCriteria';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const GroupCriteriaPage = ({createdGroup, lookingForGroup, editGroup}) => {
  // Side for å sette opp gruppekriterier når du oppretter gruppe eller går på gruppeinnstillinger og velger gruppekriterier


    const [groupname, setGroupName] = useState("");

    const location = useLocation();

  if (lookingForGroup) {
    return (
      <GroupCriteria
        title={'Søk etter gruppekriterier'}
        buttonText={'Søk etter kriterier'}
        fetchLink={'/api/v1/groups/search'}
        searchGroup={true}
      />
    );
  }

  if (createdGroup) {
    return (
      <div className='bg-white p-6 grid gap-4 rounded-standard max-w-2xl mx-auto text-dark-1'>
        <h2 className='text-xl font-bold'>Opprett gruppe</h2>
        <form>
          <label>Gruppenavn:</label>
          <div className='mb-6'>
            <input
              type='text'
              className='w-full p-2 border border-purple-3 rounded-standard bg-dark-6 mt-2'
              value={groupname}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
        </form>
        <GroupCriteria
          title={'Legg til kriterier i din nye gruppe'}
          buttonText={'Opprett gruppe'}
          fetchLink={'/api/v1/groups'}
          groupName={groupname}
          createGroup={true}
        />
      </div>
    );
  }

   if(editGroup){
       const {group} = location.state


       return <div className='bg-white p-6 text-dark-1 max-w-xl mx-auto rounded-standard'>
           <GroupCriteria title={"Endre kriterier på gruppen din"} buttonText={"Endre kriterier"} patchGroup={true} fetchLink={"/api/v1/groups"} groupName={groupname} group={group} />
       </div>

   }

};
export default GroupCriteriaPage;
