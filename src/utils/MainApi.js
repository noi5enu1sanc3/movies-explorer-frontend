import { BASE_MAIN_URL } from "./constants";
const HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
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

export const getUserInfo = async (token) => {
  const response = await fetch(`${BASE_MAIN_URL}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return getResponse(response);
};

export const updateUserInfo = async ({ name, email }) => {
  const response = await fetch(`${BASE_MAIN_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
    body: JSON.stringify({ name, email }),
  });
  return getResponse(response);
};
