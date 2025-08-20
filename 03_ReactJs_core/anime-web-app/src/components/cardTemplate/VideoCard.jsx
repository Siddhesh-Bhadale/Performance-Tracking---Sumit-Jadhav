import React, { useEffect, useRef, useState } from "react";
import "../../scss/component/videoCard.scss";
import useFetch from "../../hooks/useFetchData";

const VideoCard = ({ paramId, ImageData }) => {
  const [page, setPage] = useState(1);
  const [synopsisData, setSynopsisData] = useState({});
  const [loadingQueue, setLoadingQueue] = useState([]);
  const [currentlyLoading, setCurrentlyLoading] = useState(null);
  const loadingRef = useRef();

  const {
    data: episodeData,
    loading: episodesLoading,
    error: episodeError,
    hasNextPage,
  } = useFetch(
    `https://api.jikan.moe/v4/anime/${paramId}/videos/episodes`,
    { page, autoPaginate: true, uniqueById: true },
    []
  );

  const episodes = episodeData || [];

  // Sequential synopsis loading
  useEffect(() => {
    if (currentlyLoading || loadingQueue.length === 0) return;

    const nextEpisodeId = loadingQueue[0];
    setCurrentlyLoading(nextEpisodeId);
    setLoadingQueue(prev => prev.slice(1));

    const fetchSynopsisData = async () => {
      try {
        // Respect the same rate limit as your useFetch
        await new Promise(resolve => setTimeout(resolve, 333));
        const response = await fetch(`https://api.jikan.moe/v4/anime/${paramId}/episodes/${nextEpisodeId}`);
        
        const result = await response.json();
        
        setSynopsisData(prev => ({
          ...prev,
          [nextEpisodeId]: result?.data?.synopsis || "Synopsis not available"
        }));
        
      } catch (error) {
        console.error(`Error fetching synopsis `, error);
        setSynopsisData(prev => ({
          ...prev,
          [nextEpisodeId]: "Error loading synopsis"
        }));
      } finally {
        setCurrentlyLoading(null);
      }
    };

    fetchSynopsisData();
  }, [loadingQueue, currentlyLoading, paramId]);

  // Add episodes to loading queue when they are visible
  const addEpisodesToLoadingQueue = (episodeId) => {
    if (synopsisData[episodeId] || loadingQueue.includes(episodeId) || currentlyLoading === episodeId) {
      return;
    }
    
    setLoadingQueue(prev => [...prev, episodeId]);
  };

  // Intersection Observer for epsioded synopsis 
  useEffect(() => {
    const observers = [];
    
    episodes.forEach((episode) => {
      const episodeElement = document.querySelector(`[data-episode-id="${episode?.mal_id}"]`);
      if (!episodeElement) return;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            addEpisodesToLoadingQueue(episode?.mal_id);
            observer.disconnect();
          }
        },
        { threshold: 0.1, rootMargin: '200px' }
      );
      
      observer.observe(episodeElement);
      observers.push(observer);
    });
    
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [episodes]);

  // Infinite Scroll- main episode data 
  useEffect(() => {
    if (!loadingRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !episodesLoading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    observer.observe(loadingRef.current);

    return () => {
      if (loadingRef.current) observer.unobserve(loadingRef.current);
    };
  }, [hasNextPage, episodesLoading]);

  if (episodesLoading && page === 1) return <div>Loading...</div>;
  if (episodeError) return <div>Error loading episodes</div>;

  return (
    <section>
      {episodes.length > 0 ? (
        <>
          {episodes.map((item) => (
            <div 
              data-component="VideoCard" 
              data-episode-id={item.mal_id}
              key={item.mal_id}
            >
              <img
                className="leftImage"
                src={item?.images?.jpg?.image_url || ImageData}
                alt={item?.title || "Episode Image"}
              />
              <div className="rightContainer">
                <span>{item.title || "Not available"}</span>
                <p>
                  {currentlyLoading === item.mal_id 
                    ? "Loading synopsis..." 
                    : synopsisData[item.mal_id] || "Scroll to load synopsis"
                  }
                </p>
                {loadingQueue.includes(item.mal_id) && (
                  <small style={{ color: '#888' }}>In queue we have wait for an execution </small>
                )}
              </div>
            </div>
          ))}

          <div ref={loadingRef} className="end-message">
            {episodesLoading
              ? "🎌 LOADING... 🎌"
              : hasNextPage
              ? "Scroll for more"
              : "No more results"}
          </div>
        </>
      ) : (
        <div>No Data</div>
      )}
    </section>
  );
};

export default VideoCard;