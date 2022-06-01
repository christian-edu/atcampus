import { PlusIcon } from "@heroicons/react/solid";
import { useState } from "react";
import Modal from "./Modal";
import SearchRequest from "./SearchRequest";
import MatchRequest from "./MatchRequest";
import { UserGroupIcon, LockClosedIcon } from "@heroicons/react/solid";
import { LockOpenIcon } from "@heroicons/react/outline";
import Image from "./Image";
import React from "react";
import { motion } from 'framer-motion';

const GroupCard = ({ group, onClick, match, search, score }) => {
  // Group Card component

  if (score === 0) {
    score = "0";
  }
  // classes for private icon
  const privateIconClasses = "h-4 absolute top-4 right-4 text-dark-3";

  // State for modals
  const [modalIsVisible, setModalIsVisible] = useState(false);

  // Recieves group as props // <GroupCard group={group} />
  const { name, groupMembers, isPrivate } = group;

  // Render cloesed icon if group is private, render open icon is group is not private
  const privateIcon = isPrivate ? (
    <LockClosedIcon className={privateIconClasses} />
  ) : (
    <LockOpenIcon className={privateIconClasses} />
  );

  // Toggle modal window
  const clickHandler = () => {
    // If component recives onClick as a prop it will return props.onClick and not render modal windows
    if (onClick) return onClick();
    setModalIsVisible((state) => !state);
  };

  return (
    <>
      <Modal show={modalIsVisible && search} onClick={clickHandler}>
        <SearchRequest onClick={clickHandler} group={group} />
      </Modal>
      <Modal show={modalIsVisible && match} onClick={clickHandler}>
        <MatchRequest onClick={clickHandler} group={group} />
      </Modal>

      <div
        className="bg-white flex flex-col gap-4 p-6 my-3 rounded-standard border border-purple-4 cursor-pointer hover:drop-shadow-xl duration-300"
        onClick={clickHandler}
      >
        {score ? 
              <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.8, delay: 0.4}}
              className="bg-gradient-left text-sm text-white px-2 py-1 text-center rounded-full w-24 whitespace-nowrap -mt-10 mx-auto drop-shadow-[0_3px_15px_rgba(127,124,202,0.50)]">
              <p><span className="font-bold">{score}%</span> match</p> 
              </motion.div>
              : <></>}
        <div className="flex items-center gap-2">
          <Image group className="h-14" />
          <div>
            <h3 className="text-dark-1 text-lg font-bold">{name}</h3>
            <div className="flex flex-row items-center text-dark-3 mt-2">
              <UserGroupIcon className="h-5 w-5 mr-2" />

              <p className="text-md">Medlemmer: {groupMembers.length}</p>
            </div>

            
          </div>
          {/* Render plus icon if search or match is true */}
          {(search || match) && (
            <PlusIcon className="h-6 text-purple-1 ml-auto" />
          )}

          {!(search || match) && privateIcon}
        </div>
        
      </div>
    </>
  );
};
export default GroupCard;
