
import '../../../scss/components/episodecard.scss';
import { useParams } from 'react-router-dom';
import { smallFallbackImage } from '../../../utils/StaticData';
import { useEffect, useRef, useState } from 'react';
import { getEpisodeSynopsisData } from '../../../services/services';

const EpisodeCard = (props) => {
    const { selectedEpisode, setSelectedEpisode, setIsAPICalled, isApiCalled } = props;
    const params = useParams();
    const episodeCardRef = useRef(null);
    const lastApiCallTime = useRef(0);
    const [synopsis, setSynopsis] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false)
    // const isApliAlredyCalled = useRef(false)
    // const isIntersectedCardRef = useRef(null)
    // console.log(`${props?.mal_id} for this api `, isApiCalled)


    const fetchSynopsisData = async (id, no) => {
        try {
            setIsLoading(true)
            const response = await getEpisodeSynopsisData(id, no)
            setSynopsis(response?.data)
            setIsAPICalled(true);
            // isApliAlredyCalled.current = true
        } catch (error) {
            setError(true)
            console.log('Error while Fetching a Episode synopsis data', error)
        } finally {
            setIsLoading(false)
        }
    }

    const throttleApiCall = (id, no) => {

        const currentTime = Date.now();
        const timeDifference = currentTime - lastApiCallTime.current;
        // if (timeDifference >= 500 && !isLoading && !synopsis && !isApiCalled) {
        //     lastApiCallTime.current = currentTime;
        //     fetchSynopsisData(id, no)
        // }

        if (timeDifference >= 500 && !isLoading && !synopsis && !isApiCalled) {
            lastApiCallTime.current = currentTime;
            setTimeout(() => {
                fetchSynopsisData(id, no)
            }, 1000);

        }

        // if (!synopsis && !isLoading) {
        // setTimeout(() => {
        //     fetchSynopsisData(id, no)
        // }, 500 * Number(props?.mal_id));

        // }

    };

    const getDate = () => {
        let duration = ""
        let time = Number(synopsis?.duration / 60);
        duration = Math.floor(time) + ":" + Math.floor((time % 1) * 100)
        return duration.length <= 4 ? duration + "0" : duration
    }

    useEffect(() => {
        if (!episodeCardRef.current) return;
        const callback = (enteries) => {
            if (enteries[0].isIntersecting && !isLoading && !synopsis) {
                // isIntersectedCardRef.current = props?.mal_id
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
            onClick={() => { setSelectedEpisode(props); window.open(props?.url) }} >
            <div className='episode-card-left-container'>
                <img className='episode-card-image' src={props?.images?.jpg?.image_url || smallFallbackImage} alt={props?.title} />
                <label className='episode-no-label'>{getDate()}</label>
            </div>
            <div className='episode-card-right-container'>
                <label className='episode-card-title'>{props?.title}</label>
                <p className='episode-card-description'>
                    {error && <button>Try Again</button>}
                    {!synopsis ? (<>
                        <span className='episode-card-loading-labels'></span>
                        <span className='episode-card-loading-labels'></span>
                    </>) : (<>{synopsis?.synopsis || "No data"}</>)

                    }

                </p>
            </div>
        </div>
    );
};

export default EpisodeCard;

