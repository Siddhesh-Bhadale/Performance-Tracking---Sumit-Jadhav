import React from 'react'
import '../scss/components/animecardloadingcomponent.scss'

const AnimeCardLoading = () => {

    const LoadingArray = Array.from(Array(5), (_, idx) => idx + 1)
    const AnimeLoadingCard = () => {
        return (<div className='card-parent-component'>
            <div className='card-image-container'></div>
            <div className='card-details-container'>
                <div className='label-container'></div>
                <div className='rank-container'></div>
            </div>
        </div>)
    }
    return (
        <div data-component='anime-card-loading-component'>
            {LoadingArray?.map((item, idx) => (<AnimeLoadingCard key={idx} />))}
        </div>
    )
}

export default AnimeCardLoading