import React from 'react'
import '../../../scss/components/animecard.scss'

const AnimeCard = (props) => {
  const { animeTitle, poster, rating, onClick } = props;
  return (
    <div data-component='anime-card-component' onClick={onClick}>
      <div className='anime-card-overlay' ></div>
      <img src={poster} className='anime-card-poster' />
      <div className='anime-card-stars-container'>
        <label className='anime-card-title'>{animeTitle}</label>
        <label className='anime-card-rating-star'>⭐⭐⭐⭐⭐</label>
      </div>
    </div>
  )
}

export default AnimeCard