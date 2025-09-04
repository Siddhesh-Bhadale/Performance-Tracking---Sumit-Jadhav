import React, { useState, useEffect, useRef } from 'react';
import '../../scss/components/dropDown.scss';
import down from '../../assets/icons/down.svg';
import useOutSideTouch from '../../hooks/outSideTouch/useOutSideTouch';
import useDebounce from '../../hooks/debounce/useDebounce';
import Search from '../search/Search';
import { filteredEntries } from '../../utils/utils';
import { DropDownTxt } from '../../utils/TextConstants';

const DropDown = ({ data = [], title = 'Type', multiSelect = false, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedSingle, setSelectedSingle] = useState(null);
    const dropdownRef = useRef(null);
    const isObject = !Array.isArray(data) && typeof data === 'object';
    const entries = isObject ? Object.entries(data) : data.map((item, i) => [i, item]);
    console.log("Enteries:--->", entries)
    const toggleDropdown = () => setIsOpen(!isOpen);
    //------- outside Touch and unmount logic -------------//
    useOutSideTouch({
        ref: dropdownRef,
        handler: () => setIsOpen(false)
    })
    //--------- it will check selected or not -----------//
    const isChecked = (key) => selectedItems.some(item => item.key === key);

    const handleItemClick = (key, value) => {
        if (multiSelect) {
            const existedItems = selectedItems.some(item => item.key === key);
            let newSelected;
            if (existedItems) {
                newSelected = selectedItems.filter(item => item.key !== key);
            } else {
                newSelected = [...selectedItems, { key, value }];
            }
            setSelectedItems(newSelected);
            onChange && onChange(newSelected.map(item => item.value));
        } else {
            const existedSingle = selectedSingle?.value == value
            if (existedSingle) {
                setSelectedSingle(title)
            } else {
                setSelectedSingle({ key, value });
                onChange && onChange(value);

            }
            console.log(isOpen);
            setIsOpen(false);
        }
    };

    //  filtered data
    const filterEntry = filteredEntries(entries, searchTerm)

    const getSelectedLabel = () => {
        if (multiSelect) {
            return selectedItems.length > 0
                ? selectedItems.map(item => item.value).join(', ')
                : title;
        } else {
            return selectedSingle?.value || title;
        }
    };

    return (
        <div data-component="drop-down" ref={dropdownRef}>
            <div className="parent-container" onClick={toggleDropdown}>
                <label className="main-title">{getSelectedLabel()}</label>
                <img
                    alt="arrowIcon"
                    src={down}
                    className={isOpen ? 'up-image' : 'down-image'}
                />
            </div>

            {isOpen && (
                <div className="child-container">
                    <Search Search={setSearchTerm} />

                    <ul className="dropdown-list">
                        {filterEntry.length === 0 && (
                            <li className="dropdown-item disabled">{DropDownTxt?.NoResult}</li>
                        )}
                        {filterEntry.map(([key, value]) => (
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
                        ))}
                    </ul>
                    <div style={{ height: '50px' }}></div>
                </div>
            )}
        </div>
    );
};

export default DropDown;
