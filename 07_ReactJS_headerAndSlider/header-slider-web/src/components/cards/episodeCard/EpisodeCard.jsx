
import '../../../scss/components/episodecard.scss';
import { data, useParams } from 'react-router-dom';
import { smallFallbackImage } from '../../../utils/StaticData';
import { useEffect, useRef, useState } from 'react';
import { getEpisodeSynopsisData } from '../../../services/services';

const EpisodeCard = (props) => {
    const { selectedEpisode, setSelectedEpisode } = props;
    const params = useParams();
    const episodeCardRef = useRef(null);
    const lastApiCallTime = useRef(0);
    const [synopsis, setSynopsis] = useState(null)
    const [isLoading, setIsLoading] = useState();
    const apiCallRateRef = useRef(0)
    // const isApliAlredyCalled = useRef(false)

    const fetchSynopsisData = async (id, no) => {
        apiCallRateRef.current += 1;
        try {
            setIsLoading(true)
            const response = await getEpisodeSynopsisData(id, no)
            setSynopsis(response?.data)
            // isApliAlredyCalled.current = true
        } catch (error) {
            console.log('Error while Fetching a Episode synopsis data', error)
        }
    }

    const throttleApiCall = (id, no) => {
        const currentTime = Date.now();
        const timeDifference = currentTime - lastApiCallTime.current;
        // if (timeDifference >= 500 && isApliAlredyCalled.current === false) {
        //     lastApiCallTime.current = currentTime;
        //     fetchSynopsisData(id, no)
        // }
        if (timeDifference >= 500) {
            lastApiCallTime.current = currentTime;
            fetchSynopsisData(id, no)
        }
    };

    useEffect(() => {
        if (!episodeCardRef.current) return;
        const callback = (enteries) => {
            if (enteries[0].isIntersecting && !isLoading && !synopsis) {
                throttleApiCall(params?.id, props?.mal_id);
            }
        }
        const options = {
            root: document.querySelector(".episode-right-container"),
            threshold: 1
        }
        const observerAPI = new IntersectionObserver(callback, options)
        observerAPI.observe(episodeCardRef?.current);
        return () => {
            if (episodeCardRef?.current) {
                return observerAPI.unobserve(episodeCardRef?.current)
            }
        }
    }, [episodeCardRef])

    return (
        <div ref={episodeCardRef} data-component='episode-card-component'
            style={{
                opacity: `${selectedEpisode?.mal_id === props?.mal_id ? '0.7' : ''}`,
                border: `${selectedEpisode?.mal_id === props?.mal_id ? '1px solid #ff004c' : ''}`
            }}
            onClick={() => setSelectedEpisode(props)} >
            <div className='episode-card-left-container'>
                <img className='episode-card-image' src={props?.images?.jpg?.image_url || smallFallbackImage} alt={props?.title} />
                <label className='episode-no-label'>{apiCallRateRef.current}</label>
            </div>
            <div className='episode-card-right-container'>
                <label className='episode-card-title'>{props?.title}</label>
                <p className='episode-card-description'>
                    {!synopsis && <>
                        <span className='episode-card-loading-labels'></span>
                        <span className='episode-card-loading-labels'></span>
                    </>}
                    {synopsis?.synopsis}
                </p>
            </div>
        </div>
    );
};

export default EpisodeCard;

