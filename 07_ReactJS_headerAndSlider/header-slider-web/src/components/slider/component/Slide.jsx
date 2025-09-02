import React, { useRef, useState, useEffect } from 'react'
import '../../../scss/components/slides.scss'
import { calculateSlideWidth, handleImageError } from '../../../utils/utils'

const Slide = ({ slides, activeIndex, onDragStart, onDragEnd, mouseStatus }) => {

    const sliderRef = useRef(null)
    const trackRef = useRef(null)

    const [isDragging, setIsDragging] = useState(false)
    const [dragStartX, setDragStartX] = useState(0)
    const [currentSlideIndex, setCurrentSlideIndex] = useState(activeIndex || 0)
    // const [mouseDragStopped, setMouseDraggedStop] = useState(false)


    // Slide ko move karte hain
    const goToSlide = (slideNumber, shouldBounce = false) => {
        if (!sliderRef.current) return // Agar container nahi mila to return

        // const slideWidth = calculateSlideWidth(trackRef)
        // const moveDistance = -slideNumber * slideWidth

        // her we have two decide our two animaton 
        if (shouldBounce) {
            sliderRef.current.style.transition = 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        } else {
            sliderRef.current.style.transition = 'transform 0.3s ease'
        }
        sliderRef.current.style.transform = `translateX(-${slideNumber * 100}% )`
    }

    // start our mouse Drag
    const handleDragStart = (x) => {
        mouseStatus(false)
        // console.log('Drag started at position:', x)
        setIsDragging(true)
        setDragStartX(x)

        // Animation hatate hain drag ke time
        if (sliderRef.current) {
            sliderRef.current.style.transition = 'none'
        }

        // tell parent componet about our status
        if (onDragStart) {
            onDragStart()
        }
    }

    // Drag karte samay
    const handleDragging = (x) => {
        mouseStatus(true)
        if (!isDragging || !sliderRef.current) return

        const dragDistance = x - dragStartX
        const slideWidth = calculateSlideWidth(trackRef)
        let movePosition = -currentSlideIndex * slideWidth + dragDistance
        // Position update karte hain
        sliderRef.current.style.transform = `translateX(${movePosition}px)`
    }

    // Drag end function
    const handleDragEnd = (x) => {

        if (!isDragging) return

        // console.log('Drag ended at position:', x)
        setIsDragging(false)

        const dragDistance = x - dragStartX
        const slideWidth = calculateSlideWidth(trackRef)
        let newSlideIndex = currentSlideIndex
        let needsBounce = false

        const draggedRightOnFirst = currentSlideIndex === 0 && dragDistance > slideWidth / 6
        const draggedLeftOnLast = currentSlideIndex === slides.length - 1 && dragDistance < -slideWidth / 6

        if (draggedRightOnFirst || draggedLeftOnLast) {
            needsBounce = true
            newSlideIndex = currentSlideIndex
        } else {
            // Normal slide change logic
            if (dragDistance < -slideWidth / 4 && currentSlideIndex < slides.length - 1) {
                newSlideIndex++
            } else if (dragDistance > slideWidth / 4 && currentSlideIndex > 0) {
                newSlideIndex--
            }
        }

        // New slide pe move karte hain
        setCurrentSlideIndex(newSlideIndex)
        goToSlide(newSlideIndex, needsBounce)

        // Parent ko notify karte hain agar slide change hui
        if (onDragEnd && newSlideIndex !== currentSlideIndex) {
            onDragEnd(newSlideIndex)
        }
        mouseStatus(false)
    }

    // Parent se activeIndex change hone pe update karte hain
    useEffect(() => {
        if (typeof activeIndex === 'number' && activeIndex !== currentSlideIndex) {
            setCurrentSlideIndex(activeIndex)
            goToSlide(activeIndex, false) // Bounce nahi chahiye programmatic change pe
        }

    }, [activeIndex, currentSlideIndex])

    // Window resize hone pe adjust karte hain
    useEffect(() => {
        const handleWindowResize = () => {
            // console.log('Window resized, adjusting slider')
            goToSlide(currentSlideIndex, false)
        }

        window.addEventListener('resize', handleWindowResize)

        // Cleanup function
        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [currentSlideIndex])

    // Image drag prevent karte hain
    const preventImageDrag = (e) => {
        e.preventDefault()
    }

    return (
        <div
            data-component="slides"
            ref={trackRef}
            // Mouse events
            onMouseDown={(e) => {
                e.preventDefault()
                handleDragStart(e.pageX)
            }}
            onMouseMove={(e) => {
                if (isDragging) {
                    handleDragging(e.pageX)
                }
            }}
            onMouseUp={(e) => {
                if (isDragging) {
                    handleDragEnd(e.pageX)
                }
            }}
            onMouseLeave={(e) => {
                if (isDragging) {
                    handleDragEnd(e.pageX)
                }
            }}
            // // Touch events (mobile ke liye)
            onTouchStart={(e) => {
                handleDragStart(e.touches[0].pageX)
            }}
            onTouchMove={(e) => {
                handleDragging(e.touches[0].pageX)
            }}
            onTouchEnd={(e) => {
                handleDragEnd(e.changedTouches[0].pageX)
            }}
            style={{ userSelect: 'none' }} // Text selection prevent karte hain
        >
            <div className="slides-container" ref={sliderRef}>
                {slides?.map((imageUrl, index) => (
                    <div key={index} className="slide-item">
                        <img
                            src={imageUrl || fallbackImage}
                            alt={`Slide number ${index + 1}`}
                            onError={(e) => handleImageError(e)}
                            className="slide-image"
                            onDragStart={e => preventImageDrag(e)}
                            draggable={false}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Slide