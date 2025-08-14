import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "../../scss/page/animeDescriptionPage.scss";
import image from "../../assets/images/dummyAnime.jpg";
import StreamingCard from "../../components/cardTemplate/StreamingCard";
import VideoCard from "../../components/cardTemplate/VideoCard";
import useFetchData from "../../hooks/useFetchData";

const AnimeDescriptionPage = () => {
  const params = useParams();
  const [itemData, setItemData] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [characterData, setCharacterData] = useState([]);
  const [episodesData,setEpisodesData]=useState([]);
  const [episodeImagedata,setEpisodeImagedata]=useState([])
  const loadingRef=useRef(null)

  useEffect(() => {
    callAnimeApi();
    callStaffApi();
    callCharacterApi();
    callAnEpisodesApi();
    callAnimeEpisodeImage();
  }, []);
  const callAnimeApi = async () => {
    try {
      const res = await fetch(
        `https://api.jikan.moe/v4/anime/${params.id}/full`
      );
      const data = await res.json();
      setItemData(data);
    } catch (error) {
      console.error("something went wrong", error);
    }
  };

  const callStaffApi = async () => {
    try {
      const res = await fetch(
        `https://api.jikan.moe/v4/anime/${params.id}/staff`
      );
      const data = await res.json();
      setStaffData(
        data?.data.map((item) => {
          return item;
        })
      );
    } catch (error) {
      console.error("something went wring during calling Staff api", error);
    }
  };

  const callCharacterApi = async () => {
    try {
      const res = await fetch(
        `https://api.jikan.moe/v4/anime/${params.id}/characters`
      );
      const data = await res.json();
      setCharacterData(
        data?.data.map((item) => {
          return item;
        })
      );
    } catch (error) {
      console.error("something went wring during calling Staff api", error);
    }
  };

  const callAnEpisodesApi =async ()=>{
    try {
      const response =await fetch(`https://api.jikan.moe/v4/anime/${params.id}/episodes`)
      const result= await response.json()
      setEpisodesData(result?.data)
      
    } catch (error) {
      console.error("Error while fething episodes data: - ",error)
    }
  }

  const callAnimeEpisodeImage = async ()=>{
    try {
       const response =await fetch(`https://api.jikan.moe/v4/anime/${params.id}/videos`)
      const result= await response.json()
      setEpisodeImagedata(result?.data?.promo)
    } catch (error) {
       console.error("Error while fething episodes data: - ",error)
    }
  }

  //---- Intersection observer api -----//
  // useEffect(()=>{
  //   // console.log(loadingRef.current)
  //   if(!loadingRef.current) return;
  //   const loadingObserver= new IntersectionObserver((entries)=>{
  //     console.log(entries)
  //   },{threshold:1})
  //   //mehtod observe: - it will absorve that partivular div -loading
  //   loadingObserver.observe(loadingRef.current)
  //   return ()=>{
  //     // if  cleaner function have that div then it will remove the listner
  //     if(loadingRef.current)loadingObserver.unobserve(loadingRef.current)
  //   }

  // },[])
  // console.log("episodesData ---->",episodesData)
  return (
    <div data-component="AnimeDetails">
      <section
        className="banner"
        style={{
          backgroundImage: `url(${itemData?.data?.trailer?.images?.maximum_image_url})`,
        }}
      >
        <div className="itemsContainer">
          <img
            className="item-image"
            src={itemData?.data?.images?.webp?.image_url}
          />
          <div className="item-Details-container">
            <span className="item-title">{itemData?.data?.title}</span>
            <p className="item-description">{itemData?.data?.synopsis}</p>
            <div className="table-container">
              <div className="attribute-container">
                <div className="attribute">
                  <span>Year</span>
                  <span>{itemData?.data?.year}</span>
                </div>
                <div className="attribute">
                  <span>Rank</span>
                  <span>{itemData?.data?.rank}</span>
                </div>
              </div>
              <div className="attribute-container">
                <div className="attribute">
                  <span>Status</span>
                  <span>{itemData?.data?.status}</span>
                </div>
                <div className="attribute">
                  <span>Score</span>
                  <span>{itemData?.data?.score}</span>
                </div>
              </div>
              <div className="attribute-container">
                <div className="attribute">
                  <span>Rating</span>
                  <span>{itemData?.data?.rating}</span>
                </div>
                <div className="attribute">
                  <span>Genre</span>
                  <span>
                    {itemData?.data?.genres.map((item) => {
                      return item.name + " ";
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="banner_overlay"></div>
        {/* <div cla>

        </div> */}
      </section>
      <section className="episodes-container">
        <label className="section-title">Episodes</label>
        <div className="video-container">
          <div
            className="left-contiainer"
            style={{
              backgroundImage: `url(${itemData?.data?.trailer?.images?.maximum_image_url})`,
            }}
          >
            {" "}
          </div>
          <div className="right-container ">
           { episodesData.map((item,index)=>{
  // console.log("item-->",item.title)
  var episodeImage=episodeImagedata.find((epImage,epIndex)=> { 
    // console.log("epImage--->",epImage)
    if(epImage?.title===item?.title ){
      console.log("found match")
    } 
  // console.log("episodeImage--->",episodeImage)/
})
  return(
<VideoCard 
        key={index} 
        image={itemData?.data?.trailer?.images?.maximum_image_url} 
        title={item?.title}
        description={item?.title} 
      />
  )
})
}
           
            <div ref={loadingRef}>Loading...</div>
          </div>
        </div>
      </section>
      <section className="streaming-container">
        <label className="section-title">Character</label>
        <div className="character-section">
          {/* {staffData} */}
          {characterData.map((item, index) => {
            return (
              <div className="card-container" key={index}>
                <StreamingCard
                  name={item?.character?.name}
                  image={item?.character?.images?.jpg?.image_url}
                  isCircle={true}
                />
              </div>
            );
          })}
        </div>
        <label className="section-title">Cast</label>
        <div className="character-section">
          {staffData.map((item, index) => {
            return (
              <div className="card-container" key={index}>
                <StreamingCard
                  name={item?.person?.name}
                  image={item?.person?.images?.jpg?.image_url}
                  isCircle={false}
                  role={item.positions[0]}
                />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default AnimeDescriptionPage;
