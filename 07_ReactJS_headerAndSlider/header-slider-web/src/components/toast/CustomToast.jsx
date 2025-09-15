import React from 'react'
import '../../scss/components/customtoast.scss'
import crossIcon from '../../assets/icons/close.svg'

const CustomToast = ({ message, onclose }) => {
    return (
        <div data-component='custom-toast-component'>
            <div className='custom-toast-wrapper'>
                <label className='message-label'>{message || "message"}</label>
                <img src={crossIcon} onClick={onclose} className='close-model-img' />
            </div>
        </div>
    )
}

export default CustomToast