import React from 'react'
import { useEffect } from 'react'

const useOutSideTouch = ({ ref, handler }) => {
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                console.log("Target:-  ", !ref.current.contains(event.target))
                handler()
            }
        }

        document.addEventListener('mousedown', handleOutsideClick);

        return (() => {
            document.removeEventListener('mousedown', handleOutsideClick)
        })
    }, [ref, handler])
}

export default useOutSideTouch