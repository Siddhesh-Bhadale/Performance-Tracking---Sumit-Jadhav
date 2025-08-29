import React, { useState } from 'react'
import '../../../scss/components/slides.scss'

const Slide = ({ slides, activeIndex }) => {
    const fallbackImage = 'https://cdn.lazyshop.com/files/d2c4f2c8-ada5-455a-86be-728796b838ee/other/192115ca73ec8c98c62e3cbc95b96d32.jpg'
    const imageContainer = document.getElementById('imageContainer')
    const url = imageContainer?.style?.backgroundImage;
    const [imageSlides, setImageSlides] = useState(slides)
    console.log("Images", imageSlides)

    const handleError = (e) => {
        e.target.src = fallbackImage
    }

    return (
        <div data-component="slides" >
            {slides?.map((item, index) => (
                <img key={index}
                    id='imageContainer'
                    className={`banner-container ${index === activeIndex ? 'active' : 'inactive'}`}
                    src={item ? item : fallbackImage}
                    onError={handleError}
                // onError={}
                >
                </img>)
            )}
        </ div>
    )
}
export default Slide;