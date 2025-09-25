import "../../scss/layouts/animebannerlayout.scss";
import { useParams } from 'react-router-dom';
import { fallbackImage } from '../../utils/StaticData';
import { handleImageError } from "../../utils/utils";

// DetailItem component to render individual label/value pairs
const DetailItem = ({ label, value, isGenres = false }) => {
    return (
        <div className='banner-details-item-contianer'>
            <label className='banner-details-label'>{label}</label>
            {isGenres ? (
                <div className='banner-details-genres'>
                    {value.length > 0 ? (
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
    return (
        <div data-component='anime-banner-component'>
            <img
                src={data?.trailer?.images?.maximum_image_url || fallbackImage}
                alt="Background"
                onError={(e) => handleImageError(e)}
                className='banner-background-img'
            />

            <div className='banner-background-overlay'>
                <div className='banner-data-container'>
                    <img
                        src={data?.images?.webp?.large_image_url || 'NA'}
                        alt={data?.title || 'NA'}
                        className='banner-data-img'
                    />

                    <div className='banner-data-info-container'>
                        <div>
                            <label className='banner-data-title'>{data?.title || 'NA'}</label>
                        </div>
                        <p className='banner-data-description'>
                            {data?.synopsis || 'No description available'}
                        </p>

                        <div className='banner-details-grid'>
                            <div className='banner-details-columns'>
                                <DetailItem label="Year" value={data?.year || 'NA'} />
                                <DetailItem label="Rank" value={data?.rank || 'NA'} />
                            </div>

                            <div className='banner-details-columns'>
                                <DetailItem label="Status" value={data?.status || 'NA'} />
                                <DetailItem label="Rating" value={data?.rating || 'NA'} />
                            </div>

                            <div className='banner-details-columns'>
                                <DetailItem label="Episodes" value={data?.episodes || 'NA'} />
                                <DetailItem label="Genres" value={data?.genres || []} isGenres={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimeBannerLayout;

