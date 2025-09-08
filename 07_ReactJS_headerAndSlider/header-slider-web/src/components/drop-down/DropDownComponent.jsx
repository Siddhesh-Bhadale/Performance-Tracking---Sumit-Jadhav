import React, { useEffect, useId, useRef, useState } from 'react';
import '../../scss/components/dropDownComponent.scss';
import { DropDownTxt } from '../../utils/TextConstants';
import downArrow from '../../assets/icons/down.svg';

const DropDownComponent = (props) => {
    const { options = [], title = 'select', result, deafaultValue } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(deafaultValue);
    const dropDownId = useId();
    //------ on / off drop down ---------------//
    const handleToggleOpen = () => {
        setIsOpen(!isOpen)
    }
    const handleItemClick = (item) => {
        setSelectedItem(selectedItem === item ? title : item)
        result && result(selectedItem === item ? '' : item)
        setIsOpen(false)
    }

    //---------------- 1st way to solve the problem with ref ----------------//
    useEffect(() => {
        if (isOpen === true) {
            document.addEventListener('mousedown', (e) => handleMouseClickEvent(e))
        }
        const handleMouseClickEvent = (e) => {
            if (e.target.closest(`[data-component='dropDownComponent']`)) {
                const parentId = document.getElementById(dropDownId)
                if (parentId.id !== e.target.closest(`[data-component='dropDownComponent']`).id) {
                    setIsOpen(false)
                }
            } else { setIsOpen(false) }

        }
        return (() => {
            document.removeEventListener('mousedown', handleMouseClickEvent)
        })
    }, [isOpen])
    return (
        <div data-component='dropDownComponent'
            id={dropDownId}
        >
            <div className='parent_component'
                onClick={handleToggleOpen}
            >
                <label className='title_section'>{selectedItem}</label>
                <img src={downArrow} alt='downIcon' className={`down_arrow_img ${isOpen ? 'up-img' : 'down-img'}`} />
            </div>
            <div id='secondChild'>
                {isOpen && <div className='child_component'  >
                    <div className='empty_contianer'
                    ></div>
                    <div className='drop_down_list'>
                        {options.length === 0 &&
                            <label className='drop_down_item' >{DropDownTxt?.NoResult}</label>
                        }
                        {options?.map((item, index) => (
                            <li id='dropDownItem' className={`drop_down_item ${selectedItem === item ? 'active' : 'inactive'}`}
                                key={index}
                                onClick={() => handleItemClick(item, index)}
                            >
                                {item}
                            </li>
                        ))}
                    </div>
                </div>}
            </div>

            <div>

            </div>
        </div>
    )
}

export default DropDownComponent;
