import React from "react";

const VideoCard = ({ image, title, description }) => {
  return (
    <div data-component="VideoCard">
      <img className="leftImage" src={image} alt="videoImage" />
      <div className="rightContainer">
        <span>{title}</span>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default VideoCard;
