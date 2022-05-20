import React from "react";

const Image = ({ group, className }) => {
  // Dummy component

  const randomNumber = () => Math.round(Math.random() * 3) + 1;

  console.log(randomNumber());

  const path = `https://res.cloudinary.com/dplcm73vn/image/upload/v1652214917/atcampus/${
    group ? "group" : "user"
  }/${randomNumber()}.jpg`;

  return (
    <img
      src={path}
      className={`rounded-full border-2 border-purple-1 ${className}`}
      alt="group image"
    />
  );
};
export default Image;
