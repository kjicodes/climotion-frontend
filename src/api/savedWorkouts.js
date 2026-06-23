import { API_BASE_URL } from "./config.js";

export async function getSavedWorkouts(accessToken) {
  try {
    const response = await fetch(`${API_BASE_URL}/saved-workouts/`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      return { "success": false, "error": "Error getting saved workouts." }
    }
    const data = await response.json();
    return { "success": true, data };
  } catch {
    return { "success": false, "error": "Connection error." }
  }
};

export async function createSavedWorkout(workout, accessToken) {
  try {
    const response = await fetch(`${API_BASE_URL}/saved-workouts/`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ workout: workout })
    });
    if (!response.ok) {
      return { "success": false, "error": "Error saving workout." }
    }
    const data = await response.json();
    return { "success": true, data };
  } catch {
    return { "success": false, "error": "Connection error." }
  }
};

export async function updateSavedWorkout(id, updates, accessToken) {
  try {
    const response = await fetch(`${API_BASE_URL}/saved-workouts/${id}/`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates)
    });
    if (!response.ok) {
      return { "success": false, "error": "Error updating workout." }
    }
    const data = await response.json();
    return { "success": true, data };
  } catch {
    return { "success": false, "error": "Connection error." }
  }
};

export async function deleteSavedWorkout(id, accessToken) {
  try {
    const response = await fetch(`${API_BASE_URL}/saved-workouts/${id}/`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${accessToken}`, "Content-Type": "application/json" }
    });
    if (!response.ok) {
      return { "success": false, "error": "Error deleting workout." }
    }
    return { "success": true };
  } catch {
    return { "success": false, "error": "Connection error." }
  }
};