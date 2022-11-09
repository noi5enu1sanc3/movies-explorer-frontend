import { SHORT_MOVIE_MAX_DURATION } from "./constants";

const normalize = (string) =>
  string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

export const filterByQuery = (items, query) =>
  items.some((item) =>
    normalize(item.toLowerCase()).includes(query.toLowerCase())
  );

export const filterByDuration = (duration) =>
  duration <= SHORT_MOVIE_MAX_DURATION;
