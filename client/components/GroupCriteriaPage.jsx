import { GroupCriteria } from './shared/GroupCriteria';

const GroupCriteriaPage = ({createdGroup, lookingForGroup, editGroup}) => {
  // Side for å sette opp gruppekriterier når du oppretter gruppe eller går på gruppeinnstillinger og velger gruppekriterier
  // Midlertidig


   if(lookingForGroup){

        return <GroupCriteria title={"Søk etter gruppekriterier"} buttonText={"Søk etter kriterier"} fetchLink={"/api/v1/groups/search"} />
    }

   // need to fetch a different link when we create a group and when we edit a group

   if(createdGroup){
       return (
           <div className='bg-white p-6'>
               <GroupCriteria title={"Legg til kriterier i din nye gruppe"} buttonText={"Legg til kriterier"} dontShowButton={true} />
           </div>
       );
   }

   if(editGroup){
       return <div className='bg-white p-6'>
           <GroupCriteria title={"Endre kriterier på gruppen din"} buttonText={"Endre kriterier"} />
       </div>

   }

};
export default GroupCriteriaPage;
