import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import AnimeCard from "../components/cardTemplate/AnimeCard";
import BannerSlider from "../components/slider/BannerSlider";
import "../scss/page/homePage.scss";
import DropDown from "../components/dropDown/DropDown";
import { ImageSlides } from "../utils/TextConstants";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const [data, setData] = useState([]);
  const [imageSlider, setImageSlider] = useState([]);
  const navigate = useNavigate();
  const arr = ["TV", "Movie", "ONA", "OVA"];
  const arr2 = ["Genre", "Movie", "ONA", "OVA"];
  const arr3 = ["Year", "Movie", "ONA", "OVA"];
  useEffect(() => {
    fetchAnimeCardData();
  }, []);
  const fetchAnimeCardData = async () => {
    try {
      const res = await fetch("https://api.jikan.moe/v4/top/anime");
      const data = await res.json();
      setData(data?.data);
    } catch (error) {
      console.error("Soemthing went wrong during API call", error);
    }
  };

  const handleNavigation = (item) => {
    navigate(`/anime-details/${item.mal_id}`, { state: item });
  };

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
    </div>
  );
};

export default HomePage;
