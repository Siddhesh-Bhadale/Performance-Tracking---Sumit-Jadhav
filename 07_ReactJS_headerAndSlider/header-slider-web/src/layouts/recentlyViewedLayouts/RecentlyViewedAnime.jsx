import React from 'react';
import '../../scss/layouts/recentlyviewedanimelayout.scss'
import AnimeCard from '../../components/cards/animeCard/AnimeCard';
import { getRecentlyViewed } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';

const RecentlyViewedAnime = () => {
    const visited = getRecentlyViewed();
    const navigate = useNavigate();


    return (
        <div data-component='recentlyviewed-anime-layout'>
            {visited?.reverse().map((item, idx) => (
                <AnimeCard
                    key={idx}
                    animeTitle={item?.title}
                    poster={item?.images?.jpg?.image_url}
                    // onClick={}
                    rating={item?.score}
                />
            ))}
        </div>
    )
}

export default RecentlyViewedAnime