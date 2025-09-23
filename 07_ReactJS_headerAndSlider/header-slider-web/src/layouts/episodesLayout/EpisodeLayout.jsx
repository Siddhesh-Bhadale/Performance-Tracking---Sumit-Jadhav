import React, { useEffect, useRef, useState } from 'react'
import "../../scss/layouts/episodelayouts.scss"
import EpisodeCard from '../../components/cards/episodeCard/EpisodeCard'
import { useParams } from 'react-router-dom'
import { fallbackImage } from '../../utils/StaticData'
const EpisodeLayout = (props) => {
    const { backgroundImg, title } = props
    const [fullEpisodeData, setFullEpisodeData] = useState();
    const [episodeImage, setEpisodeImage] = useState();
    const [synopsisData, setsynopsisData] = useState([]);
    const [fullAPIData, setFullAPIData] = useState([])
    const param = useParams();

    const getFullData = async () => {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime/${param?.id}/episodes`)
            const result = await response.json();
            setFullEpisodeData(result?.data)
            // if (result?.data?.length) {
            //     // call our synopsis api instantly here
            //     getSynopsisData(result?.data)
            // }

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
    const getSynopsisData = async (data) => {
        data?.forEach((element, idx) => {
            setTimeout(async () => {
                try {
                    const response = await fetch(`https://api.jikan.moe/v4/anime/${param?.id}/episodes/${element?.mal_id}`);
                    const result = await response.json();
                    const synopsisDataObj = {
                        mal_id: element?.mal_id,
                        synopsis: result?.data?.synopsis || 'No synopsis available'
                    }
                    setsynopsisData(
                        (prev) => [...prev.filter((item) => item.mal_id !== element.mal_id), synopsisDataObj]
                    )
                } catch (error) {
                    console.log(`Error while fetching an Synopsis data`, error)
                }

            }, 600 * idx);
        });
    }


    const getVideoAndsynopsisData = async () => {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime/${param?.id}/videos`)
            const result = await response.json()
            // setEpisodeImage(result?.data)
            result?.data?.episodes?.forEach((element, idx) => {
                setTimeout(async () => {
                    try {
                        const response = await fetch(`https://api.jikan.moe/v4/anime/${param?.id}/episodes/${element?.mal_id}`);
                        const result = await response.json();
                        const episodeCardData = {
                            mal_id: element?.mal_id,
                            title: element?.title,
                            image: element?.images?.jpg?.image_url,
                            synopsis: result?.data?.synopsis || 'No synopsis available'
                        }
                        setFullAPIData(
                            (prev) => [...prev.filter((item) => item.mal_id !== element.mal_id), episodeCardData]
                        )
                    } catch (error) {
                        console.log(`Error while fetching an Synopsis data`, error)
                    }
                }, 600 * idx)
            })

        } catch (error) {
            console.log('error while fetching an api', error)

        }
    }

    useEffect(() => {
        getFullData()
        getEpisodeImage();
        // getVideoAndsynopsisData()
    }, [])

    return (
        <div data-components='episode-layout'>

            <div className='episode-left-container'>
                <img className='episode-background-img' src={backgroundImg || fallbackImage} />
                <label className='watch-now-label'>Watch Now</label>
                <label className='epsiode-anime-title-label'>{title}</label>
            </div>
            <div className='episode-right-container'>
                {!fullEpisodeData || fullEpisodeData?.length === 0 ? (<label className='No-episode-data-label'>
                    No Episode Data
                </label>) : (<>
                    {fullEpisodeData?.map((item, idx) => {
                        // functionQueueRef.current.push(item.mal_id)
                        return (
                            <EpisodeCard key={idx}
                                episodeNo={item.mal_id}
                                title={item?.title}
                                episodeImage={episodeImage}
                                synopsisData={synopsisData}
                            />
                        )

                    })}
                    {/* {fullAPIData?.map((item, idx) => {
                        return (
                            <EpisodeCard key={idx}
                                episodeNo={item.mal_id}
                                title={item?.title}
                                episodeImg={item?.image}
                                synopsisData={item?.synopsis}
                            />
                        )

                    })} */}
                </>)}

            </div>
        </div>
    )
}

export default EpisodeLayout