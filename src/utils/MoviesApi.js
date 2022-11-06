import { BEATFILM_URL, BASE_MOVIES_URL } from "./constants";

const HEADERS = { "Content-Type": "application/json" };

const getResponse = (res) => (res.ok ? res.json() : Promise.reject(res));

export const getMovies = async () => {
  const movies = await fetch(`${BASE_MOVIES_URL}${BEATFILM_URL}`, {
    headers: HEADERS,
  });
  return getResponse(movies);
};
