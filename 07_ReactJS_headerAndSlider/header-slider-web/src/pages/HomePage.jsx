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
            <section style={{ display: 'flex' }}>
                <DropDown /> <DropDown />
                {/* <AnimeListLayout /> */}
            </section>

        </div>
    )
}

export default HomePage