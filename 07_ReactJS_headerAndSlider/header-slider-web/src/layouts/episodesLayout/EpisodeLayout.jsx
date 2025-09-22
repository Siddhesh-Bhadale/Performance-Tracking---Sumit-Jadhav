import React, { useEffect, useRef, useState } from 'react'
import "../../scss/layouts/episodelayouts.scss"
import EpisodeCard from '../../components/cards/episodeCard/EpisodeCard'
import { useParams } from 'react-router-dom'
import apiThrottleHook from '../../hooks/apiThrottle/apiThrottleHook'
let array = []
const EpisodeLayout = (props) => {
    const { backgroundImg, title } = props
    const [fullEpisodeData, setFullEpisodeData] = useState();
    const [episodeImage, setEpisodeImage] = useState();
    const [synopsisData, setsynopsisData] = useState(1);
    const [episodeId, setEpisodeId] = useState([])
    let extractedIds;
    const param = useParams();

    const getFullData = async () => {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime/${param?.id}/episodes`)
            const result = await response.json();
            setFullEpisodeData(result?.data)
            const extractedIds = result?.data.map(item => item.mal_id);
            console.log("extractedIds---->", extractedIds)
            setEpisodeId(oldArray => [...oldArray, ...extractedIds])
            // setEpisodeId([...extractedIds])
            // setEpisodeId(episodeId)
            console.log("episode IDS", episodeId)


        } catch (error) {
            console.log('error while fetching an api', error)
        }
    }

    const getEpisodeImage = async () => {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime/${param?.id}/videos`)
            const result = await response.json()
            setEpisodeImage(result?.data)
        } catch (error) {
            console.log('error while fetching an api', error)

        }
    }
    const getSynopsisData = async () => {
        console.log('extractedIds--->', episodeId)
    }
    // const getSynopsisData = async () => {
    //     try {
    //         const response = await fetch(`https://api.jikan.moe/v4/anime/${param?.id}/episodes/${episodeNo}`);
    //         const result = await response.json();
    //         setsynopsisData((prev) => [...prev, result?.data]);
    //     } catch (error) {
    //         console.log('Error while fetching the API:', error);
    //     }
    // };

    // const getThrottleSynopsis = apiThrottleHook({ func: getSynopsisData, delay: 500 });


    useEffect(() => {
        getFullData()
        getEpisodeImage()
        getSynopsisData()
    }, [])

    return (
        <div data-components='episode-layout'>

            <div className='episode-left-container'>
                <img className='episode-background-img' src={backgroundImg || 'https://4kwallpapers.com/images/wallpapers/one-piece-character-5120x2880-15328.jpeg'} />
                <label className='watch-now-label'>Watch Now</label>
                <label className='epsiode-anime-title-label'>{title}</label>
            </div>
            <div className='episode-right-container'>
                {fullEpisodeData?.map((item, idx) => {
                    // functionQueueRef.current.push(item.mal_id)
                    return (
                        <EpisodeCard key={idx}
                            episodeNo={item.mal_id}
                            title={item?.title}
                            episodeDescription={""}
                            episodeImage={episodeImage}
                            synopsis={'synopsisData'}
                        // functionCall={() => functionQueue.push(item)}
                        />
                    )

                })}
            </div>
        </div>
    )
}

export default EpisodeLayout