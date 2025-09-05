import React, { useEffect, useRef, useState } from 'react';
import '../../scss/components/dropDownComponent.scss';
import { DropDownTxt } from '../../utils/TextConstants';
import downArrow from '../../assets/icons/down.svg';
import useOutSideTouch from '../../hooks/outSideTouch/useOutSideTouch';

const DropDownComponent = (props) => {
    const { options = [], title = 'select', result, deafaultValue, isDropDownOpen } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(deafaultValue);
    const parentId = document.getElementById('parentContainer');
    const firstChild = document.getElementById('secondChild')
    // const secondChild = document.getElementById('secondChild');
    // const dropDownItem = document.getElementById('dropDownItem');
    // console.log("dropDownItem---->", dropDownItem)
    // console.log()

    const handleToggleOpen = () => {
        setIsOpen(!isOpen)
    }



    const handleItemClick = (item, idx) => {
        // console.log(isOpen)
        if (selectedItem === item) {
            setSelectedItem(title);
            dropDownItem.style.backgroundColor = 'transparent';
            result && result('');
            // setIsOpen(false)

        } else {
            setSelectedItem(item);
            result && result(item);
            // setIsOpen(false)

        }

    }

    //---------------- 1st way to solve the problem with ref ----------------//
    // we need three props ref, ()=>,state-value of that toggle
    useEffect(() => {
        const handleMouseClickEvent = (e) => {
            if (secondChild.id === e.target.parentElement.parentElement.parentElement.id) {
                console.log('child Element clicked')
            } else {
                setIsOpen(false)
            }

            // if(parentId)
            // parentId.addEventListener('click')
        }
        if (isOpen === true) {
            document.addEventListener('mousedown', (e) => handleMouseClickEvent(e))
        }
        return (() => {
            document.removeEventListener('mousedown', handleMouseClickEvent)
        })
    }, [isOpen])
    //---------- 2nd way to solve the problem with on blur ---  --------------//
    // const handleToggleOff = (e) => {
    //     if (!dropdownRef.current.contains(e.relatedTarget)) setIsOpen(false)

    // }
    return (
        <div data-component='dropDownComponent'
            id='parentContainer'
        // tabIndex={0}
        // onBlur={(e) => { handleToggleOff(e) }}
        >
            <div className='parent_component'
                id='firstChild'
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
                        {/* <div className='end_container'></div> */}
                    </div>

                </div>}
            </div>

            <div>

            </div>
        </div>
    )
}

export default DropDownComponent;
