import React from 'react'
import '../../scss/component/moreDetails.scss'
import Producers from './producerDetails/Producers'
import StreamingDetails from './StreamingDetails/StreamingDetails'
import RecentlyViewed from './recentlyViewedDetails/RecentlyViewed'

const MoreDetails = ({ paramId, data }) => {
  return (
    <div data-components='MoreDetails'>
    <div className='left-container'>
        <div className='inner-container'>
        <div className='inner-container-wrapper'>
        <label className="section-title">Streaming</label>
        <StreamingDetails paramId={paramId} data={data?.streaming}/>
       
        </div>
        <div className='right-container'>
        <label className="section-title">Producers</label>
        <Producers paramId={paramId} data={data?.producers}/>
        
        </div>
        </div>
        <div className='inner-wrapper'>
        <label className="section-title">Recently Viewed</label>
        <RecentlyViewed/>
        </div>
    </div>
    

    </div>
  )
}

export default MoreDetails