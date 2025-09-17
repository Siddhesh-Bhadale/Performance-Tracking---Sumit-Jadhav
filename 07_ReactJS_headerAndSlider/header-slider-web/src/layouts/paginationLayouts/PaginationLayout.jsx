import React, { useEffect, useState } from 'react'
import Pagination from '../../components/pagination/Pagination'
import '../../scss/layouts/paginationlayouts.scss'

const PaginationLayout = () => {
    const [data, setData] = useState();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState()
    const [apiError, setError] = useState(false)

    const handleApiCall = async () => {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/top/anime?page=${page}`);
            const result = await response.json()
            setData(result?.data)
            setTotalPages(result?.pagination?.last_visible_page)
        } catch (error) {
            setError(true)
            console.error('Error:-', error)

        }
    }

    function handleDataFromChild(data) {
        setPage(data);
    }

    useEffect(() => {
        handleApiCall()
    }, [page])


    const Card = ({ title }) => {
        return (
            <div style={{ height: '200px', width: '200px', background: `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`, color: 'white', fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', textAlign: 'justify' }}>
                <label>{title}</label>
            </div>

        )
    }
    return (
        <div data-component='pagination-layout'>
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', placeContent: 'center', gap: '1rem' }}>
                {data?.length === 0 ? (<>
                </>) : (data?.map((item, idx) => (
                    <Card key={idx} title={item?.title} />
                )))}
                {apiError && <h1>Something went wrong while fetching api</h1>}
            </div>
            <div>
                {apiError === true ? (<></>) : (
                    <Pagination totalElement={12} currentPage={handleDataFromChild} />
                )}
            </div>
        </div >
    )
}

export default PaginationLayout