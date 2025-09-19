import React, { useEffect, useState } from 'react';
import "../../scss/layouts/animebannerlayout.scss";
import { useParams } from 'react-router-dom';

// DetailItem component to render individual label/value pairs
const DetailItem = ({ label, value, isGenres = false }) => {
    return (
        <div className='banner-details-item-contianer'>
            <label className='banner-details-label'>{label}</label>
            {isGenres ? (
                <div className='banner-details-genres'>
                    {Array.isArray(value) && value.length > 0 ? (
                        value.map((genre, index) => (
                            <span key={index} className='banner-details-generastag'>
                                {genre?.name || 'NA'}
                            </span>
                        ))
                    ) : (
                        <span>No genres available</span>
                    )}
                </div>
            ) : (
                <label className='banner-details-value'>{value || 'NA'}</label>
            )}
        </div>
    );
};

// AnimeBannerLayout component
const AnimeBannerLayout = (props) => {
    const { data } = props;
    const param = useParams();
    const [animeInfo, setAnimeInfo] = useState(data);

    // Fetch API data
    const fetchData = async () => {
        console.log('Fetching data...');
        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime/${param?.id}/full`);
            const result = await response.json();
            setAnimeInfo(result?.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Only fetch data if animeInfo is null or undefined
    useEffect(() => {
        if (!animeInfo) {
            fetchData();
        }
    }, [animeInfo]);



    return (
        <div data-component='anime-banner-component'>
            <img
                src={animeInfo?.trailer?.images?.maximum_image_url}
                alt="Background"
                className='banner-background-img'
            />

            <div className='banner-background-overlay'>
                <div className='banner-data-container'>
                    <img
                        src={animeInfo?.images?.webp?.large_image_url || 'NA'}
                        alt={animeInfo?.title || 'NA'}
                        className='banner-data-img'
                    />

                    <div className='banner-data-info-container'>
                        <div>
                            <label className='banner-data-title'>{animeInfo?.title || 'NA'}</label>
                        </div>
                        <p className='banner-data-description'>
                            {animeInfo?.synopsis || 'No description available'}
                        </p>

                        <div className='banner-details-grid'>
                            <div className='banner-details-columns'>
                                <DetailItem label="Year" value={animeInfo?.year || 'NA'} />
                                <DetailItem label="Rank" value={animeInfo?.rank || 'NA'} />
                            </div>

                            <div className='banner-details-columns'>
                                <DetailItem label="Status" value={animeInfo?.status || 'NA'} />
                                <DetailItem label="Rating" value={animeInfo?.rating || 'NA'} />
                            </div>

                            <div className='banner-details-columns'>
                                <DetailItem label="Episodes" value={animeInfo?.episodes || 'NA'} />
                                <DetailItem label="Genres" value={animeInfo?.genres || []} isGenres={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimeBannerLayout;

