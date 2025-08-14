import React, { useEffect, useRef, useState } from "react";
import Header from "../components/header/Header";
import AnimeCard from "../components/cardTemplate/AnimeCard";
import BannerSlider from "../components/slider/BannerSlider";
import "../scss/page/homePage.scss";
import DropDown from "../components/dropDown/DropDown";
import { ImageSlides } from "../utils/TextConstants";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const [data, setData] = useState([]);
  const [page,setPage]=useState(1);
  const navigate = useNavigate();
  const loadingRef=useRef(null)
  const arr = ["TV", "Movie", "ONA", "OVA"];
  const arr2 = ["Genre", "Movie", "ONA", "OVA"];
  const arr3 = ["Year", "Movie", "ONA", "OVA"];
  
  const fetchAnimeCardData = async () => {
    try {
      const res = await fetch(`https://api.jikan.moe/v4/top/anime?page=${page}`);
      const result = await res.json();
      setData((prev)=>[...prev,...result.data]);
    } catch (error) {
      console.error("Soemthing went wrong during API call", error);
    }
  };

  const handleNavigation = (item) => {
    navigate(`/anime-details/${item.mal_id}`, { state: item });
  };
  useEffect(() => {
    fetchAnimeCardData();
  }, [page]);

  //------- intersection observer --------------//
  // useEffect(()=>{
  //   if(!loadingRef.current) return

  //   const loadingObserver =new IntersectionObserver(([entery])=>{
  //     // console.log(entries)

  //   },{threshold:1})

  //   loadingObserver.observe(loadingRef.current)

  //   return ()=>{
  //     if(!loadingRef.current )loadingObserver.unobserve(loadingRef.current)
  //   }
  // },[])
console.log("all anime details",data)
  return (
    <div data-component="HomePage">
      <Header />
      <BannerSlider slides={ImageSlides} />
      <div className="divider">
        <label className="divider-title">Anime</label>
        <div></div>
        <div className="Filter">
          <DropDown arr={arr} />
          <DropDown arr={arr2} />
          <DropDown arr={arr3} />
        </div>
      </div>
      <section className="anime-card-container">
        {data.map((item, index) => {
          return (
            <AnimeCard
              key={index}
              animeImg={item.images.webp.image_url}
              description={item.title}
              rating={item.score / 2}
              onClick={() => {
                handleNavigation(item);
                // console.log("clicked card id:", item.mal_id, item);
              }}
            />
          );
        })}
      </section>

      {/* Hello */}
      <div ref={loadingRef} className="end-message">
            🎌 lOADING... 🎌
          </div>
    </div>
  );
};

export default HomePage;
