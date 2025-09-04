import React, { useEffect, useState } from 'react'
import HeaderComponent from '../components/header/HeaderComponent';
import SliderComponent from '../components/slider/SliderComponent';
import '../scss/pages/homePage.scss'
import useDebounce from '../hooks/debounce/useDebounce';
import AnimeListLayout from '../layouts/animeList/AnimeListLayout';
import DropDown from '../components/dropDown/DropDown';
import DropDownComponent from '../components/drop-down/DropDownComponent';


const HomePage = () => {
    const [searchValue, setSearchValue] = useState('')
    const debounceValue = useDebounce(searchValue)
    const [dropDownValue, setDropDownValue] = useState('show')
    const [dropDownOpen, setDropDownOpen] = useState(false)



    // useEffect(() => {

    //     const parentID = document.getElementById('parent')
    //     function handleCloseDropdown() {
    //         setDropDownOpen(false)
    //         console.log("mouseDown clicked", dropDownOpen)

    //     }
    //     parentID.addEventListener('mousedown', handleCloseDropdown)
    //     console.log(dropDownOpen)
    // }, [dropDownOpen])



    const arr = ["Tv", "show", "Genoure", "series", "Tv", "show", "Genoure", "series", "Tv", "show", "Genoure", "series"];
    const arr2 = ["Tv", "show", "Genoure"]

    return (
        <div data-component='homepage' id='parent'>
            <HeaderComponent
                search={setSearchValue}
            />
            <div className='body-container'>
                <SliderComponent />
            </div>
            <section className='drop-down-contianer'>
                {/* <DropDown
                    data={['Movie', 'Tv', 'Live', 'Cartoon']}
                    title="Type"
                    onChange={(selected) => setSelectedItem(selected)}
                />
                <DropDown
                    data={arr}
                    isMulti={true}
                    title="status"
                    multiSelect={true}
                    onChange={(selected) => setSelectedItem(selected)}
                />
                <DropDown
                    data={{ a: 'Upcomming', b: 'OnBoarding', c: "Air", d: "launched" }}
                    isMulti={true}
                    title="status"
                    multiSelect={true}
                    onChange={(selected) => setSelectedItem(selected)}
                /> */}
                <DropDownComponent
                    title='Type'
                    options={arr}
                    deafaultValue={dropDownValue}
                    result={setDropDownValue}
                    isDropDownOpen={(e) => setDropDownOpen(e)}
                />
                {/* <DropDownComponent title='Type'
                    options={arr2}
                    deafaultValue={dropDownValue}
                    result={setDropDownValue} /> */}


            </section>
            <section style={{ height: "400px " }}>
                <label>{`Selected Drop Down value: - ${dropDownValue}`}</label>

            </section>

        </div>
    )
}

export default HomePage