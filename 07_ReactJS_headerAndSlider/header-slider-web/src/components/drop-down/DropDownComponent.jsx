import React, { useEffect, useRef, useState } from 'react';
import '../../scss/components/dropDownComponent.scss';
import { DropDownTxt } from '../../utils/TextConstants';
import downArrow from '../../assets/icons/down.svg';
import useOutSideTouch from '../../hooks/outSideTouch/useOutSideTouch';

const DropDownComponent = (props) => {
    const { options = [], title = 'select', result, deafaultValue, isDropDownOpen } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(deafaultValue);
    const [selectedIndex, setSelectedIndex] = useState(null)


    const handleToggleOpen = () => {

        setIsOpen(!isOpen)
    }

    // console.log("2nd --->", isDropDownOpen)

    const dropdownRef = useRef(null)

    const handleItemClick = (item, idx) => {
        if (selectedIndex === idx) {
            setSelectedItem(title);
            setSelectedIndex(null);
            result && result('');
        } else {
            setSelectedIndex(idx);
            setSelectedItem(item);
            result && result(item);
        }

    }

    // Event bubbling

    // useOutSideTouch({
    //     ref: dropdownRef,
    //     handler: () => setIsOpen(false)
    // })
    // useEffect(() => {
    //     function handleMouseClick(e) {
    //         if (userRef.current && !userRef.current(e.target)) {
    //             setIsOpen(false)
    //         }
    //     }
    //     document.addEventListener('click', (e) => handleMouseClick(e))
    // }, [])

    // useEffect(() => {
    //     console.log(isOpen)
    //     isDropDownOpen && isDropDownOpen(isOpen)
    // }, [isOpen])  

    return (
        <div data-component='dropDownComponent' onClick={handleToggleOpen}  >
            <div className='parent_component'>
                <label className='title_section'>{selectedItem}</label>
                <img src={downArrow} alt='downIcon' className={`down_arrow_img ${isOpen ? 'up-img' : 'down-img'}`} />
            </div>
            {isOpen && <div className='child_component'>
                <div className='empty_contianer'
                ></div>
                <div className='drop_down_list'>
                    {options.length === 0 &&
                        <label className='drop_down_item' >{DropDownTxt?.NoResult}</label>
                    }
                    {options?.map((item, index) => (
                        <li className={`drop_down_item ${selectedItem === item ? 'active' : ''}`}
                            key={index}
                            onClick={() => handleItemClick(item, index)}
                        >
                            {item}
                        </li>
                    ))}
                    <div className='end_container'></div>
                </div>

            </div>}
        </div>
    )
}

export default DropDownComponent;
