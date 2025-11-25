// src/utils/helpers.js
import apiClient from "../services/apiClient";

export const formatDateTime = (value) => {
  if (!value) return "-";
  return new Date(value).toLocaleString();
};

export const truncate = (text, max = 80) => {
  if (!text) return "";
  return text.length > max ? text.slice(0, max) + "…" : text;
};

export const setAuthToken = (token) => {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const clearAuthToken = () => {
  delete apiClient.defaults.headers.common["Authorization"];
};
