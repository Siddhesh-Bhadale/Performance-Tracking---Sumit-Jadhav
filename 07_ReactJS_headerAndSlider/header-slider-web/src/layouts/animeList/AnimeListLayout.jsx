import React, { useEffect, useRef, useState } from 'react'
import '../../scss/layouts/animeListLayout.scss'
import AnimeCard from '../../components/cards/animeCard/AnimeCard'
import Pagination from '../../components/pagination/Pagination';
import { useNavigate } from 'react-router-dom';
import AnimeCardLoading from '../../loadingComponents/AnimeCardLoading';
import DropDownComponent from '../../components/drop-down/DropDownComponent';
import useDebounce from '../../hooks/debounce/useDebounce';
import { saveRecentlyVisitedAnime } from '../../utils/utils';

const AnimeListLayout = ({ searchValue }) => {
    const [data, setData] = useState();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState()
    const [apiError, setError] = useState(false);
    const [loading, setLoading] = useState(true)
    const [topManga, setTopManga] = useState();
    const [seasonNow, setSeasoNow] = useState();
    const searchDebounce = useDebounce(searchValue)
    const [isValueInitaliz, setIsValueInitaliz] = useState();

    const navigate = useNavigate()
    const containerRef = useRef();


    const handleApiCall = async () => {
        setTimeout(async () => {
            try {
                setLoading(true)
                const response = await fetch(`https://api.jikan.moe/v4/top/anime?page=${page}${topManga ? `&type=${topManga?.value || topManga}` : ""}${seasonNow ? `&filter=${seasonNow?.value || seasonNow}` : ""}${searchDebounce ? `&q=${searchDebounce}` : ""}`);
                const result = await response.json()
                if (response.status === 429) {
                    setTimeout(() => {
                        handleApiCall();
                    }, 334)
                }
                setData(result?.data)
                setTotalPages(result?.pagination?.last_visible_page)
            } catch (error) {
                setError(true)
                console.error('Error:-', error)
            } finally {
                setLoading(false)
            }
        },
            500)

    }

    const handleScrollToTop = () => {
        if (containerRef.current) {
            containerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }

    const handleCardNavigation = (item) => {
        navigate(`/anime-details/${item.mal_id}`, { state: item });
    }

    useEffect(() => {

    }, [])

    useEffect(() => {
        handleApiCall()
        handleScrollToTop();
    }, [page, topManga, seasonNow, searchDebounce])
    return (
        <div ref={containerRef} data-component='anime-list-layout' style={{ cursor: `${loading ? 'wait' : 'pointer'}` }}>
            <section className='drop-down-contianer'>

                <DropDownComponent
                    placeholder='Type'
                    options={["tv", "movie", "ova", "special", "ona", "music", "cm", "pv", "tv_special"]}
                    deafaultValue={topManga}
                    result={setTopManga}
                />

                <DropDownComponent
                    placeholder='Filter'
                    options={["airing", "upcoming", "bypopularity", "favorite"]}
                    deafaultValue={seasonNow}
                    result={setSeasoNow}
                />
            </section>


            {apiError && <h2 style={{ placeSelf: 'center' }}>You're offline.Please check your internet connection and try again.</h2>}
            <div className='anime-list-card-container'>
                {loading ? (<><AnimeCardLoading />
                </>) : (<>
                    {data?.map((item, idx) => (
                        <AnimeCard
                            key={idx}
                            animeTitle={item?.title}
                            poster={item?.images?.jpg?.image_url}
                            onClick={() => { handleCardNavigation(item); saveRecentlyVisitedAnime(item) }}
                            rating={item?.score}
                        />
                    ))
                    }
                </>)}

            </div>

            {apiError ? (
                <></>
            ) : (
                <div className='pagination-cotainer'>
                    <Pagination totalElement={totalPages} pageCount={3} currentPage={setPage} currentSelected={page} />

                </div>

            )}
        </div>
    )
}

export default AnimeListLayout