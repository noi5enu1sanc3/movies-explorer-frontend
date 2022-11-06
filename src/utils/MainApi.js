import {
  BASE_MAIN_URL,
  BASE_MOVIES_URL,
  JWT_KEY,
  LINK_REGEX,
  MOVIE_NAME_PLACEHOLDER,
  MOVIE_NUM_PLACEHOLDER,
  MOVIE_VIDEO_LINK_PLACEHOLDER,
} from "./constants";
import { extractFromStorage } from "./storageUtils";

const mapKeys = ({ id, created_at, updated_at, ...movie }) => {
  return {
    ...movie,
    nameRU: movie.nameRU || movie.nameEN || MOVIE_NAME_PLACEHOLDER,
    nameEN: movie.nameEN || movie.nameRU || MOVIE_NAME_PLACEHOLDER,
    country: movie.country || MOVIE_NAME_PLACEHOLDER,
    thumbnail: `${BASE_MOVIES_URL}${movie.image.formats.thumbnail.url}`,
    image: `${BASE_MOVIES_URL}${movie.image.url}`,
    movieId: id,
    director: movie.director || MOVIE_NAME_PLACEHOLDER,
    duration: movie.duration || MOVIE_NUM_PLACEHOLDER,
    year: movie.year || MOVIE_NUM_PLACEHOLDER,
    description: movie.description || MOVIE_NAME_PLACEHOLDER,
    trailerLink:
      (movie.trailerLink &&
        LINK_REGEX.test(movie.trailerLink) &&
        movie.trailerLink) ||
      MOVIE_VIDEO_LINK_PLACEHOLDER,
  };
};

const HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const getAuthHeaders = (token) => {
  return {
    ...HEADERS,
    Authorization: `Bearer ${token}`,
  };
};

const getAuthHeadersWithStorageToken = () => {
  return {
    ...HEADERS,
    Authorization: `Bearer ${extractFromStorage(JWT_KEY)}`,
  };
};

const getResponse = (res) => (res.ok ? res.json() : Promise.reject(res));

export const register = async ({ name, email, password }) => {
  const response = await fetch(`${BASE_MAIN_URL}/signup`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ name, email, password }),
  });
  return getResponse(response);
};

export const login = async ({ email, password }) => {
  const response = await fetch(`${BASE_MAIN_URL}/signin`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ email, password }),
  });
  return getResponse(response);
};

export const checkToken = async (token) => {
  const response = await fetch(`${BASE_MAIN_URL}/users/me`, {
    headers: getAuthHeaders(token),
  });
  return getResponse(response);
};

export const getUserInfo = async () => {
  const response = await fetch(`${BASE_MAIN_URL}/users/me`, {
    headers: getAuthHeadersWithStorageToken(),
  });
  return getResponse(response);
};

export const updateUserInfo = async ({ name, email }) => {
  const response = await fetch(`${BASE_MAIN_URL}/users/me`, {
    method: "PATCH",
    headers: getAuthHeadersWithStorageToken(),
    body: JSON.stringify({ name, email }),
  });
  return getResponse(response);
};

export const getSavedMovies = async () => {
  const savedMovies = await fetch(`${BASE_MAIN_URL}/movies`, {
    headers: getAuthHeadersWithStorageToken(),
  });
  return getResponse(savedMovies);
};

export const addMovie = async (movie) => {
  const reqBody = JSON.stringify(mapKeys(movie));
  const addedMovie = await fetch(`${BASE_MAIN_URL}/movies`, {
    method: "POST",
    headers: getAuthHeadersWithStorageToken(),
    body: reqBody,
  });
  return getResponse(addedMovie);
};

export const deleteMovie = async (movie) => {
  const deletedMovie = await fetch(`${BASE_MAIN_URL}/movies/${movie}`, {
    method: "DELETE",
    headers: getAuthHeadersWithStorageToken(),
  });
  return getResponse(deletedMovie);
};
