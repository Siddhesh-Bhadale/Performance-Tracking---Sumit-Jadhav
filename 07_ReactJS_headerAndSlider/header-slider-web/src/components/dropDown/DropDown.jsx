import React, { useState } from 'react'
import '../../scss/components/dropDown.scss'
import down from '../../assets/icons/down.svg'

const DropDown = ({ title = 'Type' }) => {
    const [isOpen, setIsOpen] = useState(false)
    const arr = { 1: 'item1', 2: 'item2', 3: 'item3', 4: 'item4', 5: 'item5' }

    function handleDropDownOpen() {
        setIsOpen(!isOpen)
        console.log(isOpen, isOpen)
    }
    return (
        <div data-component='drop-down'>
            <div className='parent-container' onClick={handleDropDownOpen}>
                <label className='main-title'>{title}</label>
                <img alt='arrowIcon' src={down} className={`${isOpen === true ? 'up-image' : 'down-image'}`} />
            </div>
            {isOpen && <div className='child-container'>
                <input />
                {/* {ar } */}
            </div>}
        </div>
    )
}

export default DropDown