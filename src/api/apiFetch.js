import { API_BASE_URL } from "./config";

const UNSAFE_METHODS = ["POST", "PUT", "PATCH", "DELETE"];

export const apiFetch = (path, options = {}) => {
  const method = (options.method || "GET").toUpperCase();
  return fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
};
