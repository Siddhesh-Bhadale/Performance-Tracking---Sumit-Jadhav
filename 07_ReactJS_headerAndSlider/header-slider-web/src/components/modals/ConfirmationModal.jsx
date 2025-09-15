import React, { useEffect } from 'react';
import '../../scss/components/confirmationModal.scss'
import closeImg from '../../assets/icons/close.svg'


const ConfirmationModal = (props) => {
    const { onCancel, onSubmit, description, postion = 'middle' } = props

    const handlePostion = () => {
        const modal = document.querySelector('.modal-parent-component')
        if (postion === 'top') {
            modal.style.top = '15%';
            modal.style.translateY = '-50%'
            modal.style.animation = 'none'
        }
    }

    useEffect(() => {
        document.body.style.overflowY = 'hidden';
        handlePostion();
        return () => { document.body.style.overflowY = 'scroll'; }
    }, [])


    return (
        <div data-components='confirmation-modal' >
            <div className='modal-wrapper' onClick={onCancel}></div>
            <div className='modal-parent-component'>
                <div className='modal-close-container'>
                    <img src={closeImg} alt='closeIcon' onClick={onCancel} className='model-close-label' />
                </div>
                <div className='modal-description-container'>
                    <label className='modal-description-label'>{description}</label>
                </div>
                <div className='modal-btn-container'>
                    <button className='modal-btn yes-btn' onClick={onSubmit}>Yes</button>
                    <button className='modal-btn no-btn' onClick={onCancel}>No</button>
                </div>
            </div>

        </div>
    )
}

export default ConfirmationModal