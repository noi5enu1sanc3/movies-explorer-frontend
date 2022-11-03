import { STORE_KEY } from "./constants";

export const saveToStorage = (key, data) => {
  const store = JSON.parse(localStorage.getItem(STORE_KEY));
  localStorage.setItem(STORE_KEY, JSON.stringify({ ...store, [key]: data }));
  console.log(store);
};
// localStorage.setItem(key, JSON.stringify(data));

export const extractFromStorage = (key) => {
  const store = JSON.parse(localStorage.getItem(STORE_KEY));
  return store[key];
};

export const clearStorage = (store) => localStorage.removeItem(store);
