import React from "react";
import "../../scss/component/videoCard.scss";

const VideoCard = ({ image, title, description }) => {
  return (
    <div data-component="VideoCard">
      <img className="leftImage" src={image} alt="videoImage" />
      <div className="rightContainer">
        <span>{title || "Titile of the movie"}</span>
        <p>
          {description ||
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
        </p>
      </div>
    </div>
  );
};

export default VideoCard;
// import "../../scss/component/banner.scss";
// import React, { useState, useEffect } from "react";


// const BannerSlider = ({ slides = [] }) => {
//  const [activeIndex, setActiveIndex] = useState(0);


//  // Auto slide every 3s (optional)
//  useEffect(() => {
//    const interval = setInterval(() => {
//      setActiveIndex((prevIndex) =>
//        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
//      );
//    }, 3000);
//    return () => clearInterval(interval);
//  }, [slides.length]);


//  const SliderContent = ({ activeIndex, slides }) => {
//    return (
//      <div className="banner-container">
//        {slides.map((item, index) => (
//          <div
//            key={index}
//            className={`slide ${index === activeIndex ? "active" : "inactive"}`}
//          >
//            <img
//              src={item.Banner_url}
//              className="slide-image"
//              alt={`Banner-${index}`}
//            />
//            <div className="anime-title">
//              <label className="title-heading">
//                {item.title || "Default Title"}
//              </label>
//              <label className="anime-subTitle">
//                {item.subTitle || "Default Subtitle"}
//              </label>
//            </div>
//            <button className="watch-btn">Watch now</button>
//          </div>
//        ))}
//      </div>
//    );
//  };


//  const Dots = ({ activeIndex, onClick, slides }) => {
//    return (
//      <div className="dots-container">
//        {slides.map((_, index) => (
//          <span
//            key={index}
//            className={`dot ${activeIndex === index ? "active-dot" : ""}`}
//            onClick={() => onClick(index)}
//          ></span>
//        ))}
//      </div>
//    );
//  };


//  return (
//    <div className="slider-container">
//      <SliderContent activeIndex={activeIndex} slides={slides} />
//      <Dots
//        activeIndex={activeIndex}
//        slides={slides}
//        onClick={(index) => setActiveIndex(index)}
//      />
//    </div>
//  );
// };


// export default BannerSlider;


