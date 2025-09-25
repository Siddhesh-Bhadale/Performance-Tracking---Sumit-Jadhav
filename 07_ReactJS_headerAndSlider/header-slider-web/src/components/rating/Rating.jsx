import '../../scss/components/rating.scss';
import fullStarsImg from '../../assets/icons/stars/fullStar.svg';
import halfStarImg from '../../assets/icons/stars/halfStar.svg';
import emptyStarsImg from '../../assets/icons/stars/emptyStar.svg'

const Rating = ({ rating }) => {
    const starFunction = () => {
        let starArray = [];
        const fullStars = Math.floor(rating / 2)
        const halfStar = (rating / 2) % 1 >= 0.05 ? 1 : 0
        const range = (start, end, value) => {
            for (let i = start; i < end; i++) {
                starArray.push(value)
            }
        }
        range(0, fullStars, fullStarsImg)
        range(fullStars, fullStars + halfStar, halfStarImg)
        range(starArray.length, 5, emptyStarsImg)
        return starArray
    }
    const ratingStar = starFunction();
    return (
        <div data-components='star-rating-components'>
            {ratingStar?.map((item, idx) => <div key={idx} >
                <img className='rating-star-img' src={item} />
            </div>)}
        </div>
    )
}

export default Rating;