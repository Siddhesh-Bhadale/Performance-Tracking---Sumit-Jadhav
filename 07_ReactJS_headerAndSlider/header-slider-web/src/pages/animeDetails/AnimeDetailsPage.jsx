import '../../scss/pages/animedetailspage.scss'
import HeaderComponent from '../../components/header/HeaderComponent'
import { useParams } from 'react-router-dom'
import AnimeBannerLayout from '../../layouts/animeBannerLayout/AnimeBannerLayout'
import RecentlyViewedAnime from '../../layouts/recentlyViewedLayouts/RecentlyViewedAnime'
import EpisodeLayout from '../../layouts/episodesLayout/EpisodeLayout'
import ProducerLayouts from '../../layouts/producerLayout/ProducerLayouts'
import StreamingLayout from '../../layouts/StreamingLayout/StreamingLayout'
import { useEffect, useState } from 'react'
import { getFullAnimeDetails } from '../../services/services'
import AnimeDetailsLoadingPage from '../../loadingComponents/AnimeDetailsLoadingPage';

export const SectionTitles = ({ title }) => {
    return (
        <div className='section-title-container'>
            <label className='section-label'>{title}</label>
        </div>
    )
}
const AnimeDetailsPage = () => {
    const params = useParams();
    const [data, setData] = useState()
    const [loading, setIsLoading] = useState(true);

    const fetchFullAnimeData = async () => {

        setTimeout(async () => {
            try {
                setIsLoading(true)
                const animeData = await getFullAnimeDetails(params?.id)
                setData(animeData?.data)
            } catch (error) {
                console.log("Error while fetching a Full Anime Data", error)
            } finally {
                setIsLoading(false)
            }
        }, 400);

    }
    useEffect(() => {
        window.scrollTo(0, 0)
        fetchFullAnimeData();
    }, []);
    return (
        <div data-component='anime-details-page'>
            <HeaderComponent />
            {loading ? (<AnimeDetailsLoadingPage />) : (<>
                <AnimeBannerLayout data={data} />
                <SectionTitles title={'Episodes'} />
                < EpisodeLayout backgroundImg={data?.trailer?.images?.maximum_image_url} title={data?.title} />
                <div className='stream-producer-container'>
                    <StreamingLayout data={data?.streaming} />
                    <ProducerLayouts data={data} />
                </div>
                <SectionTitles title={'Recently Viewed'} />
                <RecentlyViewedAnime data={data} />
            </>)}

        </div>
    )
}


export default AnimeDetailsPage