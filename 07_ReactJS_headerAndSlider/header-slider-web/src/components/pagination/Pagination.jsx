import React, { useEffect, useState } from 'react'
import '../../scss/components/pagination.scss'
import leftIcon from '../../assets/icons/left.svg'
import rightIcon from '../../assets/icons/right.svg'


const Pagination = (props) => {
    const { totalElement, currentPage } = props
    const [selectedPage, setSelectedPage] = useState(1);

    const getPages = (selectedPage, totalElement, elementToshow) => {
        let pages = [];
        //always push 1 in array
        pages.push(1)
        // it will push left dots
        selectedPage > (elementToshow) && pages.push('...')
        //we need to find min & max value
        const startIndex = Math.max(selectedPage - (elementToshow / 2), 2)
        const endIndex = Math.min(selectedPage + (elementToshow / 2), totalElement - 1)
        //mid Elements
        for (let i = startIndex; i <= endIndex; i++) {
            pages.push(i)
        }
        //it will put right dots
        selectedPage < (totalElement - (elementToshow - 1)) && pages.push('...')
        //push last element
        totalElement > 1 && pages.push(totalElement)
        return pages
    }




    // convert total element into array
    const totalPages = totalElement <= 10 ? Array.from(Array(totalElement), (_, idx) => idx + 1) : getPages(selectedPage, totalElement, 2)

    // -------------- handle Next Click ---------------//
    const handleNextClick = () => {
        setSelectedPage((prev) => prev === totalElement ? totalElement : prev + 1);
    }

    //----------- handle previous click------------//
    const handlePrevClick = () => {
        setSelectedPage((prev) => prev === 1 ? 1 : prev - 1)
    }

    //------ pass child data to parent ------//
    const getSelectedPage = () => {
        currentPage(selectedPage)
    }

    //------ number click ---------//
    const handlePageNoClick = (item) => {
        setSelectedPage(item);
    }

    useEffect(() => {
        getSelectedPage()
    }, [selectedPage])

    return (
        <div data-component='pagination-component'>
            {(selectedPage !== 1) &&
                <div className='pagination-left-icon-container' onClick={handlePrevClick}>
                    <img className='pagination-icon left-icon' src={leftIcon} />
                </div>}
            <div className='pagination-selection-container'>
                {totalPages?.map((item, idx) => (
                    <button id='paginationlabel' key={idx}
                        disabled={item === '...'}
                        onClick={() => handlePageNoClick(item)} className={`pagination-item ${selectedPage === item ? 'active-index' : ''}`}>{item}</button>
                ))}
            </div>
            {
                (selectedPage !== totalElement && totalPages.length !== 1) && <div className='pagination-right-icon-container' onClick={handleNextClick}>
                    <img className='pagination-icon  right-icon' src={rightIcon} />
                </div>
            }
        </div >
    )
}

export default Pagination;
