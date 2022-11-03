import { BASE_MAIN_URL, BASE_MOVIES_URL, JWT_KEY } from "./constants";
import { extractFromStorage } from "./storageUtils";

const mapKeys = ({ id, created_at, updated_at, ...movie }) => {
  return {
    ...movie,
    thumbnail: `${BASE_MOVIES_URL}${movie.image.formats.thumbnail.url}`,
    movieId: id,
    image: `${BASE_MOVIES_URL}${movie.image.url}`,
  };
};

const HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

const getAuthHeaders = (token) => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

const getResponse = (res) =>
  res.ok ? res.json() : Promise.reject(`Rejected with error ${res.status}`);

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
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return getResponse(response);
};

export const getUserInfo = async () => {
  const response = await fetch(`${BASE_MAIN_URL}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${extractFromStorage(JWT_KEY)}`,
    },
  });
  return getResponse(response);
};

export const updateUserInfo = async ({ name, email }) => {
  const response = await fetch(`${BASE_MAIN_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${extractFromStorage(JWT_KEY)}`,
    },
    body: JSON.stringify({ name, email }),
  });
  return getResponse(response);
};

export const getSavedMovies = async () => {
  const savedMovies = await fetch(`${BASE_MAIN_URL}/movies`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${extractFromStorage(JWT_KEY)}`,
    },
  });
  return getResponse(savedMovies);
};

export const addMovie = async (movie) => {
  const reqBody = JSON.stringify(mapKeys(movie));
  const addedMovie = await fetch(`${BASE_MAIN_URL}/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${extractFromStorage(JWT_KEY)}`,
    },
    body: reqBody,
  });
  return getResponse(addedMovie);
};

export const deleteMovie = async (movie) => {
  console.log(movie);
  const deletedMovie = await fetch(`${BASE_MAIN_URL}/movies/${movie}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${extractFromStorage(JWT_KEY)}`,
    },
  });
  return getResponse(deletedMovie);
};
