
import '../../../scss/components/episodecard.scss';
import { useParams } from 'react-router-dom';
import { smallFallbackImage } from '../../../utils/StaticData';
import apiThrottleHook from '../../../hooks/apiThrottle/apiThrottleHook';
import { useEffect, useState } from 'react';

const EpisodeCard = ({ episodeNo, title, episodeImage, episodeImg, synopsisData, onClick }) => {
    const params = useParams();
    const [data, setData] = useState()
    const matchedEpisode = episodeImage?.episodes?.find((ep) => ep.mal_id === episodeNo);
    // const synopsis = synopsisData?.find((syno) => syno.mal_id === episodeNo)

    const getSynopsisData = async () => {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime/${params?.id}/episodes/${episodeNo}`);
            const result = await response.json();
            setData(result?.data)
        } catch (error) {
            console.log(`Error while fetching an Synopsis data`, error)
        }
    }
    // const synopsisDatas = apiThrottleHook(getSynopsisData(), 1000, episodeNo)
    // // console.log(data)
    // useEffect(() => {
    //     // synopsisDatas
    // }, [episodeNo])
    return (
        <div data-component='episode-card-component' onClick={() => { alert('Episode click') }}>
            <div className='episode-card-left-container'>
                <img className='episode-card-image' src={episodeImg || matchedEpisode?.images?.jpg?.image_url || smallFallbackImage} alt={title} />
                <label className='episode-no-label'>{episodeNo}</label>
            </div>
            <div className='episode-card-right-container'>
                <label className='episode-card-title'>{title}</label>
                <p className='episode-card-description'>
                    {/* {synopsis?.synopsis || "Loading synopsis..."} */}
                    {"Loading ...."}
                </p>
            </div>
        </div>
    );
};

export default EpisodeCard;

