import '../../scss/pages/animedetailspage.scss'
import HeaderComponent from '../../components/header/HeaderComponent'
import { useParams } from 'react-router-dom'
import AnimeBannerLayout from '../../layouts/animeBannerLayout/AnimeBannerLayout'
import RecentlyViewedAnime from '../../layouts/recentlyViewedLayouts/RecentlyViewedAnime'
import EpisodeLayout from '../../layouts/episodesLayout/EpisodeLayout'
import ProducerLayouts from '../../layouts/producerLayout/ProducerLayouts'
import StreamingLayout from '../../layouts/StreamingLayout/StreamingLayout'
import { useEffect, useState } from 'react'
export const SectionTitles = ({ title }) => {

    return (
        <div className='section-title-container'>
            <label className='section-label'>{title}</label>
        </div>
    )
}
const AnimeDetailsPage = () => {
    const params = useParams();
    // const locationState = useLocation()
    const [data, setData] = useState()
    const fetchData = async () => {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime/${params?.id}/full`);
            const result = await response.json();
            setData(result?.data);


        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();




    }, []);


    return (
        <div data-component='anime-details-page'>
            <HeaderComponent />
            <AnimeBannerLayout data={data} />
            <SectionTitles title={'Episodes'} />
            < EpisodeLayout backgroundImg={data?.trailer?.images?.maximum_image_url} title={data?.title} />
            <div className='stream-producer-container'>
                <StreamingLayout data={data?.streaming} />
                <ProducerLayouts data={data} />
            </div>
            <SectionTitles title={'Recently Viewed'} />
            <RecentlyViewedAnime />
        </div>
    )
}


export default AnimeDetailsPage