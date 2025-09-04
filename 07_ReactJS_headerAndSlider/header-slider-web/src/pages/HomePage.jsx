import React, { useState } from 'react'
import HeaderComponent from '../components/header/HeaderComponent';
import SliderComponent from '../components/slider/SliderComponent';
import '../scss/pages/homePage.scss'
import useDebounce from '../hooks/debounce/useDebounce';
import AnimeListLayout from '../layouts/animeList/AnimeListLayout';
import DropDown from '../components/dropDown/DropDown';


const HomePage = () => {
    const [searchValue, setSearchValue] = useState('')
    const debounceValue = useDebounce(searchValue)


    return (
        <div data-component='homepage'>
            <HeaderComponent
                search={setSearchValue}
            />
            <div className='body-container'>
                <SliderComponent />
            </div>
            <section className='drop-down-contianer'>
                <DropDown
                    data={['Movie', 'Tv', 'Live', 'Cartoon']}
                    title="Type"
                    onChange={(selected) => setSelectedItem(selected)}
                />
                <DropDown
                    data={{ a: 'Upcomming', b: 'OnBoarding', c: "Air", d: "launched" }}
                    isMulti={true}
                    title="status"
                    multiSelect={true}
                    onChange={(selected) => setSelectedItem(selected)}
                />
                {/* <AnimeListLayout /> */}
            </section>

        </div>
    )
}

export default HomePage