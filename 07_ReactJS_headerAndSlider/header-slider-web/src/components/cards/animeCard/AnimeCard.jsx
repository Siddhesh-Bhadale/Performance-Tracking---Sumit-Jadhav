

import React from 'react'
import '../../../scss/components/animecard.scss'
import watchNow from '../../../assets/icons/watchnow.svg'

const AnimeCard = (props) => {
  const { animeTitle, poster, rating, onClick } = props;


  const genrateRatingStar = (rating) => {
    const starRating = rating / 2;
    const fullStars = Math.floor(starRating);
    const halfStar = starRating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    let stars = [{ "fullStars": fullStars }, { "halfStar": halfStar }, { "emptyStars": emptyStars }]
    return stars;

  }

  const ratingstars = genrateRatingStar(rating)
  // console.log(ratingstars)


  return (
    <div data-component='anime-card-component' onClick={onClick}>
      <div className='anime-card-overlay' >
        <img src={watchNow} className='watchnow-img' alt='watchnowicon' />
        <label className='watch-now-txt'>
          Watch Now
        </label>
      </div>
      <img src={poster} className='anime-card-poster' />
      <div className='anime-card-stars-container'>
        <label className='anime-card-title'>{animeTitle}</label>
        <label className='anime-card-rating-star'>
          {/* {ratingstars?.map((item, idx) => {
            return
          })} */}
          ⭐⭐⭐⭐⭐ 
          {/* ☆☆☆☆☆ */}
        </label>
      </div>
    </div>
  )
}

export default AnimeCard