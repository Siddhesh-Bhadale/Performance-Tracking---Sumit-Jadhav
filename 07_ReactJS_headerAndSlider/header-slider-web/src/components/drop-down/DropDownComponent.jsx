import React, { useEffect, useId, useRef, useState } from 'react';
import '../../scss/components/dropDownComponent.scss';
import { DropDownTxt } from '../../utils/TextConstants';
import downArrow from '../../assets/icons/down.svg';
import useOutSideTouch from '../../hooks/outSideTouch/useOutSideTouch';

const DropDownComponent = (props) => {
    const { options = [], title = 'select', result, deafaultValue } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(deafaultValue);
    const dropDownId = useId();
    //---- Array of string into array of objects ---------------//
    // const enteries = options.map((i, idx) => typeof i === 'string' || typeof i === 'number' ? { id: idx, value: String(i) } : { id: i.id, value: i.value });
    // options.map((i, idx) => { typeof i === 'string' || typeof i === 'number' })
    const isArray = typeof options[0] === 'string' || typeof options[0] === 'number'
    //------ on / off drop down ---------------//
    const handleToggleOpen = () => {
        setIsOpen(!isOpen)
    }
    // --------- HANDLE OUTSIDE TOUCH ----------//
    useOutSideTouch({
        className: ('[data-component="dropDownComponent"]'),
        id: dropDownId,
        isOpen: isOpen,
        handler: () => setIsOpen(false)
    })
    //--------- HANDLE CLICK ITEM ----------//
    const handleItemClick = (item) => {
        console.log("click on object", title)
        setSelectedItem(isArray ? (selectedItem === item ? title : item) : (selectedItem.value === item.value ? title : item))
        result && result(isArray ? (selectedItem === item ? '' : item) : (selectedItem.value === item.value ? { id: '', value: '' } : item))
        setIsOpen(false)
    }
    //-------- List Item component ----------//
    return (
        <div data-component='dropDownComponent'
            id={dropDownId}
        >
            <div className='parent_component'
                onClick={handleToggleOpen}
            >
                <label className='title_section'>{isArray ? selectedItem : selectedItem?.value || title}</label>
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
                        {options?.map((item, index) => {
                            return (
                                // <li id='dropDownItem' className={`drop_down_item ${selectedItem === item?.value ? 'active' : 'inactive'}`}

                                //     key={index}
                                //     onClick={() => handleItemClick(item?.value, index)}
                                // >
                                //     {item?.value}
                                // </li>

                                <li id='dropDownItem' className={`drop_down_item ${isArray ? (selectedItem === item ? 'active' : 'inactive') : (selectedItem.value === item.value ? 'active' : 'inactive')}`}
                                    key={index}
                                    onClick={() => handleItemClick(item, index)}
                                >
                                    {item && item.value ? item.value : item}
                                </li>

                            )
                        })}
                    </div>
                </div>}
            </div>

            <div>

            </div>
        </div>
    )
}

export default DropDownComponent;
