import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "../../scss/page/animeDescriptionPage.scss";
import image from "../../assets/images/dummyAnime.jpg";
import StreamingCard from "../../components/cardTemplate/StreamingCard";

const AnimeDescriptionPage = () => {
  const params = useParams();
  const [itemData, setItemData] = useState([]);
  const [staffData, setStaffData] = useState([]);
  const [characterData, setCharacterData] = useState([]);

  useEffect(() => {
    callAnimeApi();
    callStaffApi();
    callCharacterApi();
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
          <div className="right-contianer">
            
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
