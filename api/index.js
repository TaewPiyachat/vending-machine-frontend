import { BACKEND_URL } from "../constant";

export const getProducts = (location) => {
  return fetch(`${BACKEND_URL}/products/${location}`);
};

export const getLocationOptions = () => {
    return fetch(`${BACKEND_URL}/locations/options`);
  };
  