import React, { useState, useEffect, useRef, } from "react";
import "../../scss/components/sliderComponent.scss"
import { slideImagesArr } from "../../utils/StaticData";
import Slide from "./component/Slide.jsx";
import DotsNButton from "./component/DotsNButton.jsx";

const SliderComponent = () => {
    const [imageSlides, setImageSlides] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    // // auto slide
    // useEffect(() => {
    //     setImageSlides(slideImagesArr);
    //     const autoSlideTimer = setInterval(() => {
    //         setActiveIndex((currentIndex) => currentIndex === slideImagesArr.length - 1 ? 0 : currentIndex + 1);

    //     }, 5000);
    //     // Cleanup function to clear timer when component unmounts
    //     return () => {
    //         clearInterval(autoSlideTimer);
    //     }
    // }, [activeIndex]);
    // to get previous slide
    function handlePreviousClick() {
        setActiveIndex((currentIndex) => currentIndex === 0 ? slideImagesArr.length - 1 : currentIndex - 1)
    }

    // to get Next Slide
    function handleNextClick() {
        setActiveIndex((currentIndex) => currentIndex === slideImagesArr.length - 1 ? 0 : currentIndex + 1)
    }

    // to get specific slide 
    function handleDotClick(clickedIndex) {
        setActiveIndex(clickedIndex);
    }

    // ref

    return (
        <section data-component="bannerSlider">
            <Slide
                slides={slideImagesArr}
                activeIndex={activeIndex}
            />
            <DotsNButton
                activeIndex={activeIndex}
                slides={slideImagesArr}
                onClick={handleDotClick}
                isDotVisible={true}
                onClickLeft={handlePreviousClick}
                onClickRight={handleNextClick}
            />
        </section>
    );
};

export default SliderComponent;