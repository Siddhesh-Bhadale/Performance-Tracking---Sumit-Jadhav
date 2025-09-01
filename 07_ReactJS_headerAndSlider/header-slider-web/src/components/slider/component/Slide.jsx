import React, { useEffect, useRef, useState } from 'react'
import '../../../scss/components/slides.scss'
import { fallbackImage } from '../../../utils/StaticData';

const Slide = ({ slides, activeIndex }) => {
    // states for an mouse Event 
    const [isDragged, setIsDragged] = useState(false);
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);
    const [prevTranslate, setPrevTranslate] = useState(0);
    const sliderRef = useRef();
    const trackRef = useRef();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [currentSlide, setCurrentSlide] = useState(0)


    const moveTOSlide = (index) => {
        const offset = -index * windowWidth;
        console.log("our Widoews offset", offset)
        trackRef.current.style.transition = 'transform 0.3s ease'
        trackRef.current.style.transition = `translateX(${offset}px)`;
    }
    useEffect(() => {
        setWindowWidth(window.innerWidth)
        window.addEventListener('resize', moveTOSlide)
        return () => {
            window.removeEventListener('resize', moveTOSlide);
        }
    }, [])

    console.log(windowWidth)

    // function that will move the selected slide


    // const slider = document.getElementById('slider');
    // const track = document.getElementById('track');


    //Call a function when pressing a mouse button over a element
    function handleMouseDown(e) {
        setIsDragged(true);
        setStartX(e.pageX);
        // console.log("you clicked on this X-axis: - ", startX)
        track.style.transition = 'none'
        // add event listner here  
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

    }

    //Call a function when moving the mouse pointer over a element
    function handleMouseMove(e) {
        // check if false then return from here dont run this fn
        if (!isDragged) return;
        const x = e.pageX;
        const dx = x - startX;
        setCurrentX(prevTranslate + dx);
        // console.log("after selected element ouse postion of x-axis", currentX)
        track.style.transform = `translateX(${currentX}px)`;
        // Attach global event listeners

    }
    //Call a function when releasing a mouse button over a
    function handleMouseUp(e) {
        if (!isDragged) return;
        setIsDragged(false);


        //---- condion for drag
        // Move to next or previous if moved more than 50%
        if (currentX < -windowWidth / 2 && currentSlide < 2) {
            setCurrentSlide((prev) => prev + 1)
        } else if (currentX > windowWidth / 2 && currentSlide > 0) {
            setCurrentSlide((prev) => prev - 1)
        }


        setPrevTranslate(currentX);

        track.style.transition = 'transform 0.3s ease';
        track.style.transform = `translateX(${currentX}px)`;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);

    }
    // this is function just for seting user selction none for images selection 
    function handlePreventTextSelection(e) {
        if (e.target.closest('.slide-image')) {
            e.preventDefault();
        }
    }
    function handleImageError(e) {
        e.target.src = fallbackImage;
    }

    useEffect(() => {
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }
    }, [])

    return (
        <div data-component="slides"
            ref={sliderRef}
            id='slider'
            onMouseDown={(e) => {
                handleMouseDown(e);
                handlePreventTextSelection(e)
            }}
            onMouseMove={(e) => { handleMouseMove(e) }}
            onMouseUp={(e) => { handleMouseUp(e) }}
        >
            <div
                ref={trackRef}
                id='track'
                className="slides-container"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
                {slides?.map((imageUrl, index) => (
                    <div key={index} className="slide-item">
                        <img
                            src={imageUrl || fallbackImage}
                            alt={`Slide ${index + 1}`}
                            onError={handleImageError}
                            className="slide-image"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Slide;