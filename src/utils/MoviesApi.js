import { BASE_MOVIES_URL } from "./constants";

const BEATFILM_URL = "/beatfilm-movies";
const HEADERS = { "Content-Type": "application/json" };

const getResponse = (res) =>
  res.ok
    ? res.json()
    : Promise.reject(`Rejected with error ${res.status}: ${res.message}`);

export const getMovies = async () => {
  const movies = await fetch(`${BASE_MOVIES_URL}${BEATFILM_URL}`, {headers: HEADERS});
  return getResponse(movies);
};
