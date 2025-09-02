import { fallbackImage, slideImagesArr } from "./StaticData";

export function handleImageError(e) {
    e.target.src = fallbackImage;
}

//calculate slide Width 
export function calculateSlideWidth(track) {
    if (!track.current) return window.innerWidth;
    let gapSize = 16;
    if (window.innerWidth >= 768) {
        gapSize = 16; // desktop and tablet
    } else {
        gapSize = 8 // mobile
    }

    return track.current.offsetWidth + gapSize
}

// start Auto Slide 

export function startAutoSlide(autoSliderTimer, setActiveIndex) {
    if (autoSliderTimer.current) {
        clearInterval(autoSliderTimer.current)
    }

    autoSliderTimer.current = setInterval(() => {
        setActiveIndex((currentIndex) => currentIndex === slideImagesArr.length - 1 ? 0 : currentIndex + 1);
    }, 5000)
}
