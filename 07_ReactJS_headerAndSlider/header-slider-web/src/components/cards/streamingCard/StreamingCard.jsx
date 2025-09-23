import React from 'react'
import '../../../scss/components/streamingcard.scss'
import netflix from '../../../assets/images/Netflix.png'


const StreamingCard = ({ title, PlatformImg }) => {
    return (
        <div data-component='streaming-card-component'>
            <div className='streamingcard-image-contianer'>
                <img src={PlatformImg?.path || netflix} className='streamplatform-img' alt={'streamplatform'} />
            </div>
            <div className='streamingcard-label-container'>
                <label>{title}</label>
            </div>
        </div>
    )
}

export default StreamingCard