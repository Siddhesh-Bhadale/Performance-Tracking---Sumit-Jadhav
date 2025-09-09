import React, { useEffect, useId, useRef, useState } from 'react';
import '../../scss/components/dropDownComponent.scss';
import { DropDownTxt } from '../../utils/TextConstants';
import downArrow from '../../assets/icons/down.svg';
import useOutSideTouch from '../../hooks/outSideTouch/useOutSideTouch';
import Search from '../search/Search';
import useDebounce from '../../hooks/debounce/useDebounce';

const DropDownComponent = (props) => {
    const { options = [], placeholder = 'select', result, deafaultValue } = props;
    const dropDownId = useId();
    const isArrayOfObject = typeof options[0] === 'object';
    const [searchValue, setSearchValue] = useState('');
    const debounce = useDebounce(searchValue, 500);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(isArrayOfObject ? deafaultValue.value : deafaultValue || placeholder);

    const enteries = options.map((item) => isArrayOfObject ? item : { id: item, value: item })
    const filterArray = enteries.filter((item, idx) => item.value.toLowerCase().includes(debounce.toLowerCase()))

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
        setSelectedItem(selectedItem === item?.value ? placeholder : item.value)
        setSearchValue(selectedItem === item?.value ? '' : searchValue)
        result && result(selectedItem === item?.value ? {} : item)
        setIsOpen(false)
    }
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
                    >
                        <Search placeholder='enter your type...'
                            value={searchValue}
                            onChange={setSearchValue} />
                    </div>
                    <div className='drop_down_list'>
                        {filterArray.length === 0 &&
                            <label className='drop_down_item' >{DropDownTxt?.NoResult}</label>
                        }
                        {filterArray?.map((item, index) => {
                            return (
                                <li id='dropDownItem' className={`drop_down_item ${selectedItem === item?.value ? 'active' : 'inactive'}`}
                                    key={index}
                                    onClick={() => handleItemClick(item, index)}
                                >
                                    {item?.value}
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
