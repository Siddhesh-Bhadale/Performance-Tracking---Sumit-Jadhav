import React from "react";
import "../../scss/component/streamingCard.scss";

const StreamingCard = ({ name, image, isCircle = false, role }) => {
  //   console.log("image", image);
  return (
    <div data-component="StreamingCards">
      {isCircle === true ? (
        <div className="StreamingCard1">
          <img src={image} className="image" alt="" />
          <div className="description">
            <span>{name}</span>
          </div>
        </div>
      ) : (
        <div className="StreamingCard2">
          <img src={image} className="squre-image" alt="" />
          <div className="description">
            <span>{name}</span>
            {/* <span>{role}</span> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default StreamingCard;
