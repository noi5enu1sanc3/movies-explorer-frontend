import { STORE_KEY } from "./constants";

export const saveToStorage = (key, data) => {
  const store = JSON.parse(localStorage.getItem(STORE_KEY));
  localStorage.setItem(STORE_KEY, JSON.stringify({ ...store, [key]: data }));
};

export const extractFromStorage = (key) => {
  if (!localStorage.getItem(STORE_KEY)) return "";
  const store = JSON.parse(localStorage.getItem(STORE_KEY));
  return store[key];
};

export const clearStorage = (store) => localStorage.removeItem(store);
