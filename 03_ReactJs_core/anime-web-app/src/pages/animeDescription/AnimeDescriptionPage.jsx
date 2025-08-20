import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "../../scss/page/animeDescriptionPage.scss";
import image from "../../assets/images/dummyAnime.jpg";
import useFetch from "../../hooks/useFetchData";
import MoreDetails from "../../components/moreDetails/MoreDetails";
import { getVisitedANime, saveVisitedAnime } from "../../utils/Utils";
import VideoCard from '../../components/cardTemplate/VideoCard.jsx'
import Header from "../../components/header/Header.jsx";

const AnimeDescriptionPage = () => {
   const params = useParams();
  // stored id of visited anime here 
  const [visited,setVisited]=useState([])
  const { data: itemData, loading: itemLoading, error: itemError } = useFetch(
    `https://api.jikan.moe/v4/anime/${params.id}/full`,
    { autoPaginate: false },
    {} 
  );
  // load from localStorage on mounting
  useEffect(()=>{
    setVisited(getVisitedANime())
  },[])

   // when itemData changes (API done), save to localStorage
useEffect(() => {
  if (itemData) {
    const updated = saveVisitedAnime({
      id: itemData.mal_id,
      title: itemData.title,
      image: itemData?.images?.jpg?.image_url,
      rating: itemData?.score,
    });
    setVisited(updated);

  }
}, [itemData]);

  if (itemLoading) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h2>Loading anime details...</h2>
        <p>Please wait, respecting API rate limits...</p>
      </div>
    );
  }

  // Show error state if main anime data fails to load
  if (itemError) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h2>Error loading anime</h2>
        <p>{itemError.message}</p>
        {itemError.message.includes('429') && (
          <p style={{ color: 'orange' }}>
            Too many requests - please wait a moment and refresh the page
          </p>
        )}
      </div>
    );
  }
// console.log("Anime Details screen",itemData)
  return (
    <div data-component="AnimeDetails">
    <Header />
      <section
        className="banner"
        style={{
          backgroundImage: `url(${
            itemData?.trailer?.images?.maximum_image_url ||
            itemData?.images?.webp?.large_image_url ||
            itemData?.images?.jpg?.large_image_url ||
            image
          })`,
        }}
      >
        <div className="itemsContainer">
          <img
            className="item-image"
            src={itemData?.images?.webp?.image_url ||
                 itemData?.images?.jpg?.image_url ||
                 image}
            alt={itemData?.title || 'Anime'}
          />
          <div className="item-Details-container">
            <span className="item-title">{itemData?.title || 'Unknown Anime'}</span>
            <p className="item-description">{itemData?.synopsis || 'No description available.'}</p>
            <div className="table-container">
              <div className="attribute-container">
                <div className="attribute">
                  <span>Year</span>
                  <span>{itemData?.year || 'Unknown'}</span>
                </div>
                <div className="attribute">
                  <span>Rank</span>
                  <span>{itemData?.rank || 'Unranked'}</span>
                </div>
              </div>
              <div className="attribute-container">
                <div className="attribute">
                  <span>Status</span>
                  <span>{itemData?.status || 'Unknown'}</span>
                </div>
                <div className="attribute">
                  <span>Score</span>
                  <span>{itemData?.score || 'N/A'}</span>
                </div>
              </div>
              <div className="attribute-container">
                <div className="attribute">
                  <span>Rating</span>
                  <span>{itemData?.rating || 'Not Rated'}</span>
                </div>
                <div className="attribute">
                  <span>Genre</span>
                  <span>
                      {itemData?.genres?.map((item) => {
                                            return item.name + " ";
                                        })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="banner_overlay"></div>
      </section>
      <section className="episodes-container">
       <label className="section-title">Episodes</label>
        <div className="video-container">
           <div
  className="left-container"
  style={{
    backgroundImage: `url(${
      itemData?.trailer?.images?.maximum_image_url ||
      itemData?.images?.webp?.large_image_url ||
      itemData?.images?.jpg?.large_image_url ||
      image
    })`,
  }}
></div>
<div className="right-container">
<VideoCard paramId={params.id} ImageData={ itemData?.trailer?.images?.maximum_image_url ||
      itemData?.images?.webp?.large_image_url ||
      itemData?.images?.jpg?.large_image_url|| image} />
</div> </div>
      </section>
      <section className="streaming-container">
      <MoreDetails paramId={params.id} data={itemData}/>
      </section>

     
    </div>
  );
};
export default AnimeDescriptionPage;
