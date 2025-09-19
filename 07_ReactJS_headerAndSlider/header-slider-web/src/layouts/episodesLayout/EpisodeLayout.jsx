import React, { useEffect, useState } from 'react'
import "../../scss/layouts/episodelayouts.scss"
import EpisodeCard from '../../components/cards/episodeCard/EpisodeCard'
import { useParams } from 'react-router-dom'

const EpisodeLayout = (props) => {
    const { } = props
    // const [fullEpisodeData, setFullEpisodeData] = useState();
    const [episodeImage, setEpisodeImage] = useState()


    const param = useParams();

    // const getFullData = async () => {
    //     try {
    //         const response = await fetch(`https://api.jikan.moe/v4/anime/${param?.id}/episodes`)
    //         const result = await response.json();
    //         setFullEpisodeData(result?.data)
    //     } catch (error) {
    //         console.log('error while fetching an api', error)
    //     }
    // }

    const getEpisodeImage = async () => {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime/${param?.id}/videos`)
            const result = await response.json()
            setEpisodeImage(result?.data)
        } catch (error) {
            console.log('error while fetching an api', error)

        }
    }

    // console.log(fullEpisodeData)
    console.log(episodeImage?.episodes)

    useEffect(() => {
        // getFullData()
        getEpisodeImage()
    }, [])

    return (
        <div data-components='episode-layout'>

            <div className='episode-left-container'>
                <img className='episode-background-img' src={'https://4kwallpapers.com/images/wallpapers/one-piece-character-5120x2880-15328.jpeg'} />
                <label className='watch-now-label'>Watch Now</label>
                <label className='epsiode-anime-title-label'>One piece</label>
            </div>
            <div className='episode-right-container'>
                {episodeImage?.episodes?.map((item, idx) => (
                    <EpisodeCard key={idx} episodeNo={item.mal_id} title={item?.title} episodeDescription={""} episodeImage={item?.images?.jpg?.image_url} />
                ))}
            </div>
        </div>
    )
}

export default EpisodeLayout