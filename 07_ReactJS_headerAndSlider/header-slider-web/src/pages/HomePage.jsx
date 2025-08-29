import React from 'react'
import HeaderComponent from '../components/header/HeaderComponent';
import SliderComponent from '../components/slider/SliderComponent';
import '../scss/pages/homePage.scss'


const HomePage = () => {
    return (
        <div data-component='homepage'>
            <HeaderComponent />
            <div className='body-container'>
                <SliderComponent />

            </div>

        </div>
    )
}

export default HomePage