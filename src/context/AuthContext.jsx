import React, { createContext, useContext, useState, useEffect } from "react";
import { API_BASE_URL } from "../api/config.js";
import { apiFetch } from "../api/apiFetch.js";

//createContext - shares a values across the component tree
// w/out manually passing it down as a prop through every level in between (prop drilling)
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // prime the CSRF cookie once on app load
  useEffect(() => {
    fetch(`${API_BASE_URL}/auth/csrf/`, { credentials: "include" });
  }, []);

  // replace localStorage with a real session check on load
  useEffect(() => {
    apiFetch("/auth/user/").then(async (res) => {
      if (res.ok) {
        setUser(await res.json());
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
    });
  }, []);

  const login = async ({ username, password }) => {

    const response = await apiFetch("/auth/login/", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (!response.ok)
      return {
        success: false,
        error: data.detail || "Invalid username or password.",
      };
    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));
    return { success: true };
  };

  const register = async ({ firstName, lastName, username, email, password, confirmPassword }) => {
    const response = await apiFetch("/users/", {
      method: "POST",
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        username,
        email,
        password,
        confirm_password: confirmPassword
      }),
    });
    const data = await response.json();
    if (!response.ok) return { success: false, error: flattenErrors(data) };
    return login({ username, password });
  };

  const logout = async () => {
    await apiFetch("/auth/logout/", { method: "POST" });
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function flattenErrors(errorData) {
  return Object.values(errorData).flat().join(" ");
}

export function useAuth() {
  return useContext(AuthContext);
}
