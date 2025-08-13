import React from "react";
import "../../scss/component/banner.scss";

const BannerSlider = () => {
  let object = {};
  return (
    <div className="Banner-container">
      <div className="Banner-card">
        <div className="anime-title">
          <label className="title-heading">DANMACHI</label>
          <label className="anime-subTitle">FAMILIA MYTH ||</label>
        </div>
        <button className="watch-Btn"> Watch now</button>
      </div>
    </div>
  );
};

export default BannerSlider;
