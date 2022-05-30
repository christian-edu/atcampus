import { PlusIcon } from "@heroicons/react/solid";
import { useState } from "react";
import Modal from "./Modal";
import SearchRequest from "./SearchRequest";
import MatchRequest from "./MatchRequest";
import { UserGroupIcon, LockClosedIcon } from "@heroicons/react/solid";
import { LockOpenIcon } from "@heroicons/react/outline";
import Image from "./Image";
import React from "react";

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
        className="bg-white flex items-center gap-2 relative p-6 rounded-standard border border-purple-4 cursor-pointer hover:drop-shadow-xl duration-300"
        onClick={clickHandler}
      >
        <Image group className="h-14" />
        <div>
          <h3 className="text-dark-1 text-lg font-bold">{name}</h3>
          <div className="flex flex-row items-center text-dark-3 mt-2">
            <UserGroupIcon className="h-5 w-5 mr-2" />

            <p className="text-md">Medlemmer: {groupMembers.length}</p>
          </div>
          {score ? <h2>{score}% match</h2> : <></>}
        </div>
        {/* Render plus icon if search or match is true */}
        {(search || match) && (
          <PlusIcon className="h-6 text-purple-1 ml-auto" />
        )}

        {!(search || match) && privateIcon}
      </div>
    </>
  );
};
export default GroupCard;
