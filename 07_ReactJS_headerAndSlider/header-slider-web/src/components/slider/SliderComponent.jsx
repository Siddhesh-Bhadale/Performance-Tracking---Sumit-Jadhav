
import React, { useState, useEffect, } from "react";
import "../../scss/components/sliderComponent.scss"
import { slideImagesArr } from "../../utils/StaticData";
import Slide from "./component/Slide.jsx";
import DotsNButton from "./component/DotsNButton.jsx";


const SliderComponent = () => {
    const [imageSlides, setImageSlides] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    // Set slides when componet Start mounting
    useEffect(() => {
        setImageSlides(slideImagesArr);
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) =>
                prevIndex === slideImagesArr.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);
        return () => clearInterval(interval)
    }, []);
    const handlePreviousClick = () => {
        setActiveIndex((prev) => prev === 0 ? slideImagesArr.length - 1 : prev - 1)
    }
    const handleNextClicke = () => {
        setActiveIndex((prev) => prev === slideImagesArr.length - 1 ? 0 : prev + 1)
    }

    return (
        <section data-component="bannerSlider">
            <Slide
                slides={slideImagesArr}
                activeIndex={activeIndex}
            />
            <DotsNButton
                activeIndex={activeIndex}
                slides={slideImagesArr}
                onClick={(e) => setActiveIndex(e)}
                isDotVisible={true}
                onClickLeft={handlePreviousClick}
                onClickRight={handleNextClicke}
            />
        </section>
    );
};


export default SliderComponent;


