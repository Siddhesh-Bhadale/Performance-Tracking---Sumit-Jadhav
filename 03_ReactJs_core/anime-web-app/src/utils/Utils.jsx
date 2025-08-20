import { useEffect, useState } from "react";

const STORAGE_KEY='Visited_Anime';



export const getVisitedANime =()=>{
    const stored=localStorage.getItem(STORAGE_KEY);
    return stored? JSON.parse(stored):[];
}

export const saveVisitedAnime = (anime) => {
  // ignore empty/invalid anime
  if (!anime || !anime.id) return getVisitedANime();

  // get and clean existing
  let current = getVisitedANime().filter((item) => item?.id);

  // check duplicates
  if (!current.some((item) => item.id === anime.id)) {
    current.push(anime);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  }

  return current;

}

// debounce utility
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};