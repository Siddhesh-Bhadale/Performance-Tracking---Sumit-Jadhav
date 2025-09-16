import React, { useEffect, useState } from 'react'
import '../../scss/components/pagination.scss'
import leftIcon from '../../assets/icons/left.svg'
import rightIcon from '../../assets/icons/right.svg'


const Pagination = (props) => {
    const { totalElement = 15 } = props
    const [selectedPage, setSelectedPage] = useState(1);

    const getPages = (selectedPage, totalElement) => {
        let pages = [];
        pages.push(1)

        if (selectedPage > 4) {
            pages.push('...')
        }
        //show middle part 
        for (let i = selectedPage - 1; i <= selectedPage + 1; i++) {
            if (i > 1 && i <= totalElement - 1) {
                pages.push(i)
            }
        }
        if (selectedPage <= totalElement - 4) {
            pages.push('...')
        }

        if (totalElement > 1) {
            pages.push(totalElement)
        }


        return pages
    }

    // convert total element into array
    // const totalPages = getPages(selectedPage, totalElement)
    const totalPages = Array.from(Array(totalElement), (_, idx) => idx + 1)

    const handleNextClick = () => {
        setSelectedPage((prev) => prev === totalElement ? null : prev + 1)
    }
    const handlePrevClick = () => {
        setSelectedPage((prev) => prev === 1 ? 1 : prev - 1)
    }

    return (
        <div data-component='pagination-component'>
            {(selectedPage !== 1) &&
                <div className='pagination-left-icon-container' onClick={handlePrevClick}>
                    <img className='pagination-icon left-icon' src={leftIcon} />
                </div>}
            <div className='pagination-selection-container'>
                {totalPages?.map((item, idx) => (
                    <label id='paginationlabel' key={idx} onClick={() => setSelectedPage(item)} className={`pagination-item ${selectedPage === item ? 'active-index' : ''}`}>{item}</label>
                ))}
            </div>
            {(selectedPage !== totalElement && totalPages.length !== 1) && <div className='pagination-right-icon-container' onClick={handleNextClick}>
                <img className='pagination-icon  right-icon' src={rightIcon} />
            </div>}
        </div>
    )
}

export default Pagination