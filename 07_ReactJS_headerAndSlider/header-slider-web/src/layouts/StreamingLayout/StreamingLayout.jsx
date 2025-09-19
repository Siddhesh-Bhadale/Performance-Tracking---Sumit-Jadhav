import React from 'react'
import '../../scss/layouts/streaminglayout.scss'
import { SectionTitles } from '../../pages/animeDetails/AnimeDetailsPage'
import StreamingCard from '../../components/cards/streamingCard/StreamingCard'

const StreamingLayout = () => {
    return (
        <div data-component='streaming-layout'>
            <SectionTitles title={'Streaming'} />
            <div className='streaming-platform-container'>
                <StreamingCard />
                <StreamingCard />
                <StreamingCard />

            </div>
        </div>
    )
}

export default StreamingLayout