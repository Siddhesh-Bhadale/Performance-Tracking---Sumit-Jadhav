import React from "react";
import "../../scss/component/animeCard.scss";
import animeImg from "../../assets/images/dummyAnime.jpg";
const AnimeCard = ({ animeImg, description }) => {
  const totalStars = ["☆", "☆", "☆", "☆", "☆"];
  const filledStars = 0;
  const getStar = (rating) => {
    //Its going to hold the response
    const starArray = [];
    const fullStars = Math.floor(rating);
    const hasHalfStars = rating % 10 >= 0.5; // --- it will always give result in 0.0 to 0.9

    // for filling th full stars inside the Array
    Array(fullStars)
      .fill(0)
      .forEach((item, index) =>
        starArray.push({ type: "full", id: "full-stars" })
      );
    // for filling the half stars in the array
    if (hasHalfStars) {
      starArray.push({ type: "half", id: "half-stars" });
    }
  };
  return (
    <div className="card-Container">
      <div className="Image-container">
        <img src={animeImg} className="anime-poster" alt="animePoster" />
      </div>
      <p className="animeDescription">{description}</p>
      <div className="rating-contianer">
        {totalStars.map((item, index) => {
          return (
            <div className="Stars" key={index}>
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnimeCard;
