import { useLocation } from "react-router-dom";

const GroupMembers = () => {
  const location = useLocation();

  const group = location.state.group;

  return (
    <div>
      <h2>Medlemmer</h2>
      <ul>
        {group.members.map((member) => (
          <div key={member}>
            <li>{member}</li>
          </div>
        ))}
      </ul>
      <button>+ Legg til medlem</button>
    </div>
  );
};

export default GroupMembers;
