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
    const [streamCategory, setStreamCategory] = useState({ id: 1, value: "favourite" });
    const [thirdCategory, setThirdCategory] = useState("Apple");

    const arr = ["Tv", "show", "Genoure", "series"];
    const arr2 = [{ id: 1, value: "favourite" }, { id: 2, value: "airing" }, { id: 3, value: "abc" }, { id: 4, value: "bypopularity" }]
    // const arr2 = [{ 'status': "favourite" }, { 'status': "airing" }, { 'status': "bypopularity" }, { 'status': "favourites" }]
    // const arr3 = [{ 1: "Apple" }, { 2: "banana" }, { 3: "kiwi" }]
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
                {/* <DropDownComponent
                    title='Type'
                    options={arr3}
                    deafaultValue={thirdCategory}
                    result={setThirdCategory}
                /> */}


            </section>
            <section style={{ height: "400px " }}>
                <label>{`Selected Drop Down value: - ${animeCategories}`}</label> <br />

                <label>{`Selected second Drop Down value: - ${JSON.stringify(streamCategory)}`}</label> <br />
                <label>{`Selected second Drop Down value: - ${streamCategory.value}`}</label>

                {/* {arr.map((item, idx) => {
                    console.log("Home page--->", item && item.value ? item.value : item)
                })

                } */}
            </section>

        </div>
    )
}

export default HomePage