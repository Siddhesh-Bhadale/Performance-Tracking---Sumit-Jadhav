import React, { useEffect } from 'react'
import '../../../scss/components/streamingcard.scss'
import netflix from '../../../assets/images/Netflix.png'
import { handleImageError } from '../../../utils/utils'


const StreamingCard = (props) => {
    const { } = props
    const getDynamicImages = () => {
        const domain = new URL(props?.url).hostname
        const fetchedImage = `https://logo.clearbit.com/${domain}`
        return fetchedImage
    }
    useEffect(() => {
        getDynamicImages()
    }, [])

    return (
        <div data-component='streaming-card-component'>
            <div className='streamingcard-image-contianer'>
                <img src={getDynamicImages() || netflix} onError={(e) => { handleImageError(e) }} className='streamplatform-img' alt={'streamplatform'} />
            </div>
            <div className='streamingcard-label-container' onClick={() => window.open(props?.url)}>
                <label>{props?.name}</label>
            </div>
        </div>
    )
}

export default StreamingCard