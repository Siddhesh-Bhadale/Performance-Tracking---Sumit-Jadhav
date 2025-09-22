
import React, { useEffect, useState } from 'react';
import '../../../scss/components/episodecard.scss';
import { useParams } from 'react-router-dom';
import apiThrottleHook from '../../../hooks/apiThrottle/apiThrottleHook';

const EpisodeCard = ({ episodeNo, title, episodeImage }) => {
    const params = useParams();
    const [data, setData] = useState(null);

    // const getSynopsisData = async () => {
    //     try {
    //         const response = await fetch(`https://api.jikan.moe/v4/anime/${params?.id}/episodes/${episodeNo}`);
    //         const result = await response.json();
    //         setData(result?.data);
    //     } catch (error) {
    //         console.log('Error while fetching the API:', error);
    //     }
    // };

    // const getThrottleSynopsis = apiThrottleHook({ func: getSynopsisData, delay: 500 });

    useEffect(() => {
        // getThrottleSynopsis;
    }, []);

    const matchedEpisode = episodeImage?.episodes?.find((ep) => ep.mal_id === episodeNo);

    return (
        <div data-component='episode-card-component' onClick={() => { alert('Episode click') }}>
            <div className='episode-card-left-container'>
                <img className='episode-card-image' src={matchedEpisode?.images?.jpg?.image_url || 'https://m.media-amazon.com/images/M/MV5BMDE1NDY2ZGEtNmY1ZC00YWZmLTk2OWMtN2IxZjhkN2FiNGMxXkEyXkFqcGdeQWplZmZscA@@._V1_.jpg'} alt={title} />
                <label className='episode-no-label'>{episodeNo}</label>
            </div>
            <div className='episode-card-right-container'>
                <label className='episode-card-title'>{title}</label>
                <p className='episode-card-description'>
                    {data?.synopsis || "Loading synopsis..."}
                </p>
            </div>
        </div>
    );
};

export default EpisodeCard;

