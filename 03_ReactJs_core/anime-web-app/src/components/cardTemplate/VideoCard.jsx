import React, { useState } from "react";
import "../../scss/component/videoCard.scss";
import useFetch from "../../hooks/useFetchData";

const VideoCard = (paramId) => {
  const [sysnopsisId,setSynopsisId]=useState(null)
  // console.log("video contianer sysnopsisId",sysnopsisId)

   //1.Load all Episode Data it have images and titles
    const {data:episodeData , loading:episodesLoading, error:episodeError,hasNextPage}=useFetch(
        `https://api.jikan.moe/v4/anime/${paramId?.paramId?.id}/videos/episodes`,
        {autoPaginate:false},
        {},
    )
    // console.log("episodeData from videoScreen",episodeData)
  //   // 2.Load synopsis data for an epsiode
  //   const {data:rawSynopsisData,loading:synopsisLoading,error:synopsisError}=useFetch(
  //       apiCallOrder.synopsis ? `https://api.jikan.moe/v4/anime/52991/episodes/${synopsisId}`:null,
  //       {autoPaginate:false},
  //       {}// Initial data as empty object
  //   )

  //transformData
  return (
    <section>
      {/* {episodeData?.map((item,index)=>( */}
 <div data-component="VideoCard" 
//  key={index}
 >
      {/* <img className="leftImage" src={item?.images?.jpg?.image_url} alt="videoImage" /> */}
      <div className="rightContainer">
        {/* <span>{item?.title || "Not available"}</span> */}
        <p>
         
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        </p>
      </div>
    </div>
      {/* ))} */}
      
    </section>
   
  );
};

export default VideoCard;