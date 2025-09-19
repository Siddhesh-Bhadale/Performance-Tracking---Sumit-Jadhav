import React from 'react';
import '../../scss/layouts/recentlyviewedanimelayout.scss'
import AnimeCard from '../../components/cards/animeCard/AnimeCard';

const RecentlyViewedAnime = () => {
    let items = Array.from(Array(25), (item, idx) => idx + 1)
    return (
        <div data-component='recentlyviewed-anime-layout'>
            {items?.map((items, idx) => (
                <AnimeCard
                    key={idx}
                    animeTitle={"One piece"}
                    poster={"https://onlineframing.in/cdn/shop/files/91Zsk83ljAS._SY879.jpg?v=1707484146"}
                    rating={4.5}
                    onClick={() => { }}
                />
            ))}
        </div>
    )
}

export default RecentlyViewedAnime