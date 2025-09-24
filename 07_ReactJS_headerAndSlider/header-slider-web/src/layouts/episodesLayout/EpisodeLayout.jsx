import React, { useEffect, useRef, useState } from 'react'
import "../../scss/layouts/episodelayouts.scss"
import EpisodeCard from '../../components/cards/episodeCard/EpisodeCard'
import { useParams } from 'react-router-dom'
import { fallbackImage } from '../../utils/StaticData'
import { getAllEpisodeImages, getAllEpisodes } from '../../services/services'
import { getMergedData } from '../../utils/utils'

const EpisodeLayout = () => {
    const param = useParams();
    const [episodeData, setEpisodeData] = useState([]);
    const [videoData, setVideoData] = useState([]);
    const [fullEpisode, setFullEpisode] = useState([]);
    const [selectedEpisode, setSelectedEpisode] = useState();

    const fetchEpisodedata = async () => {
        try {
            const titleResponse = await getAllEpisodes(param?.id)
            setEpisodeData(titleResponse?.data);
        } catch (error) {
            console.log("Error while fetching a Episode card data")
        }
    }

    const fetchVideodata = async () => {
        try {
            const imageResponse = await getAllEpisodeImages(param?.id)
            setVideoData(imageResponse?.data?.episodes);
        } catch (error) {
            console.log("Error while fetching a Episode card data")
        }
    }

    useEffect(() => {
        const mergedData = getMergedData(episodeData, videoData);
        setFullEpisode(mergedData);
        setSelectedEpisode(mergedData[0])
    }, [episodeData, videoData, param.id])


    useEffect(() => {
        fetchEpisodedata();
        fetchVideodata();
    }, [])

    return (
        <div data-components='episode-layout'>

            <div className='episode-left-container'>
                <img className='episode-background-img' src={selectedEpisode?.images?.jpg?.image_url || fallbackImage} />
                <label className='watch-now-label'>Watch Now</label>
                <label className='epsiode-anime-title-label'>{selectedEpisode?.title}</label>
            </div>
            <div className='episode-right-container'>
                {!fullEpisode || fullEpisode?.length === 0 ? (<label> No episode Data </label>) : (<>
                    {fullEpisode?.map((item, idx) => (
                        <EpisodeCard
                            key={idx}
                            {...item}
                            selectedEpisode={selectedEpisode}
                            setSelectedEpisode={setSelectedEpisode}
                        />
                    ))}
                </>)}
            </div>
        </div>
    )
}

export default EpisodeLayout