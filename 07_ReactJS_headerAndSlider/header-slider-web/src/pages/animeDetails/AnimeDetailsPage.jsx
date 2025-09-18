import React from 'react'
import '../../scss/pages/animedetailspage.scss'
import HeaderComponent from '../../components/header/HeaderComponent'
import { useLocation, useParams } from 'react-router-dom'

const AnimeDetailsPage = () => {
    const params = useParams()
    const data = useLocation()
    console.log(data.state)
    console.log(params)
    console.log(data?.state?.images?.jpg?.image_url)

    return (
        <div data-component='anime-details-page'>
            <HeaderComponent />
            <section className='anime-banner-component-container'>
                <img className='anime-banner-img' src={data?.state?.trailer?.images?.maximum_image_url} />
                <div className='anime-banner-overlay' >
                    <div className='anime-banner-data-contianer'>
                        <img className='anime-banner-poster-img' src={data?.state?.images?.jpg?.image_url} />
                        <div className='anime-banner-poster-data'>
                            <label className='anime-banner-title'>{data?.state?.title_english}</label>
                            <p className='anime-banner-description'>
                                {data?.state?.synopsis}
                            </p>
                            <div className='anime-banner-animedetails'>
                                <div className='anime-banner-detail-container'>
                                    <div className='anime-detail-label'>
                                        <label>Year</label>
                                        <label>{data?.state?.year}</label>
                                    </div>
                                    <div className='anime-detail-label'>
                                        <label>Rank</label>
                                        <label>{data?.state?.rank}</label>

                                    </div>
                                </div>
                                <div className='anime-banner-detail-container'>
                                    <div className='anime-detail-label'>
                                        <label>Status</label>
                                        <label>{data?.state?.status}</label>

                                    </div>
                                    <div className='anime-detail-label'>
                                        <label>Rating</label>
                                        <label>{data?.state?.rating}</label>

                                    </div>
                                </div>
                                <div className='anime-banner-detail-container'>
                                    <div className='anime-detail-label'>
                                        <label>Rating</label>
                                        <label>{data?.state?.rating}</label>

                                    </div>
                                    <div className='anime-detail-label'>
                                        <label>Genres</label>
                                        <label></label>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </section>
        </div>
    )
}

export default AnimeDetailsPage