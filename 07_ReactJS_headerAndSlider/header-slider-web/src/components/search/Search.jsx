import React, { useState } from 'react'
import '../../scss/components/search.scss'
import searchIcon from '../../assets/icons/search.svg'


const Search = (props) => {
    const { searchIcon = false, placeholder = "Enter ...", value, onChange } = props
    const [searchValue, setSearchValue] = useState("");


    return (
        <div data-component='search-component'>
            {searchIcon && <img alt='search-icon'
                src={searchIcon}
                className='search-Icon' />
            }

            <input className='search-input'
                placeholder={placeholder || 'Anime,Manga,etc...'}
                value={searchValue || value}
                onChange={(e) => onChange(e.target.value)} />
        </div>
    )
}

export default Search