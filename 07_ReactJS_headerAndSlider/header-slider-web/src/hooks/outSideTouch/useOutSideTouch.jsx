import React from 'react'
import { useEffect } from 'react'

const useOutSideTouch = ({ className, id, isOpen, handler }) => {
    useEffect(() => {
        if (isOpen === true) {
            document.addEventListener('mousedown', (e) => handleMouseClickEvent(e))
        }
        const handleMouseClickEvent = (e) => {

            if (e.target.closest(className)) {
                const parentId = document.getElementById(id)
                if (parentId.id !== e.target.closest(className).id) {
                    handler()
                }
            } else { handler() }

        }
        return (() => {
            document.removeEventListener('mousedown', handleMouseClickEvent)
        })
    }, [isOpen])
}

export default useOutSideTouch;