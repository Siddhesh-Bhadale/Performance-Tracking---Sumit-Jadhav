import React, { useState, useEffect, useRef, } from "react";
import "../../scss/components/sliderComponent.scss"
import { slideImagesArr } from "../../utils/StaticData";
import Slide from "./component/Slide.jsx";
import DotsNButton from "./component/DotsNButton.jsx";
import { startAutoSlide } from "../../utils/utils.jsx";

const SliderComponent = () => {
    const [imageSlides, setImageSlides] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [mouseEndDrag, setmouseEndDrag] = useState(false)


    const autoSliderTimer = useRef(null);

    function restartAutoSlide() {
        setTimeout(() => {
            startAutoSlide(autoSliderTimer, setActiveIndex)
        }, 5000)
    }



    function stopAutoSlide() {
        if (autoSliderTimer.current) {
            clearInterval(autoSliderTimer.current);
            //clear referwnce to so we can use him again as fresh
            autoSliderTimer.current = null;
        }
    }

    // It will run only once no need to give him depencey array because this time we handle timer and clear the reference so it will run  properly 
    useEffect(() => {
        setImageSlides(slideImagesArr);
        startAutoSlide(autoSliderTimer, setActiveIndex);
        handleMouseStatus();
        return (() => {
            stopAutoSlide()
        })
    }, [mouseEndDrag]);


    // to get previous slide
    function handlePreviousClick() {
        stopAutoSlide();
        setActiveIndex((currentIndex) => currentIndex === 0 ? slideImagesArr.length - 1 : currentIndex - 1)
        restartAutoSlide();
    }

    // to get Next Slide
    function handleNextClick() {
        stopAutoSlide();
        setActiveIndex((currentIndex) => currentIndex === slideImagesArr.length - 1 ? 0 : currentIndex + 1)
        restartAutoSlide()
    }

    // to get specific slide 
    function handleDotClick(clickedIndex) {
        stopAutoSlide();
        setActiveIndex(clickedIndex);
        restartAutoSlide();
    }

    // handle auto slide when user drag
    function handleUserDragStart() {
        stopAutoSlide()

    }

    // handle user DragEnd 
    function handleUserDragEnd(newSlideIndex) {

        setActiveIndex(newSlideIndex);
        restartAutoSlide();

    }

    // function that check if user relly clicked or not or its just mouse on that contianer
    function handleMouseStatus() {
        if (mouseEndDrag === false) {
            restartAutoSlide();
        }
    }

    return (
        <section data-component="bannerSlider">
            <Slide
                slides={slideImagesArr}
                activeIndex={activeIndex}
                onDragStart={handleUserDragStart}
                onDragEnd={(e) => handleUserDragEnd(e)}
                mouseStatus={setmouseEndDrag}
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