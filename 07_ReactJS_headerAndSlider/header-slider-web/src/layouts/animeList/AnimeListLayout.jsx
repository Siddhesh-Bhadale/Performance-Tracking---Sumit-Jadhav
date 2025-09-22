import React, { useEffect, useState } from 'react'
import '../../scss/layouts/animeListLayout.scss'
import AnimeCard from '../../components/cards/animeCard/AnimeCard'
import Pagination from '../../components/pagination/Pagination';
import { useNavigate } from 'react-router-dom';
import AnimeCardLoading from '../../loadingComponents/AnimeCardLoading';

const AnimeListLayout = () => {
    const [data, setData] = useState();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState()
    const [apiError, setError] = useState(false);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    const handleApiCall = async () => {
        setTimeout(async () => {
            try {
                setLoading(true)
                const response = await fetch(`https://api.jikan.moe/v4/top/anime?page=${page}`);
                const result = await response.json()
                setData(result?.data)
                setTotalPages(result?.pagination?.last_visible_page)
            } catch (error) {
                setError(true)
                console.error('Error:-', error)
            } finally {
                setLoading(false)
            }
        }, 333)

    }



    const handleCardNavigation = (item) => {
        navigate(`/anime-details/${item.mal_id}`, { state: item });
    }
    useEffect(() => {
        handleApiCall()
    }, [page])
    return (
        <div data-component='anime-list-layout'>
            {apiError && <h2 style={{ placeSelf: 'center' }}>Some thing went</h2>}
            <div className='anime-list-card-container'>
                {loading ? (<><AnimeCardLoading />
                </>) : (<>
                    {data?.map((item, idx) => (
                        <AnimeCard 
                        key={idx}
                            animeTitle={item?.title}
                            poster={item?.images?.jpg?.image_url}
                            onClick={() => handleCardNavigation(item)}
                            rating={item?.score}
                        />
                    ))
                    }
                </>)}

            </div>

            {apiError === true ? (
                <></>
            ) : (

                <Pagination totalElement={totalPages} pageCount={3} currentPage={setPage} currentSelected={page} />

            )}
        </div>
    )
}

export default AnimeListLayout