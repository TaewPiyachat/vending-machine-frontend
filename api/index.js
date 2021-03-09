import { BACKEND_URL } from "../constant";

export const login = ({ username, password }) => {
  return fetch(`${BACKEND_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
    }),
  });
};

export const getNotifications = () => {
  return fetch(`${BACKEND_URL}/notifications`);
};

export const getProducts = () => {
  return fetch(`${BACKEND_URL}/products`);
};

export const getProductsByLocationId = (locationId) => {
  return fetch(`${BACKEND_URL}/products/${locationId}`);
};

export const buyProduct = (locationId, productId) => {
  return fetch(`${BACKEND_URL}/products/buy/${locationId}/${productId}`, {
    method: "PUT",
  });
};

export const addProducts = (locationId, productId, amount) => {
  return fetch(`${BACKEND_URL}/products/add/${locationId}/${productId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount,
    }),
  });
};

export const getLocationOptions = () => {
  return fetch(`${BACKEND_URL}/locations/options`);
};
