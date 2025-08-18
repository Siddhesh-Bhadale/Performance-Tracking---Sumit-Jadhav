import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "../../scss/page/animeDescriptionPage.scss";
import image from "../../assets/images/dummyAnime.jpg";
import StreamingCard from "../../components/cardTemplate/StreamingCard";
import VideoCard from "../../components/cardTemplate/VideoCard";
import useFetchData from "../../hooks/useFetchData";
import useFetch from "../../hooks/useFetchData";

const AnimeDescriptionPage = () => {
    const params = useParams();
    const loadingRef = useRef(null);
    const [episodesPage, setEpisodesPage] = useState(1);
    const [synopsisId,setSynopsisId]=useState(1)

    // State for controlling sequential API calls to avoid 429 errors
    const [apiCallOrder, setApiCallOrder] = useState({
        anime: true,    // Start with anime details first
        staff: false,   // Enable after anime loads
        character: false, // Enable after staff loads
        episodes: false,  // Enable after character loads
        synopsis: false     // Enable after episodes starts loading
    });




    // Sequential API calls to respect rate limits
    // 1. Main banner Section Anime Data
    const { data: itemData, loading: itemLoading, error: itemError } = useFetch(
        apiCallOrder.anime ? `https://api.jikan.moe/v4/anime/${params.id}/full` : null,
        { autoPaginate: false },
        {} // Initial data as empty object
    );

   
    // reference for an paginatedapi
    //     const { data: animeData, loading, error, hasNextPage } = useFetch(
    //     "https://api.jikan.moe/v4/top/anime",
    //     { page, autoPaginate: true, uniqueById: true },
    //     []
    //   );

    // Transform Data Here 
    // const episodeData=rawEpisodeData || [];
    // const synopsisData=rawSynopsisData ||[];

    // console.log("episode",episodeData)
    // console.log("synopsis",synopsisData)



//     //intersection Observer
//      useEffect(() => {
//     if (!loadingRef.current || !hasNextPage || !apiCallOrder.episodes) return;

//     const loadingObserver = new IntersectionObserver(
//       (entries) => {
//         const loadingEntry = entries[0];
        
//         if (loadingEntry.isIntersecting && hasNextPage && !episodesLoading) {
//           console.log("📡 Loading more episodes...");
//           setEpisodesPage(prev => prev + 1);
//         }
//       },
//       { threshold: 1 }
//     );

//     loadingObserver.observe(loadingRef.current);

//     return () => {
//       if (loadingRef.current) {
//         loadingObserver.unobserve(loadingRef.current);
//       }
//     };
//   }, [hasNextPage, episodesLoading, apiCallOrder.episodes]);

    return (
        <div data-component="AnimeDetails">
            <section
                className="banner"
                style={{
                    backgroundImage: `url(${itemData?.trailer?.images?.maximum_image_url ||
                        itemData?.images?.webp?.large_image_url ||
                        itemData?.images?.jpg?.large_image_url ||
                        image})`,
                }}
            >
                <div className="itemsContainer">
                    <img
                        className="item-image"
                        src={itemData?.images?.webp?.image_url}
                    />
                    <div className="item-Details-container">
                        <span className="item-title">{itemData?.title || "No data available"}</span>
                        <p className="item-description">{itemData?.synopsis || "No data available"}</p>
                        <div className="table-container">
                            <div className="attribute-container">
                                <div className="attribute">
                                    <span>Year</span>
                                    <span>{itemData?.year || "NA"}</span>
                                </div>
                                <div className="attribute">
                                    <span>Rank</span>
                                    <span>{itemData?.rank || "NA"}</span>
                                </div>
                            </div>
                            <div className="attribute-container">
                                <div className="attribute">
                                    <span>Status</span>
                                    <span>{itemData?.status || "NA"}</span>
                                </div>
                                <div className="attribute">
                                    <span>Score</span>
                                    <span>{itemData?.score || "NA"}</span>
                                </div>
                            </div>
                            <div className="attribute-container" >
                                <div className="attribute">
                                    <span>Rating</span>
                                    <span>{itemData?.rating || "NA"}</span>
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
                        className="left-contiainer"
                        style={{
                            backgroundImage: `url(${itemData?.images?.webp?.large_image_url ||
                                itemData?.images?.jpg?.large_image_url ||
                                itemData?.trailer?.images?.maximum_image_url ||
                                image})`,
                        }}
                    >
                        {" "}
                    </div>
                    <div className="right-container ">
                        <VideoCard paramId={params}/>

                        {/* {episodeData?.map((item,index)=>{
                           
                            return( 
                                <VideoCard
                            key={index}
                            image={item?.images?.jpg?.image_url}
                            title={item?.title}
                            // description={synopsisData?.map((item)=>item?.synopsis)}
                            />
                        )}
                            )} */}

                            
                        {/* {episodeData?.map((item, index) => {
                           // console.log("item-->",item.title)
                           var episodeImage = episodeImagedata?.find((epImage, epIndex) => {
                               // console.log("epImage--->",epImage)
                               if (epImage?.title === item?.title) {
                                   console.log("found match")
                               }
                               // console.log("episodeImage--->",episodeImage)/
                           })
                           return (
                               <VideoCard
                                   key={index}
                                   image={itemData?.data?.trailer?.images?.maximum_image_url}
                                   title={item?.title}
                                   description={item?.title}
                               />
                           )
                       })
                       } */}


                        <div ref={loadingRef}>Loading...</div>

                    </div>


                </div>
            </section>
            

        </div>
    );
};

export default AnimeDescriptionPage;
