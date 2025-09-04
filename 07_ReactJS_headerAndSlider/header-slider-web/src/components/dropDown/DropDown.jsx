import React, { useState, useEffect, useRef } from 'react';
import '../../scss/components/dropDown.scss';
import down from '../../assets/icons/down.svg';
import useOutSideTouch from '../../hooks/outSideTouch/useOutSideTouch';
import useDebounce from '../../hooks/debounce/useDebounce';
import Search from '../search/Search';
import { filteredEntries } from '../../utils/utils';
import { DropDownTxt } from '../../utils/TextConstants';

const DropDown = (props) => {
    // const { data=[], title = 'Type', multiSelect = false, onChange } = props;
    const { options, title = 'Type', result } = props;
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(options[0])
    const [selectedItemIndex, setSelectedItemIndex] = useState(null)

    // const [searchTerm, setSearchTerm] = useState('');
    // const [selectedItems, setSelectedItems] = useState([]);
    // const [selectedSingle, setSelectedSingle] = useState(null);

    // const isObject = !Array.isArray(data) && typeof data === 'object';
    // const entries = isObject ? Object.entries(data) : data.map((item, i) => [i, item]);
    const toggleDropdown = () => setIsOpen(!isOpen);

    // ------ handle Click event ---------------------//
    const handleClickItem = (item, i) => {
        setSelectedItem(item);
        setSelectedItemIndex(i);
        result(item)
        setIsOpen(false);
    }
    //------- outside Touch and unmount logic -------------//
    // useOutSideTouch({
    //     ref: dropdownRef,
    //     handler: () => setIsOpen(false)
    // })
    //--------- it will check selected or not -----------//
    // const isChecked = (key) => selectedItems.some(item => item.key === key);

    // const handleItemClick = (key, value) => {
    //     if (multiSelect) {
    //         const existedItems = selectedItems.some(item => item.key === key);
    //         let newSelected;
    //         if (existedItems) {
    //             newSelected = selectedItems.filter(item => item.key !== key);
    //         } else {
    //             newSelected = [...selectedItems, { key, value }];
    //         }
    //         setSelectedItems(newSelected);
    //         onChange && onChange(newSelected.map(item => item.value));
    //     } else {
    //         const existedSingle = selectedSingle?.value == value
    //         if (existedSingle) {
    //             setSelectedSingle(title)
    //         } else {
    //             setSelectedSingle({ key, value });
    //             onChange && onChange(value);

    //         }
    //         console.log(isOpen);
    //         setIsOpen(false);
    //     }
    // };

    //  filtered data
    // const filterEntry = filteredEntries(entries, searchTerm)

    // const getSelectedLabel = () => {
    //     if (multiSelect) {
    //         return selectedItems.length > 0
    //             ? selectedItems.map(item => item.value).join(', ')
    //             : title;
    //     } else {
    //         return selectedSingle?.value || title;
    //     }
    // };

    return (
        <div data-component="drop-down" ref={dropdownRef}>
            <div className="parent-container" onClick={toggleDropdown}>
                {/* <label className="main-title">{getSelectedLabel()}</label> */}
                <label className="main-title">{selectedItem || title}</label>

                <img
                    alt="arrowIcon"
                    src={down}
                    className={isOpen ? 'up-image' : 'down-image'}
                />
            </div>

            {isOpen && (
                <div className="child-container">
                    {/* <Search Search={setSearchTerm} /> */}
                    <div className='block-container'>
                    </div>

                    <ul className="dropdown-list">
                        {options.length === 0 &&
                            <li className='dropdown-item disabled'>
                                {DropDownTxt?.NoResult}
                            </li>
                        }
                        {options?.map((item, index) => (
                            <li key={index} className={`dropdown-item ${selectedItemIndex === index ? 'selected' : 'inactive'}`} onClick={() => handleClickItem(item, index)}>
                                {item}
                            </li>
                        ))

                        }


                        {/* {filterEntry.length === 0 && (
                            <li className="dropdown-item disabled">{DropDownTxt?.NoResult}</li>
                        )} */}
                        {/* {filterEntry.map(([key, value]) => (
                            <li
                                key={key}
                                className={`dropdown-item ${isChecked(key) || selectedSingle?.key === key ? 'selected' : ''
                                    }`}
                                onClick={() => handleItemClick(key, value)}
                            >
                                {multiSelect && (
                                    <input
                                        type="checkbox"
                                        name='multipleOptionselection'
                                        checked={isChecked(key)}
                                        className="checkbox"
                                        readOnly
                                    />
                                )}
                                {value}
                            </li>
                        ))} */}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropDown;
