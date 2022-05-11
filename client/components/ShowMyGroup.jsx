import { useLocation, useNavigate } from "react-router-dom";

const ShowMyGroup = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const group = location.state.group;

  return (
    <div>
      <h2>{group.groupname}</h2>
      <h2>Chat</h2>
      <h2>Møtekalender</h2>
      <h2>Notater</h2>
      <button onClick={() => navigate('/group/members', { state: { group } })}>
        Medlemmer
      </button>
    </div>
  );
};

export default ShowMyGroup;
