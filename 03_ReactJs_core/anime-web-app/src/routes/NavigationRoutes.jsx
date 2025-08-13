import React from "react";
// import { Route } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AnimeDescriptionPage from "../pages/animeDescription/AnimeDescriptionPage";
import ErrorPage from "../pages/error/ErrorPage.jsx";
const NavigationRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/anime-details/:id" element={<AnimeDescriptionPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default NavigationRoutes;
