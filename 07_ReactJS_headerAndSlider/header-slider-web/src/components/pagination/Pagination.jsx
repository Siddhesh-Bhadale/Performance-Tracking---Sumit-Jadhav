import React, { useEffect, useState } from 'react'
import '../../scss/components/pagination.scss'
import leftIcon from '../../assets/icons/left.svg'
import rightIcon from '../../assets/icons/right.svg'
import { getPaginationPages } from '../../utils/utils'


const Pagination = (props) => {
    const { totalElement, currentPage, pageCount = 3, currentSelected } = props;

    // convert total element into array
    const totalPages = getPaginationPages(currentSelected, totalElement, pageCount)
    // -------------- handle Next Click ---------------//
    const handleNextClick = () => {
        currentPage && currentPage((prev) => prev === totalElement ? totalElement : prev + 1);
    }
    //----------- handle previous click------------//
    const handlePrevClick = () => {
        currentPage && currentPage((prev) => prev === 1 ? 1 : prev - 1)
    }
    //------ pass child data to parent ------//
    const getSelectedPage = () => {
        currentPage && currentPage(currentSelected)
    }
    //------ number click ---------//
    const handlePageNoClick = (item) => {
        currentPage && currentPage(item);
    }

    useEffect(() => {
        getSelectedPage()
    }, [currentSelected])

    return (
        <div data-component='pagination-component'>
            {(currentSelected !== 1) &&
                <div className='pagination-left-icon-container' onClick={handlePrevClick}>
                    <img className='pagination-icon left-icon' src={leftIcon} />
                </div>}
            <div className='pagination-selection-container'>
                {totalPages?.map((item, idx) => (
                    <button id='paginationlabel' key={idx}
                        disabled={item === '...'}
                        onClick={() => handlePageNoClick(item)} className={`pagination-item ${currentSelected === item ? 'active-index' : ''}`}>{item}</button>
                ))}
            </div>
            {
                (currentSelected !== totalElement && totalPages.length !== 1) && <div className='pagination-right-icon-container' onClick={handleNextClick}>
                    <img className='pagination-icon  right-icon' src={rightIcon} />
                </div>
            }
        </div >
    )
}

export default Pagination;
