import React from 'react';
import '../../scss/layouts/recentlyviewedanimelayout.scss'
import AnimeCard from '../../components/cards/animeCard/AnimeCard';
import { getRecentlyViewed } from '../../utils/utils';
import { useNavigate, useParams } from 'react-router-dom';

const RecentlyViewedAnime = ({ data }) => {
    const visited = getRecentlyViewed();
    const navigate = useNavigate();
    const handleNavigation = (item) => {
        navigate(`/anime-details/${item?.mal_id}`);
        // window.location.reload();
    }


    return (
        <div data-component='recentlyviewed-anime-layout'>
            {visited?.reverse().map((item, idx) => (
                <AnimeCard
                    key={idx}
                    animeTitle={item?.title}
                    poster={item?.images?.jpg?.image_url}
                    onClick={() => handleNavigation(item)}
                    rating={item?.score}
                />
            ))}
        </div>
    )
}

export default RecentlyViewedAnime