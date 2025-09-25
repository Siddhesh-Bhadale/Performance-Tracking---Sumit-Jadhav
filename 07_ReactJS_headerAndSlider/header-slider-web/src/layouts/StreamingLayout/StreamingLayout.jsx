import React from 'react'
import '../../scss/layouts/streaminglayout.scss'
import { SectionTitles } from '../../pages/animeDetails/AnimeDetailsPage'
import StreamingCard from '../../components/cards/streamingCard/StreamingCard'
import { streamDataImages } from '../../utils/StaticData'


const StreamingLayout = ({ data }) => {
    return (
        <div data-component='streaming-layout'>
            <SectionTitles title={'Streaming'} />
            <div className='streaming-platform-container'>
                {!data || data.length === 0 ? (<label style={{ fontSize: '2rem', marginTop: '1rem', marginLeft: '1rem', fontWeight: '800' }}>No Streaming Data</label>) : (<>
                    {data?.map((item, idx) => (
                        <StreamingCard key={idx} {...item} />))}
                </>)}

            </div>
        </div>
    )
}

export default StreamingLayout