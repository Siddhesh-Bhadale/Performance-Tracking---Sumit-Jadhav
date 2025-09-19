import React, { useEffect, useState } from 'react'
import '../../../scss/components/episodecard.scss'
import { useParams } from 'react-router-dom'

const EpisodeCard = ({ episodeNo, title, episodeImage }) => {
    const params = useParams();
    const [synopsis, setSynopsis] = useState();
    const [synposisLoading, setSynopsisLoading] = useState(true);

    const getEpisodeSynopsis = async () => {
        setTimeout(async () => {
            try {
                setSynopsisLoading(true)
                const response = await fetch(`https://api.jikan.moe/v4/anime/${params?.id}/episodes/${episodeNo}`)
                const result = await response.json()
                setSynopsis(result?.data)
            } catch (error) {
                console.log('something went wrong while fetching data', error)
            } finally {
                setSynopsisLoading(false)
            }
        }, 1000)

    }

    

    useEffect(() => {
        getEpisodeSynopsis()
    }, [])
    return (
        <div data-component='episode-card-component' onClick={() => { alert('Epsiode click') }}>
            <div className='episode-card-left-container'>
                <img
                    className='episode-card-image'
                    src={episodeImage || 'https://preview.redd.it/cgatdbgi2rj61.jpg?width=600&format=pjpg&auto=webp&s=08c30769587bf36866548c8e33c9b582ccd87562'} />

                <label className='epsiode-no-label'>{episodeNo}</label>
            </div>
            <div className='episode-card-right-container'>
                <label className='episode-card-title'>{title}</label>
                <p className='epsiode-card-description'>
                    {synposisLoading === true ? (
                        <>
                            <label>Loaing ....</label>
                        </>
                    ) : (
                        <>
                            {synopsis?.synopsis || ' The disappearance of the Spearhead Squadron beyond the horizon does little to hide the intensity of the Republic of San Magnolias endless propaganda. Vladilena Milizé continues to operate as "Handler One," the commander of yet another dehumanized 86th factions squadron in the continuous war against the Legion. On the Western Front, Shinei Nouzen and his squad are quarantined in a military base controlled by the Federal Republic of Giad, formerly known as the Giadian Empire. The newly-established government grants the saved Eighty-Six full citizenship and freedom. Housed by the president Ernst Zimmerman himself, the group meets his adoptive daughter and the last Empress, Augusta Frederica Adel-Adler. However, within the calm of this tender society, Shinei and his team feel that their purpose is on the battlefield. Before long, they are once again in the midst of the Legions onslaught as a part of the Federacys Nordlicht Squadron, accompanied by Augusta Frederica. But, as history repeats itself, they realize that no matter the side, death and pain on the front lines are the only comfort they know.'}

                        </>

                    )}
                </p>
            </div>
        </div>
    )
}

export default EpisodeCard