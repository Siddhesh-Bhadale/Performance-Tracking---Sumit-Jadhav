import React, { useEffect, useId, useRef, useState } from 'react';
import '../../scss/components/dropDownComponent.scss';
import { DropDownTxt } from '../../utils/TextConstants';
import downArrow from '../../assets/icons/down.svg';
import useOutSideTouch from '../../hooks/outSideTouch/useOutSideTouch';
import Search from '../search/Search';
import useDebounce from '../../hooks/debounce/useDebounce';
import Tick from '../../assets/icons/tick.svg'

const DropDownComponent = (props) => {
    const { options = [], placeholder = 'select', result, deafaultValue, isMultiSelect = false } = props;
    const dropDownId = useId();
    const listcontainerRef = useRef();
    const isArrayOfObject = typeof options[0] === 'object';
    const [searchValue, setSearchValue] = useState('');
    const debounce = useDebounce(searchValue, 500);
    const [isOpen, setIsOpen] = useState(false);
    // const [selectedItem, setSelectedItem] = useState(isArrayOfObject ? deafaultValue.value : deafaultValue || placeholder);
    const [selectedItem, setSelectedItem] = useState(
        isMultiSelect ? [isArrayOfObject ? deafaultValue : deafaultValue || null] :
            isArrayOfObject ? deafaultValue.value : deafaultValue || null
    );


    const enteries = options.map((item) => isArrayOfObject ? item : { id: item, value: item })
    const filterArray = enteries.filter((item) => item.value.toLowerCase().includes(debounce.toLowerCase()))


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
        if (isMultiSelect) {
            const existingElement = selectedItem.find((i) => i?.value === item?.value)
            let newSelected;
            if (existingElement) {
                newSelected = selectedItem.filter((item) => item?.value !== existingElement?.value)
            } else {
                newSelected = [...selectedItem, item]
            }
            setSelectedItem(newSelected);
            result && result(newSelected)
        } else {
            // Logic for single selection
            setSelectedItem(selectedItem === item?.value ? placeholder : item.value);
            setSearchValue(selectedItem === item?.value ? "" : searchValue);
            result && result(selectedItem === item?.value ? {} : item);
        }
    };



    // --------- Scroll to Selected Item when dropdown opens ----------//
    const handleScrollToTop = () => {
        if (!isMultiSelect) {
            if (isOpen && listcontainerRef.current) {
                const active = listcontainerRef?.current?.querySelector('.active')
                // if all are inactive
                if (active) active.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
        }

    }

    const handleSelectAll = () => {
        setSelectedItem(enteries)
        result && result(enteries)
    }

    const handleClearAll = () => {
        setSelectedItem([])
        result && result([])
    }

    const getSelectedLabel = () => {
        if (isMultiSelect) {
            return selectedItem.length > 0
                ? selectedItem.map(item => item?.value).join(', ')
                : placeholder;
        } else {
            return selectedItem || placeholder;
        }
    };


    useEffect(() => {
        handleScrollToTop()
    }, [isOpen])



    return (
        <div data-component='dropDownComponent'
            id={dropDownId}
        >
            <div className='parent_component'
                onClick={handleToggleOpen}
            >
                <label className='title_section'>{getSelectedLabel()}</label>

                <img src={downArrow} alt='downIcon' className={`down_arrow_img ${isOpen ? 'up-img' : 'down-img'}`} />
            </div>
            <div id='secondChild'>
                {isOpen && <div className='child_component'  >
                    <div className='empty_contianer'
                    >
                        <Search placeholder='enter your type...'
                            value={searchValue}
                            onChange={setSearchValue} />

                    </div>
                    {isMultiSelect &&
                        <div className='dropdown-btn-contianer'>
                            <button className='dropdown--btn dropdown--select-all-btn' onClick={handleSelectAll}>Select All</button>
                            <button className='dropdown--btn dropdown--clear-btn' onClick={handleClearAll}>Clear All</button>

                        </div>
                    }
                    <div className='drop_down_list' ref={listcontainerRef}>
                        {filterArray.length === 0 &&
                            <label id='noItemId' className='drop_down_item' >{DropDownTxt?.NoResult}</label>
                        }
                        {filterArray?.map((item, index) => {
                            return (
                                <li className={`drop_down_item ${isMultiSelect ? (getSelectedLabel().includes(item?.value) ? 'active' : 'inactive') : (getSelectedLabel() === item?.value) ? 'active' : 'inactive'} inner-list-item`}
                                    key={index}
                                    onClick={() => handleItemClick(item, index)}
                                >
                                    {(isMultiSelect && getSelectedLabel().includes(item?.value)) &&
                                        <img className='tick-img' src={Tick} />
                                    }
                                    {" "} {item?.value}
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
