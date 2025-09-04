import React, { useState } from 'react'
import '../../scss/components/search.scss'
import searchIcon from '../../assets/icons/search.svg'
import useDebounce from '../../hooks/debounce/useDebounce'

const Search = (props) => {
    const { searchIcon = false, placeholder = "Enter ...", Search } = props
    const [searchValue, setSearchValue] = useState("");
    const debounce = useDebounce(searchValue)
    const handleSearch = (event) => {
        setSearchValue(event);
        Search(event)
    }

    return (
        <div data-component='search-component'>
            {searchIcon && <img alt='search-icon'
                src={searchIcon}
                className='search-Icon' />
            }

            <input className='search-input'
                placeholder='Anime,Manga,etc...'
                value={searchValue}
                onChange={(e) => handleSearch(e.target.value)} />
        </div>
    )
}

export default Search