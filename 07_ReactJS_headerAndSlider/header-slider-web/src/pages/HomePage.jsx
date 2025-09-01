import React, { useState } from 'react'
import HeaderComponent from '../components/header/HeaderComponent';
import SliderComponent from '../components/slider/SliderComponent';
import '../scss/pages/homePage.scss'
import useDebounce from '../hooks/debounce/useDebounce';


const HomePage = () => {
    const [searchValue, setSearchValue] = useState('')
    const debounceValue = useDebounce(searchValue)

    // console.log("debounceValue--->", debounceValue);

    return (
        <div data-component='homepage'>
            <HeaderComponent
                search={setSearchValue}
            />
            <div className='body-container'>
                <SliderComponent />
            </div>

        </div>
    )
}

export default HomePage