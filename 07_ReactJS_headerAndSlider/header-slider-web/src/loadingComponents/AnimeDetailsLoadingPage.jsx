import React from 'react'
import '../scss/components/animedetailsloadingpage.scss'

const AnimeDetailsLoadingPage = () => {
    return (
        <div data-component='animedetails-loading-compoenent'>
            <div className='banner-loader'>

            </div>
            <div className='banner-details'>
                <div className='left-container'></div>
                <div className='right-container'></div>
            </div>

        </div>
    )
}

export default AnimeDetailsLoadingPage