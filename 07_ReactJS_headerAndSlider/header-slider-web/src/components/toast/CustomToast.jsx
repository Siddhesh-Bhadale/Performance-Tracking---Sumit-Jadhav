import React, { useEffect, useState } from 'react'
import '../../scss/components/customtoast.scss'
import crossIcon from '../../assets/icons/close.svg'

const CustomToast = ({ message, isVisible, delay }) => {
    console.log("prop Data:--->", isVisible)
    const [isToastVisible, setIsToastVisible] = useState(isVisible)
    console.log("isToastVisible", isToastVisible)
    const handleClose = () => {
        setIsToastVisible(false)
    }
    useEffect(() => {
        const resetToast = () => setTimeout(() => {
            handleClose()
        }, delay)
        resetToast();
        return () => { clearTimeout(resetToast) }
    }, [isToastVisible])
    return (
        <>
            {isToastVisible &&
                <div data-component='custom-toast-component'>
                    <div className='custom-toast-wrapper'>
                        <label className='message-label'>{message || "message"}</label>
                        <img src={crossIcon} onClick={handleClose} className='close-model-img' />
                    </div>
                    <div className='result-line-container'></div>
                </div>

            }
        </>

    )
}

export default CustomToast