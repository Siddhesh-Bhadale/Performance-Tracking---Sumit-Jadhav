import React from 'react';
import '../../scss/layouts/producerlayouts.scss'
import { SectionTitles } from '../../pages/animeDetails/AnimeDetailsPage';

const ProducerLayouts = (data) => {
    return (
        <div data-component='producer-list-layout'>
            <SectionTitles title={'Producers'} />
            <div className='producer-list-container'>
                {data?.data?.producers.length === 0 ? (<label style={{ fontSize: '2rem', marginTop: '1rem', marginLeft: '1rem', fontWeight: '800' }} >No Producer data found</label>) : (<>
                    {data?.data?.producers.map((item, idx) => (
                        <li className='producer-label' key={idx}><span>■</span>{item.name}</li>
                    ))}
                </>)}
            </div>
        </div>
    )
}

export default ProducerLayouts