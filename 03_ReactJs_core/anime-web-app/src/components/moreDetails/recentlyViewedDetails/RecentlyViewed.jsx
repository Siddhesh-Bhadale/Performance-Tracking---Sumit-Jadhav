import React, { useEffect, useState } from 'react'
import "../../../scss/component/recentlyViewed.scss"
import { getVisitedANime } from '../../../utils/Utils';
import StreamingCard from '../../cardTemplate/StreamingCard';

const RecentlyViewed = () => {
  const [visited, setVisited] = useState([]);

  useEffect(() => {
    const visitedAnime = getVisitedANime() || []; 
    setVisited(visitedAnime);
  }, []);


  return (
    <div data-components='RecentlyViewed'>
      {visited.length > 0 ? (
        visited.map((item, index) => (
            <div className='card' key={index}>
              <StreamingCard 
            isCircle={false} 
            name={item?.title} 
            image={item?.image} 
          />
            </div>
          
        ))
      ) : (
        <div>There is no recently viewed yet</div>
      )}
    </div>
  );
};

export default RecentlyViewed;
