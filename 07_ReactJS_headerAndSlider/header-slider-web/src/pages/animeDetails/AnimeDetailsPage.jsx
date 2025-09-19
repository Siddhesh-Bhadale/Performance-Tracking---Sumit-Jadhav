import '../../scss/pages/animedetailspage.scss'
import HeaderComponent from '../../components/header/HeaderComponent'
import { useLocation } from 'react-router-dom'
import AnimeBannerLayout from '../../layouts/animeBannerLayout/AnimeBannerLayout'
import RecentlyViewedAnime from '../../layouts/recentlyViewedLayouts/RecentlyViewedAnime'
import EpisodeLayout from '../../layouts/episodesLayout/EpisodeLayout'
import ProducerLayouts from '../../layouts/producerLayout/ProducerLayouts'
import StreamingLayout from '../../layouts/StreamingLayout/StreamingLayout'
export const SectionTitles = ({ title }) => {
    return (
        <div className='section-title-container'>
            <label className='section-label'>{title}</label>
        </div>
    )
}
const AnimeDetailsPage = () => {
    const locationState = useLocation()
    // console.log(locationState?.state)

    return (
        <div data-component='anime-details-page'>
            <HeaderComponent />
            <AnimeBannerLayout data={locationState?.state} />
            <SectionTitles title={'Episodes'} />
            < EpisodeLayout />
            <div className='stream-producer-container'>
                <StreamingLayout />
                <ProducerLayouts data={locationState?.state?.producers} />
            </div>
            <SectionTitles title={'Recently Viewed'} />
            <RecentlyViewedAnime />
        </div>
    )
}


export default AnimeDetailsPage