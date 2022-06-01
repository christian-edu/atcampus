import { Link, useParams } from "react-router-dom";
import Modal from "./shared/Modal";
import GroupSettings from "./shared/GroupSettings";
import { useContext, useState } from "react";
import {
  CalendarIcon,
  ChatIcon,
  CogIcon,
  MenuAlt1Icon,
  UserGroupIcon,
} from "@heroicons/react/solid";
import Image from "./shared/Image";
import Breadcrumbs from "./shared/Breadcrumbs";
import { UserGroupsContext } from "../store/UserGroupsContext";
import { motion } from "framer-motion";

const GroupPage = () => {
  const [showSettings, setShowSettings] = useState(false);

  const { getGroupById } = useContext(UserGroupsContext);

  const params = useParams();

  const group = getGroupById(params.id);

  const toggleSettings = () => setShowSettings((showSettings) => !showSettings);

  const visible = group?.isPrivate ? "Privat" : "Offentlig";

  return (
    <>
      <Breadcrumbs />
      <div className="bg-white p-6 max-w-xl mx-auto rounded-standard">
        <motion.div
          initial={{ opacity: 0}}
          animate={{ opacity: 1}}
        >
          <div className="flex flex-row gap-4">
            <Image className="h-16" group />
            <div>
              <h2 className="text-dark-1 text-xl font-bold">{group?.name}</h2>
              <h4 className="font-bold text-dark-3 mb-8">({visible})</h4>
            </div>
            <Modal show={showSettings} onClick={toggleSettings}>
              <GroupSettings onClick={toggleSettings} group={group} />
            </Modal>
            <CogIcon
              onClick={toggleSettings}
              className="text-dark-1 h-6 w-6 cursor-pointer ml-auto hover:rotate-[10deg] hover:text-purple-1 duration-1000"
            />
          </div>
          <ul className="grid gap-4 text-md text-dark-1">
            <li className="border-b-2 border-purple-1 hover:bg-dark-6">
              <Link to="chat" className="flex gap-2 items-center text-lg py-4">
                <ChatIcon className="h-6 text-purple-1" />
                Chat
              </Link>
            </li>
            <li className="border-b-2 border-purple-1 hover:bg-dark-6">
              <Link to="/" className="flex gap-2 items-center text-lg py-4">
                <CalendarIcon className="h-6 text-purple-1" />
                Møtekalender
              </Link>
            </li>
            <li className="border-b-2 border-purple-1 hover:bg-dark-6">
              <Link to="/" className="flex gap-2 items-center text-lg py-4">
                <MenuAlt1Icon className="h-6 text-purple-1" />
                Notater
              </Link>
            </li>
            <li className="border-b-2 border-purple-1 hover:bg-dark-6 cursor-pointer">
              <Link
                to="members"
                className="flex gap-2 items-center text-lg py-4"
              >
                <UserGroupIcon className="h-6 text-purple-1" />
                Medlemmer
              </Link>
            </li>
          </ul>
        </motion.div>
      </div>
    </>
  );
};

export default GroupPage;
