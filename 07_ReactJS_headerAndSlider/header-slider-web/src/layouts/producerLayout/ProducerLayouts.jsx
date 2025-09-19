import React from 'react';
import '../../scss/layouts/producerlayouts.scss'
import { SectionTitles } from '../../pages/animeDetails/AnimeDetailsPage';

const ProducerLayouts = (data) => {
    
    return (
        <div data-component='producer-list-layout'>
            <SectionTitles title={'Producers'} />
            <div className='producer-list-container'>
                {data?.data?.map((item, idx) => (
                    <li className='producer-label' key={idx}><span>■</span>{item.name}</li>
                ))}
            </div>
        </div>
    )
}

export default ProducerLayouts