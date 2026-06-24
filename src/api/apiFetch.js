import { API_BASE_URL } from "./config";
import { getCsrfToken } from "./csrf";

const UNSAFE_METHODS = ["POST", "PUT", "PATCH", "DELETE"];

// options = body or params
export const apiFetch = (path, options = {}) => {
  const method = (options.method || "GET").toUpperCase();
  return fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(UNSAFE_METHODS.includes(method)
        ? { "X-CSRFToken": getCsrfToken() }
        : {}),
      ...options.headers,
    },
  });
};
