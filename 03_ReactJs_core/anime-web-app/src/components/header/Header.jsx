import React from "react";
import "../../scss/component/header.scss";
import search from "../../assets/icons/search.svg";

const Header = () => {
  return (
    <header className="main-container">
      <div className="logo-container">
        <label className="logo-title">FLavour Anime</label>
      </div>
      <nav className="nav-bar">
        <a className="title" href="/Shows">
          Shows
        </a>
        <a className="title" href="/Home">
          Home
        </a>
        <a className="title" href="/News">
          News
        </a>
        <a className="title" href="/Manga">
          Manga
        </a>
        <a className="title" href="/Premium">
          Premium
        </a>
      </nav>
      <div className="search-container">
        <img src={search} alt="search" className="search-icon" />
        <input
          name="search"
          className="search-input"
          placeholder="Anime, manga, etc ."
        />
      </div>

      <div className="auth-contianer">
        <label className="sign-Label signIn">SignIn</label>
        <span className="sign-Label">/</span>
        <label className="sign-Label signUP">SignUP</label>
      </div>
    </header>
  );
};

export default Header;
