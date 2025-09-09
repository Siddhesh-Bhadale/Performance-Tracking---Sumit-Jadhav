import React, { useEffect, useState } from 'react'
import HeaderComponent from '../components/header/HeaderComponent';
import SliderComponent from '../components/slider/SliderComponent';
import '../scss/pages/homePage.scss'
import DropDownComponent from '../components/drop-down/DropDownComponent';


const HomePage = () => {
    const [searchValue, setSearchValue] = useState('')
    const [animeCategories, setAnimeCategories] = useState("Tv");
    const [streamCategory, setStreamCategory] = useState({ id: 1, value: "favourite" });


    const arr = ["Tv", "show", "Genoure", "series"];
    const arr2 = [{ id: 1, value: "favourite" }, { id: 2, value: "airing" }, { id: 3, value: "abc" }, { id: 4, value: "bypopularity" }]
    // This creates an array of 1000 elements, all filled with 'null'.
    // You can replace 'null' with any other static value (e.g., 0, 'dummy').
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
                    placeholder='Type'
                    options={arr}
                    deafaultValue={animeCategories}
                    result={setAnimeCategories}
                />

                <DropDownComponent
                    placeholder='Type'
                    options={arr2}
                    deafaultValue={streamCategory}
                    result={setStreamCategory}
                />
            </section>
            <section style={{ height: "400px " }}>
                <label>{`Selected Drop Down value: - ${JSON.stringify(animeCategories)}`}</label> <br />

                <label>{`Selected second Drop Down value: - ${JSON.stringify(streamCategory)}`}</label> <br />
                <label>{`Selected second Drop Down value: - ${streamCategory.value}`}</label>
            </section>

        </div>
    )
}

export default HomePage