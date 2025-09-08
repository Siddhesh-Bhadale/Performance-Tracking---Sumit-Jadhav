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
    const [animeCategories, setAnimeCategories] = useState('show');
    const [streamCategory, setStreamCategory] = useState('favourite');
    const [thirdCategory, setThirdCategory] = useState('favourite');

    const arr = ["Tv", "show", "Genoure", "series"];
    const arr2 = ["favourite", "airing", "bypopularity", "favourites"]

    return (
        <div data-component='homepage' id='parent'>
            <HeaderComponent
                search={setSearchValue}
            />
            <div className='body-container'>
                <SliderComponent />
            </div>
            <section className='drop-down-contianer'>

                <DropDownComponent
                    title='Type'
                    options={arr}
                    deafaultValue={animeCategories}
                    result={setAnimeCategories}
                />

                <DropDownComponent
                    title='Type'
                    options={arr2}
                    deafaultValue={streamCategory}
                    result={setStreamCategory}
                />

                <DropDownComponent
                    title='Type'
                    options={arr2}
                    deafaultValue={thirdCategory}
                    result={setThirdCategory}
                />


            </section>
            <section style={{ height: "400px " }}>
                <label>{`Selected Drop Down value: - ${animeCategories}`}</label> <br />

                <label>{`Selected second Drop Down value: - ${streamCategory}`}</label> <br />

                <label>{`Selected third Drop Down value: - ${thirdCategory}`}</label>


            </section>

        </div>
    )
}

export default HomePage