import UserCard from "./shared/UserCard";
import Button from "./shared/Button";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "./shared/Breadcrumbs";
import { useContext } from "react";
import { UserGroupsContext } from "../store/UserGroupsContext";
import { motion } from "framer-motion";
import { UserInfoContext } from "../App";

const GroupMembers = () => {
  const params = useParams();

  const { getGroupById } = useContext(UserGroupsContext);

  const group = getGroupById(params.id);

  const user = useContext(UserInfoContext);

  const navigate = useNavigate();

  const isAdmin = group?.groupMembers.find(
    (m) => m.user_uuid === user.uuid
  )?.isAdmin;

  return (
    <>
      <Breadcrumbs />
      <div className="bg-white p-6 rounded max-w-xl mx-auto text-dark-1">
        <h2 className="font-bold text-xl mb-8">Medlemmer</h2>
        <ul className="grid grid-cols-1 gap-4 mb-8">
          {group?.groupMembers.map((member) => (
            <motion.li
              key={member.user_uuid}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <UserCard edit={isAdmin} user={member} userGroup={group} />
            </motion.li>
          ))}
        </ul>
        <div className="grid grid-cols-1 md:grid-cols-3">
          <Button to="search" className="md:col-start-2">
            + Legg til medlem
          </Button>
        </div>
      </div>
    </>
  );
};

export default GroupMembers;
